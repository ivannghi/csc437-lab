import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { SetProvider } from "../SetProvider";

export function registerSetRoutes(app: express.Application, mongoClient: MongoClient) {
    const setProvider = new SetProvider(mongoClient);

    app.get("/api/completedsets", async (req: Request, res: Response) => {
        const workoutId = req.query.workoutId as string | undefined; // Extract workoutId from query
        try {
            // Fetch sets filtered by workoutId if present
            const sets = await setProvider.getAllSets(workoutId); 
            res.json(sets); // Send the fetched sets as a response
        } catch (error) {
            console.error("Error fetching sets:", error);
            res.status(500).json({ error: "Failed to fetch sets" });
        }
    });
    
}