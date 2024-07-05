import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './SideMenu.css';
import GroupSelector from "./GroupSelector.tsx";

const SideMenu = () => {
    return (
        <div className="side-menu">
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav className="flex-column ms-3">
                    <GroupSelector />
                    </Nav>
                </Nav.Item>
                <LinkContainer to="/menu-planning/plan-next-week">
                    <Nav.Link>Plan Next Week</Nav.Link>
                </LinkContainer>
                <Nav.Item>
                    <Nav.Link>Recipe</Nav.Link>
                    <Nav className="flex-column ms-3">
                        <LinkContainer to="/menu-planning/add-recipe">
                            <Nav.Link>Add Recipe</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/menu-planning/search-recipes">
                            <Nav.Link>Search Recipes</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SideMenu;
