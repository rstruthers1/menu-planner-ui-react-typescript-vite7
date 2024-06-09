import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from "../types/userInfo";
import { getUserInfo } from '../utils/auth.util'; // Adjust the path as needed

interface AuthState {
    userInfo: UserInfo | null;
}

const initialState: AuthState = {
    userInfo: getUserInfo(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
