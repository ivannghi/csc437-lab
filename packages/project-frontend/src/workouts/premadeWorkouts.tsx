import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// Define TypeScript type for a workout


const PremadeWorkoutsPage = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);  // Type: Array of Workout
    const [loading, setLoading] = useState(true);    // Type: boolean
    const [error, setError] = useState(null);  // Type: string or null
    const [selectedWorkout, setSelectedWorkout] = useState(null);  // Type: Workout or null

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //         setLoading(true);
    //         const { data, error } = await supabase.from('premade_workouts').select('*');

    //         if (error) {
    //             setError('Failed to load workouts.');
    //             console.error("Supabase Fetch Error:", error);
    //         } else {
    //             setWorkouts(data);
    //         }

    //         setLoading(false);
    //     };

    //     fetchWorkouts();
    // }, []);

    // const handleViewWorkout = (workout) => {
    //     setSelectedWorkout(workout); // Open modal with selected workout
    // };

    // const handleCloseModal = () => {
    //     setSelectedWorkout(null); // Close modal
    // };

    // const handleEditWorkout = (workoutId) => {
    //     navigate(`/edit-workout/${workoutId}`);
    // };

    // const handleUseWorkout = (workoutId) => {
    //     navigate(`/premade-workout/${workoutId}`);
    // };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Premade Workouts
                </h1>

                {/* Display Loading Message */}
                {/* {loading && <p>Loading workouts...</p>} */}
                <p>Loading workouts...</p>

                {/* Display Error Message */}
                {error && <p className="error-message">{error}</p>}

                
            </div>

            {/* Workout Modal */}
            {/* {selectedWorkout && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedWorkout.name}</h2>
                        <ul>
                            {selectedWorkout.exercises.map((exercise, index) => (
                                <li key={index}>{exercise}</li>
                            ))}
                        </ul>
                        <button className="close-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default PremadeWorkoutsPage;
