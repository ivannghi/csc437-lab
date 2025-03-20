import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { MadeWorkout, WorkoutProvider } from "../WorkoutProvider";

export function registerWorkoutRoutes(app: express.Application, mongoClient: MongoClient) {
    const workoutProvider = new WorkoutProvider(mongoClient);

    app.get("/api/premadeworkouts", async (req: Request, res: Response) => {
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
    
        const workouts = await workoutProvider.getAllWorkouts(userId);
        res.json(workouts);
    });

    app.post(
        "/api/premadeworkouts",
        async (req: Request, res: Response) => {
            // Final handler function after the above two middleware functions finish running
            console.log("in backend");
            console.log(req.body);
            if (!req.body.name || !req.body.author || !req.body.exercises) {
                res.status(400).send("Missing required fields: name, author, or exercises.");
            }

            // Create a new workout document
            const newWorkout: MadeWorkout = {
                name: req.body.name,
                author: req.body.author,
                exercises: req.body.exercises,
                created_at: new Date(req.body.created_at),
            };
            console.log(newWorkout);

            try {
                // Create the image in the DB
                const result = await workoutProvider.createWorkout(newWorkout);
                console.log(result);
    
                if (result.acknowledged && result.insertedId) {
                    const createdWorkout = {
                        _id: result.insertedId, // MongoDB generates this
                        name: newWorkout.name,
                        author: newWorkout.author,
                        exercises: newWorkout.exercises,
                        created_at: newWorkout.created_at.toISOString(),
                    };
    
                    res.status(201).json(createdWorkout); // HTTP 201 with the created image document
                } else {
                    // Insertion failed
                    res.status(500).send("Failed to upload workout.");
                }
            } catch (error) {
                console.error("Error uploading workout:", error);
                res.status(500).send("Error uploading workout");
            }
        }
    );

    
}