import {Container, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

// Temporary type assertion to bypass TypeScript error
// This forces TypeScript to accept Link as a valid component for the 'as' prop in Button
// There is an open pull request to fix this issue: https://github.com/react-bootstrap/react-bootstrap/pull/6802
const LinkButton = Link as unknown as (React.ElementType<any, keyof React.JSX.IntrinsicElements> & keyof React.JSX.IntrinsicElements) // eslint-disable-line @typescript-eslint/no-explicit-any


const Hero = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>MyRTS Authentication</h1>
                    <p className='text-center mb-4'>
                        This is a boilerplate for a MyRTS authentication application that stores a JWT in an HTTP-Only
                        cookie.
                        It uses MySQL, React, TypeScript, Spring Boot, Redux Toolkit, and the React Bootstrap library.
                    </p>
                    <div className='d-flex'>
                        {userInfo ? (
                                <>
                                    <h2>Welcome {userInfo.firstName}!</h2>

                                </>
                            ) :
                            (<><Button as={LinkButton} to='/login' variant='primary' className='me-3'>
                                Sign In
                            </Button>
                                <Button as={LinkButton} to='/register' variant='secondary'>
                                    Register
                                </Button></>)}

                    </div>
                    {userInfo && <Link to='/dashboard' className='mt-4'>Go to Dashboard</Link>}
                </Card>
            </Container>
        </div>
    );
};

export default Hero;