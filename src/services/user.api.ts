import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = `${baseURL}/api/users`;

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserRequest {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: BASE_URL, credentials: 'include'}),
    tagTypes: ['User'],
    endpoints: (builder) =>
        ({
            getUser: builder.query<UserResponse, number>({
                query: (id: number) => (
                    {
                        url: `/${id}`,
                        method: 'GET'
                    }
                ),
                providesTags: ['User']
            }),
            updateUser: builder.mutation<UserResponse, UserRequest>({
                query: (user) => ({
                    url: `/${user.id}`,
                    method: 'PATCH',
                    body: {firstName: user.firstName, lastName: user.lastName, email: user.email}
                }),
                invalidatesTags: ['User']
            })
        })
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi;