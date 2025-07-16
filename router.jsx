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
                path : 'makeOffer/:propertyId',
                element : <UserRoute><MakeOffer/></UserRoute>
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

