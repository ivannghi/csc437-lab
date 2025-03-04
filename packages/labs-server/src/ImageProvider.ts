import { MongoClient, WithId } from "mongodb";

interface Author {
    _id: string;
    username: string;
    email: string;
}

interface ImageDocument {
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

    async getAllImages(): Promise<DenormalizedImage[]> {
        const dbName = process.env.DB_NAME || "server";
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME || "images";
        const usersCollectionName = process.env.USERS_COLLECTION_NAME || "users";

        if (!imagesCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }

        const db = this.mongoClient.db(dbName);
        const imagesCollection = db.collection<WithId<ImageDocument>>(imagesCollectionName);

        return imagesCollection.aggregate<DenormalizedImage>([
            {
                $lookup: {
                    from: usersCollectionName,
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },
            {
                $unwind: "$authorDetails"
            },
            {
                $project: {
                    _id: 1,
                    src: 1,
                    name: 1,
                    likes: 1,
                    author: {
                        _id: "$authorDetails._id",
                        username: "$authorDetails.username",
                        email: "$authorDetails.email"
                    }
                }
            }
        ]).toArray();
    }
}
