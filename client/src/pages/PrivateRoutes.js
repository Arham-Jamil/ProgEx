import { useContext } from "react";
import {Outlet, Navigate} from "react-router-dom"
import { AuthContext } from "../store/AuthContext";

const PrivateRoutes = () =>{
    const {auth} = useContext(AuthContext);
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
        // auth.token ? <Outlet/> : <Outlet/>


    )
}
export default PrivateRoutes;