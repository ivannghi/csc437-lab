import { MongoClient, UUID, WithId } from "mongodb";

export interface Set {
    completed_workout_id: UUID;
    exercise_name: string;
    set_number: number;
    weight: number;
    reps: number;
    created_at: Date;
}

export class SetProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllSets(workout?: string): Promise<Set[]> {
        const dbName = process.env.DB_NAME || "gyno";
        const completedsetCollection = process.env.COMPLETED_SET_COLLECTION || "completedsets";
    
        if (!completedsetCollection) {
            throw new Error("Missing MADE_WORKOUT_COLLECTION from environment variables");
        }
    
        const db = this.mongoClient.db(dbName);
        const setCollection = db.collection<WithId<Set>>(completedsetCollection);
    
        const query: any = {};
    
        // Conditionally filter by author ID if provided
        if (workout) {
            query.completed_workout_id = workout;
        }
    
        // Fetch images directly without denormalizing the author details
        const set = await setCollection.find(query).toArray();
    
        return set;
    }

    async createSet(set: Set) {
        const dbName = process.env.DB_NAME || "gyno";
        const completedsetCollection = process.env.COMPLETED_SET_COLLECTION || "completedsets";

        const db = this.mongoClient.db(dbName);
        const setCollection = db.collection<Set>(completedsetCollection);

        const result = await setCollection.insertOne(set);

        return result;

    }
}
