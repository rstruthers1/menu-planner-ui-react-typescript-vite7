import React, {useEffect, useState} from "react";

import {Form, Button} from "react-bootstrap";
import {useGetUserQuery, useUpdateUserMutation} from "../services/user.api.ts";

import FormContainer from "../components/FormContainer.tsx";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {setUserInfo} from "../slices/authSlice.ts";
import {toast} from "react-toastify";


const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const {data: userResponse, isLoading: getUserIsLoading} =
        useGetUserQuery(userInfo === null ? 0 : userInfo?.id);
    const [updateUser, {isLoading: updateUserIsLoading,
        isSuccess: updateUserIsSuccess,
    isError: updateUserIsError}] = useUpdateUserMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userResponse) {
            setFirstName(userResponse.firstName);
            setLastName(userResponse.lastName);
            setEmail(userResponse.email);
        }
    } , [userResponse]);

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateUser({id: userInfo?.id ? userInfo.id : 0, firstName, lastName, email}).unwrap();
            dispatch(setUserInfo({id: userInfo?.id ? userInfo.id : "", firstName, lastName, email}));
            toast.success('Profile Updated');
        } catch (error) {
            console.log(error);
            toast.error('Profile Update Failed');
        }
    }

    const infoIsLoading = () => {
        return getUserIsLoading || updateUserIsLoading;
    }

    return (
        <FormContainer>
            <h1>Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        disabled={infoIsLoading()}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter last name'
                        value={lastName}
                        disabled={infoIsLoading()}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={getUserIsLoading}>
                    Update Profile
                </Button>
            </Form>
            {infoIsLoading() && <span>Loading...</span>}
            {updateUserIsSuccess && <span>Profile Updated</span>}
            {updateUserIsError && <span>Profile Update Failed</span>}

        </FormContainer>
    );
}

export default ProfileScreen;

