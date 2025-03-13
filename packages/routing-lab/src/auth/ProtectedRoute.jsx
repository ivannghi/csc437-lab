import { Navigate, Outlet } from "react-router";

export function ProtectedRoute(props) {
    if (!props.authToken) {
        return <Navigate to="/login" replace />
    }

    return <Outlet/>;
}