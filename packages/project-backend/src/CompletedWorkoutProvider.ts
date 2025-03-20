import { MongoClient, WithId } from "mongodb";

export interface Workout {
    workout_name: string;
    created_at: Date;
}

export class CompletedWorkoutProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllCompletedWorkouts(workout_name?: string): Promise<Workout[]> {
        const dbName = process.env.DB_NAME || "gyno";
        const completedWorkoutCollection = process.env.COMPLETED_WORKOUTS_COLLECTION || "workouts";
    
        if (!completedWorkoutCollection) {
            throw new Error("Missing COMPLETED_WORKOUTS_COLLECTION from environment variables");
        }
    
        const db = this.mongoClient.db(dbName);
        const workoutCollection = db.collection<WithId<Workout>>(completedWorkoutCollection);
    
        const query: any = {};
    
        // Conditionally filter by author ID if provided
        if (workout_name) {
            query.workout_name = workout_name;
        }
    
        // Fetch images directly without denormalizing the author details
        const workouts = await workoutCollection.find(query).toArray();
    
        return workouts;
    }

    async createNewWorkout(workout: Workout) {
        const dbName = process.env.DB_NAME || "gyno";
        const completedWorkoutCollection = process.env.COMPLETED_WORKOUTS_COLLECTION || "workouts";

        const db = this.mongoClient.db(dbName);
        const workoutCollection = db.collection<Workout>(completedWorkoutCollection);

        const result = await workoutCollection.insertOne(workout);

        return result;

    }
}
