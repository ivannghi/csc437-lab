import { MongoClient, WithId } from "mongodb";

interface Author {
    _id: string;
    username: string;
    email: string;
}

export interface ImageDocument {
    _id: string;
    src: string;
    name: string;
    author: string; // This is the author ID in the images collection
    likes: bigint;
}

interface DenormalizedImage {
    _id: string;
    src: string;
    name: string;
    likes: bigint;
    author: Author; // Full author details
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(author?: string): Promise<ImageDocument[]> {
        const dbName = process.env.DB_NAME || "server";
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME || "images";
    
        if (!imagesCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
    
        const db = this.mongoClient.db(dbName);
        const imagesCollection = db.collection<WithId<ImageDocument>>(imagesCollectionName);
    
        const query: any = {};
    
        // Conditionally filter by author ID if provided
        if (author) {
            query.author = author;
        }
    
        // Fetch images directly without denormalizing the author details
        const images = await imagesCollection.find(query).toArray();
    
        return images;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const dbName = process.env.DB_NAME || "server";
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME || "images";
    
        if (!imagesCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
    
        const db = this.mongoClient.db(dbName);
        const imagesCollection = db.collection<WithId<ImageDocument>>(imagesCollectionName);

        const result = await imagesCollection.updateOne(
            { _id: imageId },
            { $set: { name: newName } }
        );
        // console.log(result);
    
        return result.matchedCount;
    }

    async createImage(image: ImageDocument) {
        const dbName = process.env.DB_NAME || "server";
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME || "images";

        const db = this.mongoClient.db(dbName);
        const imagesCollection = db.collection<WithId<ImageDocument>>(imagesCollectionName);

        const result = await imagesCollection.insertOne(image);

        return result;

    }
}
