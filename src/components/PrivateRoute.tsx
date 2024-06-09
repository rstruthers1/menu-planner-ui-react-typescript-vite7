import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfoIfTokenExpired } from '../utils/auth.util'; // Adjust the path as needed
import { RootState, AppDispatch } from '../app/store'; // Adjust the path as needed

const PrivateRoute = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useEffect(() => {
        clearUserInfoIfTokenExpired(dispatch);
    }, [dispatch]);

    const tokenExpired = userInfo ? new Date().getTime() >= userInfo.tokenExpiry : true;

    return tokenExpired ? <Navigate to='/login' replace /> : <Outlet />;
};

export default PrivateRoute;
