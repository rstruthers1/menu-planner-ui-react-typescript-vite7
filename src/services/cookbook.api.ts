import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${baseURL}/api/cookbooks`;

interface CookbookRequest {
    name: string;
    imageFileName: string;
}

export interface CookbookResponse {
    id: number;
    name: string;
    imageFileName?: string;
}

interface CookbookSearchParams {
    name: string;
    page: number;
    size: number;
    sort: string;
}

interface CookbookSearchResponse {
    content: CookbookResponse[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const cookbookApi = createApi({
    reducerPath: 'cookbookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Cookbook'],
    endpoints: (builder) => ({
        addCookbook: builder.mutation<CookbookResponse, CookbookRequest>({
            query: (cookbook) => ({
                url: '',
                method: 'POST',
                body: cookbook,
            }),
            invalidatesTags: ['Cookbook'],
        }),
        searchCookbooks: builder.query<CookbookSearchResponse, CookbookSearchParams>({
            query: (params) => ({
                url: 'search',
                method: 'GET',
                params,
            }),
            providesTags: ['Cookbook'],
        }),
    }),
    }
);

export const {
    useAddCookbookMutation,
    useSearchCookbooksQuery,
} = cookbookApi;
