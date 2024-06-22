import React, {useState, useEffect} from "react";
import {ErrorResponse, Link, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LoginResponse, useLoginUserMutation, useLogoutUserMutation} from "../services/auth.api.ts";
import {clearUserInfo, setUserInfo} from "../slices/authSlice.ts";
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";
import {RootState} from "../app/store.ts";
import Loader from "../components/Loader.tsx";
import {AppDispatch} from "../app/store.ts";
import { Helmet } from 'react-helmet';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostRecentChangesSubmitted, setMostRecentChangesSubmitted] = useState(false);
    const [loginUser, {isLoading, isSuccess, isError, error}] = useLoginUserMutation();
    const [logoutUser] = useLogoutUserMutation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }
    , [userInfo, navigate]);

    function isErrorResponse(error: unknown): boolean {
        return (error as ErrorResponse).status !== undefined;
    }

    const setTokenExpiryTimeout = (expiryTime: number) => {
        const expiryDuration = expiryTime - Date.now();
        setTimeout(async () => {
            alert('Session expired. Please log in again.');
            await logoutUser().unwrap();
            dispatch(clearUserInfo());
        }, expiryDuration);
    };

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        setMostRecentChangesSubmitted(true);
        try {
            const res: LoginResponse  = await loginUser({email, password}).unwrap();
            dispatch(setUserInfo({id: res.id, email: email, firstName: res.firstName, lastName: res.lastName, tokenExpiry: res.tokenExpiry}));
            if (res.tokenExpiry) {
                setTokenExpiryTimeout(res.tokenExpiry);
            }
            navigate('/');
        } catch (error) {
            if (isErrorResponse(error)) {
                const errorResponse = error as ErrorResponse;
                console.error('Error logging in: ', errorResponse.data.message);
                //toast.error(`Error logging in: ${errorResponse.data.message}`);
            } else {
                console.error(`Unknown error: ${JSON.stringify(error)}`);
                //toast.error(`Unknown error: ${JSON.stringify(error)}`);
            }
        }
    };

    const handleChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setMostRecentChangesSubmitted(false);
        setter(value);
    }

    return (
        <>
            <Helmet>
                <title>Menu Planner</title>
            </Helmet>

            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            disabled={isLoading}
                            onChange={(e) => handleChange(e.target.value, setEmail)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => handleChange(e.target.value, setPassword)}
                        ></Form.Control>
                    </Form.Group>


                    <Button disabled={isLoading} type='submit' variant='primary' className='mt-3'>
                        Sign In
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
                {mostRecentChangesSubmitted && isError &&
                    <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}
                {isSuccess && <p>Login Successful!</p>}
                {isLoading && <Loader/>}
            </FormContainer>
        </>
    );
}

export default LoginScreen;

