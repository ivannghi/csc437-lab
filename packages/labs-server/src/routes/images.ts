import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

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
            res.status(204).send()
        }
    });
};