import { createBrowserRouter } from "react-router";
import Home from "./src/Components/Home/Home";
import Body from "./src/Components/Home/Body";
import AllProperties from "./src/Components/allProperties/AllProperties";
import Login from "./src/Components/Registration/Login";
import SignUp from "./src/Components/Registration/SignUp";


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
            
            
        ]
    },

    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/signup',
        element : <SignUp/>
    }
    
])

