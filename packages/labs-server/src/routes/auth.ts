import { CredentialsProvider } from "../CredentialsProvider";
import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signatureKey = process.env.JWT_SECRET as string;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(401).end();
            }
        });
    }
}

function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: Math.floor(Date.now() / 1000) + 86400 },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    const credentialsProvider = new CredentialsProvider(mongoClient);

    app.post("/auth/register", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
            
        }
        const creds = await credentialsProvider.registerUser(username, password);
        
        if (!creds) {
            res.status(400).send({
                error: "Bad request",
                message: "Username already taken."
            })
        }
        else {
            const token = { // See token creation section below
                username: username,
                expirationDate: "1d",
                signature: await generateAuthToken(username),
            }
            res.status(201).send({ token: token })

        }
    });

    app.post("/auth/login", async(req: Request, res: Response) => {

        const {username, password} = req.body;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        }


        const result = await credentialsProvider.verifyPassword(username, password);
        if (result) {
            const token = { // See token creation section below
                username: username,
                expirationDate: "1d",
                signature: await generateAuthToken(username),
            }
            res.status(200).send({ token: token })
        } else {
            res.status(401).send({
                error: "Bad request",
                message: "Incorrect username or password"
            })
        }
    });
}