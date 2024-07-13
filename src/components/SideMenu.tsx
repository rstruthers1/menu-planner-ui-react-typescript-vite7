import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import './SideMenu.css';
import GroupSelector from "./GroupSelector.tsx";

const SideMenu = () => {
    const location = useLocation();

    return (
        <div className="side-menu">
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav className="flex-column ms-3">
                        <GroupSelector />
                    </Nav>
                </Nav.Item>
                <LinkContainer to="/menu-planning/plan-next-week">
                    <Nav.Link active={location.pathname === '/menu-planning/plan-next-week'}>
                        Plan Next Week
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/menu-planning/add-meal-planning-day">
                    <Nav.Link active={location.pathname === '/menu-planning/add-meal-planning-day'}>
                        Add Meal Planning Day
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/menu-planning/planning-days">
                    <Nav.Link active={location.pathname === '/menu-planning/planning-days'}>
                        Planning Days
                    </Nav.Link>
                </LinkContainer>
                <Nav.Item>
                    <div className="nav-header">Recipes</div>
                    <Nav className="flex-column ms-3">
                        <LinkContainer to="/menu-planning/add-recipe">
                            <Nav.Link active={location.pathname === '/menu-planning/add-recipe'}>
                                Add Recipe
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/menu-planning/search-recipes">
                            <Nav.Link active={location.pathname === '/menu-planning/search-recipes'}>
                                Search Recipes
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SideMenu;
