import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import "./navbar.css";

export function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    
    // Update the dark mode state based on localStorage (if previously set)
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        if (savedMode) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
        
        if (newMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Determine the heading based on the current page
    const getHeading = () => {
        switch (location.pathname) {
            case "/":
                return "Home Page";
            case "/workouthome":
                return "Workouts";
            default:
                return "Welcome!";
        }
    };

    return (
        <nav className="navbar">
            <h1>{getHeading()}</h1>
            
            <div className="nav-buttons">
                <label>
                    Dark Mode
                    <input 
                        type="checkbox" 
                        checked={isDarkMode} 
                        onChange={toggleDarkMode} 
                    />
                </label>
                <Link
                    to="/"
                    className={location.pathname ==='/' ? "active-link" : ""}>
                        Home
                </Link>
                <Link 
                    to='/workouthome' 
                    className={location.pathname === "/workouthome" 
                        || location.pathname === "/buildworkout" 
                        || location.pathname === "/premadeworkouts" 
                        || location.pathname === "/freeworkout" 
                        || location.pathname === "/pastworkouts" ? "active-link" : ""}
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
