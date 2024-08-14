import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
//
export const ProtectedRoutes = () => {
    //
    const { authState } = useContext(AuthContext);
    const success = authState.success;
    return success ? <Outlet /> : <Navigate to="/login" />;
    //    
};

export const ProtectedRoutesOut = () => {
    //
    const { authState } = useContext(AuthContext);
    const success = authState.success;
    return success ?  <Navigate to="/" /> : <Outlet />;
    //    
};