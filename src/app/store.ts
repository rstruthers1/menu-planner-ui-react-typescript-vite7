import {configureStore} from "@reduxjs/toolkit";
import {authApi} from '../services/auth.api';
import { helloApi } from '../services/hello.api';
import {userApi} from '../services/user.api';
import {mealApi} from "../services/meal.api.ts";
import {recipeApi} from "../services/recipe.api.ts";
import {cookbookApi} from "../services/cookbook.api.ts";
import authReducer from '../slices/authSlice';
import groupReducer from '../slices/groupSlice.ts'
import {userGroupApi} from "../services/usergroup.api.ts";
import {mealPlanningDayApi} from "../services/mealPlanningDay.api.ts";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        group: groupReducer,
        [authApi.reducerPath] : authApi.reducer,
        [helloApi.reducerPath]: helloApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [mealApi.reducerPath]: mealApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [cookbookApi.reducerPath]: cookbookApi.reducer,
        [userGroupApi.reducerPath]: userGroupApi.reducer,
        [mealPlanningDayApi.reducerPath]: mealPlanningDayApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(helloApi.middleware)
            .concat(userApi.middleware)
            .concat(mealApi.middleware)
            .concat(recipeApi.middleware)
            .concat(cookbookApi.middleware)
            .concat(userGroupApi.middleware)
            .concat(mealPlanningDayApi.middleware),
    devTools: true
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




