import React from "react";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router";
import "./workouthome.css";

function WorkoutLayout() {
    const workoutLinks = [
        { path: "/workouthome", label: "Workout Home"},
        { path: "/buildworkout", label: "Build Workout" },
        { path: "/premadeworkouts", label: "Premade Workouts" },
        { path: "/freeworkout", label: "Free Workout" },
        { path: "/pastworkouts", label: "Past Workouts" }
    ];

    return (
        <div className="outside">
            <Sidebar className="sidebar" links={workoutLinks} />
            <div className="content">
                <Outlet />
            </div>

        </div>
    );
}

export default WorkoutLayout;
