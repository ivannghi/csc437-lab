import React from "react";
import Navbar from "./navbar"; // Import Navbar
import { Outlet, useLocation} from "react-router"; 

function Layout() {
    const location = useLocation();

    // Hide Navbar only on the login page
    const hideNavbar = location.pathname === "/login";

    return (
        <div>
            {!hideNavbar && <Navbar />}
            <Outlet /> {/* This renders the nested page components */}
        </div>
    );
}

export default Layout;
