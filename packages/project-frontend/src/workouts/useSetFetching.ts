import { useEffect, useState } from "react";

/**
 * Fetches sets for a specific workout from the server.
 * @param workoutId The ID of the workout to fetch sets for.
 */
export interface MadeSet {
    _id: string; // MongoDB ObjectID stored as a string
    completed_workout_id: string; // MongoDB ObjectID of the workout
    exercise_name: string;
    set_number: number;
    weight: number;
    reps: number;
    created_at: string; // Timestamp as a string (ISO format or custom)
};

async function fetchSets(workoutId?: string) {
    console.log(workoutId);
    const url = workoutId ? `/api/completedsets?completed_workout_id=${workoutId}` : "/api/completedsets";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export function useSetFetching(workoutId?: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedSets, setFetchedSets] = useState<MadeSet[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error before fetching

            try {
                const data = await fetchSets(workoutId);

                // If workoutId is provided, filter the sets for that specific workoutId
                if (workoutId) {
                    setFetchedSets(data.filter((set: MadeSet) => set.completed_workout_id === workoutId));
                } else {
                    setFetchedSets(data); // Return all sets if no workoutId is provided
                }
            } catch (error) {
                console.error("Error fetching sets:", error);
                setError("Failed to load sets. Please try again later.");
                setFetchedSets([]); // Ensure the array is empty on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [workoutId]); // Re-run effect if workoutId changes

    return { isLoading, fetchedSets, error };
}
