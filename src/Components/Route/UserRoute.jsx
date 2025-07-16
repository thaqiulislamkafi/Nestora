import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseUserRole from '../Hooks/useUserRole';
import Loading from '../SharedElement/Loading';

const UserRoute = ({children}) => {
    const location = useLocation();
    const { role, isLoading, error } = UseUserRole();

    if (isLoading) {
        return <Loading />;
    }

    if (error || !role) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== 'user') {
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
};

export default UserRoute;