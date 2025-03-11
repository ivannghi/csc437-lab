import { useEffect, useState } from "react";

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */

async function fetchImages() {
    const response = await fetch(
      "/api/images",
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  
  
export function useImageFetching(imageId, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchImages();

            setFetchedImages(imageId ? data.filter((image) => image._id === imageId) : data);
    } catch (error) {
                console.error(`Could not get images: ${error}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [imageId]);

    return { isLoading, fetchedImages };
}
