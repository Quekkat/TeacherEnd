import {Outlet, Navigate} from "react-router-dom";
import {useStore} from "./globalVariables";

const ProtectedRoutes =()=>{
    const {authUser} = useStore();
    return authUser? <Outlet/> :<Navigate to="/login"/>
}
export default ProtectedRoutes;