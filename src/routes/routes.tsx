import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Error from "../pages/error";
import Signup from "../pages/signup";
import Home from "../pages/home";
import Profile from "../pages/profile";
import MyPhoto from "../pages/myphotos";
import Post from "../pages/post";
import ProtectedRoutes from "../protectedRoutes";
import EditProfile from "@/pages/profile/editProfile";


export const router = createBrowserRouter([
    {
        element: <ProtectedRoutes/>,
        children: [
            {
             path: "/",
             element: <Home />,
             errorElement: <Error />,         
           },
           {
             path: "/post",
             element: <Post />,
             errorElement: <Error />,         
           },
         {
             path: "/profile",
             element: <Profile />,
            errorElement: <Error />,
        },
        {
             path: "/edit-profile",
             element: <EditProfile />,
            errorElement: <Error />,
        },
        {
             path: "/myphotos",
             element: <MyPhoto />,
             errorElement: <Error />,
        },
     ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error />,
    },
])

export default router;