import React from 'react';
import { Link, useLocation } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import "./navbar.css";

export function Navbar() {
    const location = useLocation();
    
    // Determine the heading based on the current page
    const getHeading = () => {
        switch (location.pathname) {
            case "/home":
                return "Home Page";
            case "/workouthome":
                return "Workouts";
            case "/calorieshome":
                return "Calories Tracker";
            default:
                return "Welcome!";
        }
    };

    return (
        <nav className="navbar">
            <h1 className="">{getHeading()}</h1>
            <div className="nav-buttons">
                <Link
                    to="/home"
                    className={location.pathname ==='/home' ? "active-link" : ""}>
                        Home
                </Link>
                <Link 
                    to='/calorieshome' 
                    className={location.pathname === "/calorieshome" ? "active-link" : ""}
                >
                    Calories
                </Link>
                <Link 
                    to='/workouthome' 
                    className={location.pathname === "/workouthome" ? "active-link" : ""}
                >
                    Workouts
                </Link>
                <Link 
                    to='/login' 
                    className={location.pathname === "/login" ? "active-link" : ""}
                >
                    Logout
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
