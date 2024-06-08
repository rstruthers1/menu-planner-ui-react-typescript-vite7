import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURL = import.meta.env.VITE_API_BASE_URL;



export const helloApi = createApi({
    reducerPath: 'helloApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            // Prepare headers if necessary
            return headers;
        },
        responseHandler: async (response) => {
            if (response.ok) {
                // If the content type is text, return as text
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('text')) {
                    return response.text();
                }
                // Default to JSON if unsure
                return response.json();
            } else {
                // Handle non-ok responses, assuming they return JSON errors
                return await response.json();

            }
        },
    }),
    endpoints: (builder) => (
        {
            fetchGreeting: builder.query<string, void>({
                query: () => 'hello'

            }),
            fetchGreetingAuth:  builder.query<string, void>({
                query: () => 'helloAuth'
            })
        }),
});

export const { useFetchGreetingQuery, useFetchGreetingAuthQuery  } = helloApi;
