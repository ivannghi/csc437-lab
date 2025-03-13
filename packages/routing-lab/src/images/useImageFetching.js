import { useEffect, useState } from "react";

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData.
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param authToken {string} the authentication token to pass in the request header
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */

async function fetchImages(authToken) {
  if (!authToken) throw new Error("No authentication token provided");

  const response = await fetch("/api/images", {
      headers: {
          "Authorization": `Bearer ${authToken}`,
      }
  });

  if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export function useImageFetching(imageId, authToken) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true); // Make sure loading is true during the fetch
          
          try {
              console.log(`authToken: ${authToken}`);
              const data = await fetchImages(authToken);
              
              // Filter images based on imageId if provided
              if (imageId) {
                  // Make sure comparison is done correctly (ensure types are the same)
                  setFetchedImages(data.filter((image) => image._id === imageId));
              } else {
                  setFetchedImages(data); // Return all images if no imageId
              }
          } catch (error) {
              console.error(`Could not get images: ${error}`);
              setFetchedImages([]); // Return an empty array on error
          } finally {
              setIsLoading(false);
          }
      }

        if (authToken) { // Only fetch if authToken is provided
            fetchData();
        }
    }, [imageId, authToken]); // Re-run effect if imageId or authToken changes

    return { isLoading, fetchedImages };
}
