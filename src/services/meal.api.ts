import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${baseURL}/api/meals`;

interface MealRequest {
    name: string;
    description: string;
    url: string;
}

interface MealResponse {
    id: number;
    name: string;
    description: string;
    url: string;
}

interface MealSearchParams {
    name: string;
    page: number;
    size: number;
}

interface MealSearchResponse {
    content: MealResponse[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const mealApi = createApi({
    reducerPath: 'mealApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    tagTypes: ['Meal'],
    endpoints: (builder) => ({
        addMeal: builder.mutation<MealResponse, MealRequest>({
            query: (meal) => ({
                url: '',
                method: 'POST',
                body: meal,
            }),
            invalidatesTags: ['Meal'],
        }),
        // Add other endpoints if necessary, like fetching meals
        getMeals: builder.query<MealResponse[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            providesTags: ['Meal'],
        }),
        searchMeals: builder.query<MealSearchResponse, MealSearchParams>({
            query: (mealSearchParams) => ({
                url: 'search',
                method: 'GET',
                params: mealSearchParams
            }),
            providesTags: ['Meal'],
        }),
    }),
});

export const { useAddMealMutation,
                useGetMealsQuery,
                useSearchMealsQuery} = mealApi;
