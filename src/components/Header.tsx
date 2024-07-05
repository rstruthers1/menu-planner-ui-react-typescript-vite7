import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { useLogoutUserMutation } from "../services/auth.api";
import { clearUserInfo } from "../slices/authSlice";
import { isTokenExpired } from "../utils/auth.util"; // Adjust the path as needed

const Header = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(clearUserInfo());
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', JSON.stringify(error, null, 2));
        }
    };

    // Check if the token is expired and clear user info if necessary
    if (userInfo && isTokenExpired(userInfo)) {
        dispatch(clearUserInfo());
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' fixed="top" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to='/'>Menu Planner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {userInfo && (
                                <>
                                    <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                                    <Nav.Link as={Link} to ='/menu-planning'>Menu Planning</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <NavDropdown title={`${userInfo.firstName} ${userInfo.lastName}`} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to='/login'><FaSignInAlt /> Sign In </Nav.Link>
                                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
