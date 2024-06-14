import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${baseURL}/api/recipes`;

interface RecipeRequest {
    name: string;
    description: string;
    instructions: string;
    url: string;
    cookbook?: string;
    page?: number;
}

interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    instructions: string;
    url: string;
    cookbook?: string;
    page?: number;
}

interface RecipeSearchParams {
    name: string;
    page: number;
    size: number;
}

interface RecipeSearchResponse {
    content: RecipeResponse[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Recipe'],
    endpoints: (builder) => ({
        addRecipe: builder.mutation<RecipeResponse, RecipeRequest>({
            query: (recipe) => ({
                url: '',
                method: 'POST',
                body: recipe,
            }),
            invalidatesTags: ['Recipe'],
        }),
        // Add other endpoints if necessary, like fetching recipes
        getRecipes: builder.query<RecipeResponse[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            providesTags: ['Recipe'],
        }),
        searchRecipes: builder.query<RecipeSearchResponse, RecipeSearchParams>({
            query: (recipeSearchParams) => ({
                url: 'search',
                method: 'GET',
                params: recipeSearchParams
            }),
            providesTags: ['Recipe'],
        }),
    }),
});

export const { useAddRecipeMutation, useGetRecipesQuery, useSearchRecipesQuery } = recipeApi;
