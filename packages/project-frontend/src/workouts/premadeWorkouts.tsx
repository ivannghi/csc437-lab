import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { WorkoutData } from './usePremadeWorkoutFetching';
import './premadeWorkout.css';

// Define TypeScript type for a workout
// Define Props type for PremadeWorkoutsPage
type PremadeWorkoutsPageProps = {
    isLoading: boolean;
    fetchedWorkouts: WorkoutData[];
};

const PremadeWorkoutsPage: React.FC<PremadeWorkoutsPageProps> = ({ isLoading, fetchedWorkouts }) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Premade Workouts
                </h1>

                {/* Loading State */}
                {isLoading ? (
                    <p>Loading workouts...</p>
                ) : fetchedWorkouts.length === 0 ? (
                    <p>No premade workouts available.</p>
                ) : (
                    <div className="workout-list-container">
                        <ul>
                            {fetchedWorkouts.map((workout) => (
                                <li key={workout._id} className="workout-item">
                                    <div>
                                        <h3 className="text-lg font-semibold">{workout.name}</h3>
                                        <p><strong>Exercises:</strong> {workout.exercises.join(", ")}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PremadeWorkoutsPage;
