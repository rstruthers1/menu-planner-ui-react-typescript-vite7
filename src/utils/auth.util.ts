// auth.util.ts

import { UserInfo } from "../types/userInfo";
import { AppDispatch } from '../app/store';
import { clearUserInfo } from '../slices/authSlice';

export const getUserInfo = (): UserInfo | null => {
    const userInfoJSON: string | null = localStorage.getItem('userInfo');
    if (userInfoJSON) {
        try {
            return JSON.parse(userInfoJSON);
        } catch (e) {
            console.error('Error parsing userInfo from local storage:', e);
        }
    }
    return null;
};

export const isTokenExpired = (userInfo: UserInfo | null): boolean => {
    if (userInfo) {
        const expiryTime = userInfo.tokenExpiry;
        const currentTime = new Date().getTime();
        return currentTime >= expiryTime;
    }
    return true;
};

export const clearUserInfoIfTokenExpired = (dispatch: AppDispatch): void => {
    const userInfo = getUserInfo();
    if (isTokenExpired(userInfo)) {
        dispatch(clearUserInfo());
        console.log('User info cleared due to expired token');
    }
};
