import { MongoClient, Timestamp, WithId } from "mongodb";

export interface MadeWorkout {
    author: string;
    name: string;
    exercises: string[]; // This is the author ID in the images collection
    created_at: Date;
}

export class WorkoutProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllWorkouts(author?: string): Promise<MadeWorkout[]> {
        const dbName = process.env.DB_NAME || "gyno";
        const madeWorkoutCollection = process.env.MADE_WORKOUT_COLLECTION || "premadeworkouts";
    
        if (!madeWorkoutCollection) {
            throw new Error("Missing MADE_WORKOUT_COLLECTION from environment variables");
        }
    
        const db = this.mongoClient.db(dbName);
        const workoutCollection = db.collection<WithId<MadeWorkout>>(madeWorkoutCollection);
    
        const query: any = {};
    
        // Conditionally filter by author ID if provided
        if (author) {
            query.author = author;
        }
    
        // Fetch images directly without denormalizing the author details
        const workouts = await workoutCollection.find(query).toArray();
    
        return workouts;
    }

    async createWorkout(workout: MadeWorkout) {
        const dbName = process.env.DB_NAME || "gyno";
        const madeWorkoutCollection = process.env.MADE_WORKOUT_COLLECTION || "workouts";

        const db = this.mongoClient.db(dbName);
        const workoutCollection = db.collection<MadeWorkout>(madeWorkoutCollection);

        const result = await workoutCollection.insertOne(workout);

        return result;

    }
}
