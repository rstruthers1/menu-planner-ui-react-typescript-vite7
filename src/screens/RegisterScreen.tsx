import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, Alert} from "react-bootstrap";
import { useRegisterUserMutation } from '../services/auth.api.ts';
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";


const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        await registerUser({firstName, lastName, email, password});

    }


    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        disabled={isLoading}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter last name'
                        value={lastName}
                        disabled={isLoading}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        disabled={isLoading}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </Col>
            </Row>
            {isError && <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}
            {isSuccess && <p>Registration Successful!</p>}
            {isLoading && <p>Loading...</p>}

        </FormContainer>
    );
}

export default RegisterScreen;

