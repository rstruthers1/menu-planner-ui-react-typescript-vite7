import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import App from './App.tsx'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './app/store';
import {Provider} from 'react-redux';
import HomeScreen from "./screens/HomeScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import Greeting from "./screens/Greeting.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import DashboardScreen from "./screens/DashboardScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AddMealScreen from "./screens/AddMealScreen.tsx";
import MenuSearchScreen from "./screens/MenuSearchScreen.tsx";
import AddRecipeScreen from "./screens/AddRecipeScreen.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/greeting" element={<Greeting/>}/>
            {/* Private routes */}
            <Route path="" element={<PrivateRoute/>}>
                <Route path="/profile" element={<ProfileScreen/>}/>
                <Route path="/dashboard" element={<DashboardScreen/>}/>
                <Route path="/add-meal" element={<AddMealScreen/>}/>
                <Route path="/search-meals" element={<MenuSearchScreen/>}/>
                <Route path="/add-recipe" element={<AddRecipeScreen/>}/>
            </Route>

        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
