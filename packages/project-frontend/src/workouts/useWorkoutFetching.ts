import { useEffect, useState } from "react";

/**
 * Fetches workouts from the server and returns the state.
 * Returns an object with two properties: isLoading and fetchedWorkouts.
 *
 * @returns {{isLoading: boolean, fetchedWorkouts: WorkoutInstance[]}} fetch state and data
 */

export interface WorkoutInstance {
    _id: string; // MongoDB ObjectID stored as a string
    workout_name: string; // Name of the workout
    created_at: string; // Timestamp as a string (ISO format or custom)
};

async function fetchWorkouts() {
    const response = await fetch("/api/completedworkouts");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export function useWorkoutFetching(refreshKey: number, workoutID?: number) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedWorkouts, setFetchedWorkouts] = useState<WorkoutInstance[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error before fetching

            try {
                const data = await fetchWorkouts();
                setFetchedWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError("Failed to load workouts. Please try again later.");
                setFetchedWorkouts([]); // Ensure the array is empty on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [workoutID, refreshKey]); // Re-run effect if workoutID changes

    return { isLoading, fetchedWorkouts, error };
}
