import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const baseURL = import.meta.env.VITE_API_BASE_URL;


const BASE_URL = `${baseURL}/rest/auth/`

interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    tokenExpiry: number;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials: 'include'}),
    endpoints: (builder) =>
        ({
            registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
                query: (userRegistration) => ({
                    url: 'register',
                    method: 'POST',
                    body: userRegistration
                })
            }),
            loginUser: builder.mutation<LoginResponse, LoginRequest>({
                query: (loginRequest) => ({
                    url: 'login',
                    method: 'POST',
                    body: loginRequest
                })
            }),
            logoutUser: builder.mutation<void, void>({
                query: () => ({
                    url: 'logout',
                    method: 'POST'
                })
            })
        })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = authApi;