import React from 'react';
import { useNavigate } from 'react-router'; // Correct import


const CaloriesHome = () => {
    const navigate = useNavigate(); // Initialize navigate

    return (
        <div>
            {/* Center content horizontally and vertically */}
            <h1>
                Calories Home
            </h1>
            <p>Insert box here</p>
        </div>
    );
};

export default CaloriesHome;
