import React from 'react';
import { useNavigate } from 'react-router'; // Correct import

export function HomePage(){
    // const navigate = useNavigate(); // Initialize navigate

    // const handleWorkoutButton = () => {
    //     navigate('/workouthome');  // Navigate to Home page
    // };

    // const handleCaloriesButton = () => {
    //     navigate('/calorieshome');  // Navigate to Home page
    // };

    // const handleLogoutButton = () => {
    //     navigate('/login');  // Navigate to Home page
    // };

    return (
        <div className="centeritems">
            {/* Starter Box for Workouts and Calories */}
            <h1 className="font-semibold text-xl">Today's Overview</h1>

            {/* List of Workouts */}
            <div>
                <h2 className="font-semibold text-xl"> Workouts for Today</h2>
                <ul>
                    <li>Push-ups - 3 sets of 15 reps</li>
                    <li>Squats - 3 sets of 20 reps</li>
                    <li>Jogging - 30 minutes</li>
                </ul>
            </div>

            {/* Calories Left */}
            <div>
                <h3 className="font-semibold text-xl"> Calories Left</h3>
                <p>You have <strong>450</strong> calories left for the day!</p>
            </div>

        </div>
    );
};

export default HomePage;
