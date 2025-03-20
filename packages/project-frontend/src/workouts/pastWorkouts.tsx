import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { WorkoutInstance } from './useWorkoutFetching';
import './pastWorkout.css';
import { useSetFetching } from './useSetFetching';

type WorkoutsPageProps = {
    isLoading: boolean;
    fetchedWorkouts: WorkoutInstance[];
};

const ViewPastPage: React.FC<WorkoutsPageProps> = ({ fetchedWorkouts, isLoading }) => {
    const navigate = useNavigate();
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutInstance | null>(null);

    // Fetch sets when a workout is selected
    const { isLoading: isLoadingSets, fetchedSets, error } = useSetFetching(selectedWorkout?._id);

    const handleBackButton = () => {
        navigate('/workouthome');
    };

    // Handles clicking a workout to display details and fetch sets
    const handleWorkoutClick = (workout: WorkoutInstance) => {
        setSelectedWorkout(workout);
    };

    return (
        <div className="workout-page-container">
            {/* Main Workout List */}
            <div className="workout-container">
                <div className="workout-card">
                    <h1 className="workout-title">Past Workouts</h1>

                    <div className="workout-table-container">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : fetchedWorkouts.length === 0 ? (
                            <p>No previous workouts found.</p>
                        ) : (
                            <table className="workout-table">
                                <thead>
                                    <tr>
                                        <th>Workout Name</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchedWorkouts.map((workout) => (
                                        <tr 
                                            key={workout._id} 
                                            className="workout-row"
                                            onClick={() => handleWorkoutClick(workout)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{workout.workout_name}</td>
                                            <td>{new Date(workout.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="back-button-container">
                        <button className="back-button" onClick={handleBackButton}>Back</button>
                    </div>
                </div>
            </div>

            {/* Workout Details Panel (Shown when a workout is selected) */}
            {selectedWorkout && (
                <div className="workout-details-panel">
                    {isLoadingSets ? (
                        <p>Loading sets...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : fetchedSets.length === 0 ? (
                        <p>No sets found for this workout.</p>
                    ) : (
                        <div>
                            <h2>Sets for {selectedWorkout.workout_name}</h2>
                            <ul>
                                {fetchedSets.map((set) => (
                                    <li key={set._id}>
                                        <p><strong>Exercise:</strong> {set.exercise_name}</p>
                                        <p><strong>Reps:</strong> {set.reps}</p>
                                        <p><strong>Weight:</strong> {set.weight} lbs</p>
                                    </li>
                                ))}
                            </ul>
                            <button className="close-button" onClick={() => setSelectedWorkout(null)}>Close</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewPastPage;
