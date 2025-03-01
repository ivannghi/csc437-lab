import { Outlet } from "react-router";
import { Header } from "./Header.jsx";

export function MainLayout(props) {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
