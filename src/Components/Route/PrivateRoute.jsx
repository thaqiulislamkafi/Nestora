import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../SharedElement/Loading';

const PrivateRoute = ({children}) => {

    const {currentUser,loading} = use(AuthContext) ;
    const location = useLocation() ;
   
    
    if(currentUser) 
        return children

    if(loading)
        return <Loading/>

    return <Navigate to={'/login'} state={{from : location}} replace></Navigate>
};

export default PrivateRoute;