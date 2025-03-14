import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider, ImageDocument } from "../ImageProvider";
import { handleImageFileErrors, imageMiddlewareFactory } from "./imageUploadMiddleware";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    const imageProvider = new ImageProvider(mongoClient);

    app.get("/api/images", async (req: Request, res: Response) => {
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
    
        const images = await imageProvider.getAllImages(userId);
        res.json(images);
    });

    app.patch("/api/images/:_id", async (req: Request, res: Response) => {
        const imageProvider = new ImageProvider(mongoClient);

        const imageId = req.params._id;
        if (!req.body.name){
            res.status(404).send({
                error: "Not found",
                message: "Image does not exist"
            });
        }
        const { name } = req.body;
        // console.log(imageId, name)

        const result = await imageProvider.updateImageName(imageId, name);
        // console.log(result)
        if (result === 0){
            res.status(404).send({
                error: "Not found",
                message: "Image does not exist"
            });
        }
        if (result == 1){
            res.status(204).send();
        }
    });

    app.post(
        "/api/images",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {
            // Final handler function after the above two middleware functions finish running
            const imageProvider = new ImageProvider(mongoClient);
    
            if (!req.file) {
                res.status(400).send("No file uploaded.");
                return;
            }
            if (!req.body.name) {
                res.status(400).send("Image name is required.");
                return;
            }
    
            // Extract image details
            const { name } = req.body;
            const { username } = res.locals.token;  // Assuming the username is in the token
    
            // Create a new image document
            const newImage: ImageDocument = {
                _id: req.file?.filename || "", 
                src: `/uploads/${req.file?.filename}`, 
                name: name, 
                likes: 0n,  // BigInt
                author: username,
            };
    
            try {
                // Create the image in the DB
                const result = await imageProvider.createImage(newImage);
    
                if (result.acknowledged && result.insertedId) {
                    // Successfully inserted, return the created image
                    const createdImage = {
                        _id: result.insertedId,
                        src: `/uploads/${req.file?.filename}`,
                        name: newImage.name,
                        author: newImage.author,
                        likes: newImage.likes.toString(), // Convert BigInt to string
                    };
    
                    res.status(201).json(createdImage); // HTTP 201 with the created image document
                } else {
                    // Insertion failed
                    res.status(500).send("Failed to upload image.");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                res.status(500).send("Error uploading image");
            }
        }
    );
};