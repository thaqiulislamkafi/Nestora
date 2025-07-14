import { createBrowserRouter } from "react-router";
import Home from "./src/Components/Home/Home";
import Body from "./src/Components/Home/Body";
import AllProperties from "./src/Components/allProperties/AllProperties";
import Login from "./src/Components/Registration/Login";
import SignUp from "./src/Components/Registration/SignUp";
import PropertyDetails from "./src/Components/PropertyDetails/PropertyDetails";
import Dashboard from "./src/Components/Dashboard/Dashboard";
import MyProfile from "./src/Components/Dashboard/MyProfile";
import Wishlist from "./src/Components/Dashboard/Wishlist";


export const router = createBrowserRouter([
    {
        path: '/',
       element : <Home/>,
        children: [
            {
                index :true,
                element : <Body/>
            },
            {
                path : '/allProperties',
                element : <AllProperties/>
            },
            {
                path : '/propertyDetails/:propertyId',
                element : <PropertyDetails/>
            },
            
            
        ]
    },

    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/signup',
        element : <SignUp/>
    },
    {
        path : 'dashboard',
        element : <Dashboard/>,
        children : [
            {
                path : 'myProfile',
                element : <MyProfile/>
            },
            {
                path : 'wishlist',
                element : <Wishlist/>
            },
        ]
    }
    
])

