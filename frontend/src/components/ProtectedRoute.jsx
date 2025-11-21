import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("User"));
    if (!token || user?.role !== "admin") {
        return <Navigate to="/login" />;
    }
    return children;
}