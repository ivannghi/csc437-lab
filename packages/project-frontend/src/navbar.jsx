import React from 'react';
import { useNavigate, Link } from 'react-router'; // Correct import

export function Navbar({ onCaloriesClick, onWorkoutClick }) {
    return (
        <nav className="navbar">
            <h1 className="heading">Home Page</h1>
            <div className="nav-buttons">
                <Link to='/calorieshome'>Calories</Link>
                <Link to='/workouthome'>Workouts</Link>
            </div>
        </nav>
    );
}

export default Navbar;