
import { Container } from 'react-bootstrap';
import {Route, Routes, Navigate} from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import PlanNextWeek from './PlanNextWeek';
import AddRecipeScreen from './AddRecipeScreen';
import RecipeSearchScreen from './RecipeSearchScreen';
import AddMealPlanningDayScreen from "./AddMealPlanningDayScreen.tsx";


const MenuPlanningScreen = () => {

    return (
        <div style={{ display: 'flex'}}>
            <SideMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <Routes>
                    <Route path="plan-next-week" element={<PlanNextWeek />} />
                    <Route path="add-recipe" element={<AddRecipeScreen />} />
                    <Route path="search-recipes" element={<RecipeSearchScreen />} />
                    <Route path="add-meal-planning-day" element={<AddMealPlanningDayScreen/>}/>
                    <Route path="/" element={<Navigate to="plan-next-week" />} />
                </Routes>
            </Container>
        </div>
    );
};

export default MenuPlanningScreen;
