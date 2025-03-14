import { Request, Response, NextFunction } from "express";
import multer from "multer";

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO 1
        cb(null, process.env.IMAGE_UPLOAD_DIR || "uploads");
    },
    filename: function (req, file, cb) {
        // Determine file extension based on MIME type
        let fileExtension = "";
        if (file.mimetype === "image/png") {
            fileExtension = "png";
        } else if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
            fileExtension = "jpg";
        } else {
            return cb(new ImageFormatError("Unsupported image type"), "");
        }

        // Generate a unique filename
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExtension}`;

        cb(null, fileName);
    }
});

export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});

export function handleImageFileErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}