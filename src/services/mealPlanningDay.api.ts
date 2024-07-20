
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${baseURL}/api/meal-planning-days`;

export interface MealPlanningDayRequest {
    groupId: number | undefined;
    date: string;
    weatherHighTemp?: number;
    weatherLowTemp?: number;
    weatherDescription?: string;
    temperatureUnit?: string;
}

export interface MealPlanningDayResponse {
    id: number;
    groupId: number | undefined;
    date: string;
    weatherHighTemp?: number;
    weatherLowTemp?: number;
    weatherDescription?: string;
    temperatureUnit?: string;
}

export interface MealPlanningWeekRequest {
    groupId: number | undefined;
    startDate: string;
}

export interface MealPlanningWeekResponse {
    mealPlanningDays: MealPlanningDayResponse[];
}

export const mealPlanningDayApi = createApi({
    reducerPath: 'mealPlanningDayApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ['MealPlanningDay'],
    endpoints: (builder) => ({
        createMealPlanningDay: builder.mutation<MealPlanningDayResponse, MealPlanningDayRequest>({
            query: (newMealPlanningDay) => ({
                url: '',
                method: 'POST',
                body: newMealPlanningDay,
            }),
            invalidatesTags: ['MealPlanningDay'],
        }),
        fetchOrCreateMealPlanningWeek: builder.mutation<MealPlanningWeekResponse, MealPlanningWeekRequest>({
            query: (mealPlanningWeekRequest) => ({
                url: '/week',
                method: 'POST',
                body: mealPlanningWeekRequest,
            }),
            invalidatesTags: ['MealPlanningDay'],
        }),
    }),
});

export const { useCreateMealPlanningDayMutation, useFetchOrCreateMealPlanningWeekMutation } = mealPlanningDayApi;
