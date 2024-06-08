import {createSlice} from '@reduxjs/toolkit';
import {UserInfo} from "../types/userInfo.ts";



const getUserInfo = () => {
    const userInfoJSON : string | null | undefined = localStorage.getItem('userInfo');
    console.log(`type of userInfoJSON: ${typeof userInfoJSON}`);
    if (userInfoJSON) {
        try {
            return JSON.parse(userInfoJSON);
        } catch (e) {
            console.error(e);
        }
    }
    return null;
}


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
