import React from "react";
import Sidebar from "../sidebar/sidebar"; // Import Sidebar component
import "./workouthome.css";

const WorkoutHome = () => {
    const workoutLinks = [
        { path: "/buildworkout", label: "Build Workout" },
        { path: "/premadeworkouts", label: "Premade Workouts" },
        { path: "/freeworkout", label: "Free Workout" },
        { path: "/pastworkouts", label: "Past Workouts" }
    ];

    return (
        <div className="container">
            <Sidebar links={workoutLinks} />
            <div class="content">
                <h1>Welcome to Workout Home</h1>
            </div>
        </div>
    );
};

export default WorkoutHome;
