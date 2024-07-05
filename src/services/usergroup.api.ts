import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserResponse} from "./user.api.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = `${baseURL}/api/usergroups`;

export interface UserGroupResponse {
    id: number;
    name: string;
    users: UserResponse[];
}

export interface UserGroupRequest {
    name: string;
}

export const userGroupApi = createApi({
    reducerPath: 'userGroupApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['UserGroup'],
    endpoints: (builder) => ({
        getUserGroups: builder.query<UserGroupResponse[], void>({
            query: () => '',
            providesTags: ['UserGroup'],
        }),
        addUserGroup: builder.mutation<UserGroupResponse, UserGroupRequest>({
            query: (userGroup) => ({
                url: '',
                method: 'POST',
                body: userGroup,
            }),
            invalidatesTags: ['UserGroup'],
        }),
    }),
});

export const {useGetUserGroupsQuery, useAddUserGroupMutation} = userGroupApi;