import { useEffect, useState } from "react";

/**
 * Fetches workouts from the server and returns the state.
 * Returns an object with two properties: isLoading and fetchedWorkouts.
 *
 * @returns {{isLoading: boolean, fetchedWorkouts: WorkoutData[]}} fetch state and data
 */

export interface WorkoutData {
    _id: string; // MongoDB ObjectID stored as a string
    name: string; // Name of the workout
    exercises: string[]; // Array of exercise names
    created_at: string; // Timestamp as a string (ISO format or custom)
    author: string; // UUID of the workout creator
};

async function fetchWorkouts() {
    const response = await fetch("/api/premadeworkouts");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export function usePremadeWorkoutFetching(workoutID?: number) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPremadeWorkouts, setFetchedPremadeWorkouts] = useState<WorkoutData[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error before fetching

            try {
                const data = await fetchWorkouts();
                setFetchedPremadeWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError("Failed to load workouts. Please try again later.");
                setFetchedPremadeWorkouts([]); // Ensure the array is empty on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [workoutID]); // Re-run effect if workoutID changes

    return { isLoading, fetchedPremadeWorkouts, error };
}
