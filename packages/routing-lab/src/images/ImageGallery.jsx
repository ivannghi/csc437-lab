import "./ImageGallery.css";
import { Link } from "react-router";
import { ImageUploadForm } from "./ImageUploadForm";

export function ImageGallery(props) {

    const imageElements = props.fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));
    
    async function handleSubmit(formData) {
        try {
            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${props.authToken}`,
                }
            });

            // console.log("after");
            if (!response.ok) {
                console.log("before res.json");
                // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
                const errorText = await response.text();  // Read error message safely
                console.log("after res.json");

                throw new Error(errorText || "Request failed");
            }

            return { type: "success", message: "Image uploaded successfully!", color: "green" };
        } catch (error) { // Network error
            console.error(error);
            return {
                type: "error",
                message: error.message || "Upload failed, please try again.",
            }
        }
    }

    return (
        <div>
            <h3>Upload an Image</h3>
            <ImageUploadForm onSubmit={handleSubmit}/>
            <h2>Image Gallery</h2>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}
