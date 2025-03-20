import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { Workout, CompletedWorkoutProvider } from "../CompletedWorkoutProvider";

export function registerCompletedWorkoutRoutes(app: express.Application, mongoClient: MongoClient) {
    const workoutProvider = new CompletedWorkoutProvider(mongoClient);

    app.get("/api/completedworkouts", async (req: Request, res: Response) => {

        const workouts = await workoutProvider.getAllCompletedWorkouts();
        res.json(workouts);
    });



    app.post(
        "/api/completedworkouts",
        async (req: Request, res: Response) => {

            if (!req.body.workout_name || !req.body.created_at) {
                res.status(400).send("Missing required fields: name, author, or exercises.");
                return;
            }

            // Create a new workout document
            const newWorkout: Workout = {
                workout_name: req.body.workout_name,
                created_at: new Date(req.body.created_at),
            };
            console.log(newWorkout);

            try {
                // Create the image in the DB
                const result = await workoutProvider.createNewWorkout(newWorkout);
                console.log(result);
    
                if (result.acknowledged && result.insertedId) {
                    const createdWorkout = {
                        _id: result.insertedId, // MongoDB generates this
                        workout_name: newWorkout.workout_name,
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