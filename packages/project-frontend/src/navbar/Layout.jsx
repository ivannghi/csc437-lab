import React from "react";
import Navbar from "./navbar"; // Import Navbar
import { Outlet } from "react-router"; 

function Layout() {
    return (
        <div>
            {<Navbar />}
            <Outlet /> {/* This renders the nested page components */}
        </div>
    );
}

export default Layout;
