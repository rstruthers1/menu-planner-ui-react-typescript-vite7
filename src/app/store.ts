import {configureStore} from "@reduxjs/toolkit";
import {authApi} from '../services/auth.api';
import { helloApi } from '../services/hello.api';
import {userApi} from '../services/user.api';
import {mealApi} from "../services/meal.api.ts";
import {recipeApi} from "../services/recipe.api.ts";
import {cookbookApi} from "../services/cookbook.api.ts";
import authReducer from '../slices/authSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath] : authApi.reducer,
        [helloApi.reducerPath]: helloApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [mealApi.reducerPath]: mealApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [cookbookApi.reducerPath]: cookbookApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(helloApi.middleware)
            .concat(userApi.middleware)
            .concat(mealApi.middleware)
            .concat(recipeApi.middleware)
            .concat(cookbookApi.middleware),
    devTools: true
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




