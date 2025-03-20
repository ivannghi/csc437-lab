import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { registerWorkoutRoutes } from "./routes/workouts";
import { registerCompletedWorkoutRoutes } from "./routes/completedWorkouts";
import { registerSetRoutes } from "./routes/sets";
import { registerAuthRoutes } from "./routes/auth";

async function setUpServer() {
    dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
    const PORT = process.env.PORT || 3000;
    const staticDir = process.env.STATIC_DIR || "public";

    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only

    const app = express();
    app.use(express.json());
    app.use(express.static(staticDir));


    app.get("/hello", (req: Request, res: Response) => {
        res.send("Hello, World");
    });

    registerWorkoutRoutes(app, mongoClient);
    registerCompletedWorkoutRoutes(app, mongoClient);
    registerSetRoutes(app, mongoClient);
    registerAuthRoutes(app, mongoClient);

    app.get("*", (req: Request, res: Response) => {
        console.log("none of the routes above me were matched");
        res.sendFile("index.html", { root: staticDir });
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });

}

setUpServer();