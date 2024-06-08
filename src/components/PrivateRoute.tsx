import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

const PrivateRoute = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
};

export default PrivateRoute;