import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const auth  = useContext(AuthContext);

    if (auth?.loading) {
        return <div>Loading...</div>;
    }

    return auth?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
