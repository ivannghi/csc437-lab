import React, { useEffect, useRef } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const isStale = useRef(false); // useRef to persist the state across renders

    useEffect(() => {
        // Mark the component as not stale when this effect runs
        isStale.current = false;

        const fetchData = async (url) => {
            if (!isStale.current) {
                setError(null); // Reset error before fetching
                setGroceryData([]); // Clear previous data
                setLoading(true); // Start loading
            }
            
            try {
                console.log("Fetching data from", url);
                const response = await groceryFetcher.fetch(url);
                // Check if the component is still mounted before updating state
                if (!isStale.current) {
                    setGroceryData(response); // Update state with new data
                }
            } catch (err) {
                // Handle error if the component is not stale
                if (!isStale.current) {
                    setError("Failed to fetch data");
                }
            } finally {
                // Ensure loading state is turned off
                if (!isStale.current) {
                    setLoading(false);
                }
            }
        };

        if (source === "MDN") {
            fetchData("MDN"); // Fetch data from MDN
        } else {
            fetchData(source); // Fetch data from dynamic source
        }

        // Cleanup function to mark component as stale when it's unmounted or source changes
        return () => {
            isStale.current = true;
        };
    }, [source]); // Runs when 'source' changes

    return { groceryData, isLoading, error };
}
