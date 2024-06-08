import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "../app/store.ts";
import {useLogoutUserMutation} from "../services/auth.api.ts";
import {clearUserInfo} from "../slices/authSlice.ts";


const Header = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(clearUserInfo());
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', JSON.stringify(error, null, 2));
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to='/'>Menu Planner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (<>
                                <NavDropdown title={`${userInfo.firstName} ${userInfo.lastName}`} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                </>) :
                                (<>
                                    <Nav.Link as={Link} to='/login'><FaSignInAlt/> Sign In </Nav.Link>
                                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                                </>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;