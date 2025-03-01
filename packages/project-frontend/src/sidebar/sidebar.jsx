import React from "react";
import { Link } from "react-router"; // Ensure correct import
import "./sidebar.css"; // Import styles

const Sidebar = ({ links }) => {
    return (
        <div className="sidebar">
            {links.map((link, index) => (
                <Link key={index} to={link.path} className="sidebar-link">
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
