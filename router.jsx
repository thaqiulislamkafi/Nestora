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
import MakeOffer from "./src/Components/Dashboard/MakeOffer";
import AddProperty from "./src/Components/Dashboard/AddProperty";
import AddedProperties from "./src/Components/Dashboard/AddedProperties";
import UpdateProperty from "./src/Components/Dashboard/UpdateProperty";
import Error from "./src/Components/Error/Error";
import AgentRoute from "./src/Components/Route/AgentRoute";
import Unauthorized from "./src/Components/Error/Unauthorized";
import UserRoute from "./src/Components/Route/UserRoute";
import PropertyBought from "./src/Components/Dashboard/PropertyBought";
import MyReviews from "./src/Components/Home/MyReviews";
import RequestedProperties from "./src/Components/Home/RequestedProperties";
import ManageProperties from "./src/Components/Dashboard/ManageProperties";
import AdminRoute from "./src/Components/Route/AdminRoute";
import ManageUsers from "./src/Components/Dashboard/ManageUsers";
import ManageReviews from "./src/Components/Dashboard/ManageReviews";
import AdvertiseProperty from "./src/Components/Dashboard/AdvertiseProperty";
import Payment from "./src/Components/Dashboard/Payment";
import MySoldProperties from "./src/Components/Dashboard/MySoldProperties";



export const router = createBrowserRouter([
    {
        path: '/',
       element : <Home/>,
       hydrateFallbackElement : <Error/>,
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
                element : <UserRoute><Wishlist/></UserRoute>
            },
            {
                path : 'property-bought',
                element : <UserRoute><PropertyBought/></UserRoute>
            },
            {
                path : 'makeOffer/:propertyId',
                element : <UserRoute><MakeOffer/></UserRoute>
            },
            {
                path : 'my-reviews',
                element : <UserRoute><MyReviews/></UserRoute>
            },
            {
                path : 'payment/:propertyId',
                element : <UserRoute><Payment/></UserRoute>
            },
            {
                path : 'add-property',
                element : <AgentRoute><AddProperty/></AgentRoute>
            },
            {
                path : 'my-properties',
                element : <AgentRoute><AddedProperties/></AgentRoute>
            },
            {
                path : 'update-property/:propertyId',
                element : <AgentRoute><UpdateProperty/></AgentRoute>
            },
            {
                path : 'sold-properties',
                element : <AgentRoute><MySoldProperties/></AgentRoute>
            },
            {
                path : 'requested-properties',
                element : <AgentRoute><RequestedProperties/></AgentRoute>
            },
            {
                path : 'manageProperties',
                element : <AdminRoute><ManageProperties/></AdminRoute>
            },
            {
                path : 'manageUsers',
                element : <AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path : 'manageReviews',
                element : <AdminRoute><ManageReviews/></AdminRoute>
            },
            {
                path : 'advertiseProperty',
                element : <AdminRoute><AdvertiseProperty/></AdminRoute>
            },
        ]
    },
    {
        path : '*',
        element : <Error/>
    },
    {
        path : '/unauthorized',
        element : <Unauthorized/>
    }
    
])

