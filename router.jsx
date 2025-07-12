import { createBrowserRouter } from "react-router";
import Home from "./src/Components/Home/Home";
import Body from "./src/Components/Home/Body";
import AllProperties from "./src/Components/allProperties/AllProperties";


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
            }
        ]
    }
])

