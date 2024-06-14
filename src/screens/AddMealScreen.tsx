import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddMealMutation } from '../services/meal.api.ts';
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";
import {Link} from "react-router-dom";

const AddMealScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const [addMeal, { isLoading, isSuccess, isError, error }] = useAddMealMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        await addMeal({ name, description, url });
    }

    return (
        <FormContainer>
            <h1>Add Meal</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter meal name'
                        value={name}
                        disabled={isLoading}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        disabled={isLoading}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='url'>
                    <Form.Label>Recipe URL</Form.Label>
                    <Form.Control
                        type='url'
                        placeholder='Enter URL'
                        value={url}
                        disabled={isLoading}
                        onChange={(e) => setUrl(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                    Add Meal
                </Button>
            </Form>

            {isError && <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}
            {isSuccess && <p>Meal added successfully!</p>}
            {isLoading && <p>Loading...</p>}
            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>
        </FormContainer>
    );
}

export default AddMealScreen;
