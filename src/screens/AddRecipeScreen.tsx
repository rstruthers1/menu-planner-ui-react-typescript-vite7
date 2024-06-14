import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddRecipeMutation } from '../services/recipe.api.ts';
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";
import { Link } from "react-router-dom";

const AddRecipeScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [url, setUrl] = useState('');
    const [cookbook, setCookbook] = useState('');
    const [page, setPage] = useState('');

    const [addRecipe, { isLoading, isSuccess, isError, error }] = useAddRecipeMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        let pageNumber;
        try {
            pageNumber = page ? parseInt(page) : undefined;
        } catch (e) {
            pageNumber = undefined;
        }
        await addRecipe({ name, description, instructions, url, cookbook, page: pageNumber });
    }

    return (
        <FormContainer>
            <h1>Add Recipe</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter recipe name'
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

                <Form.Group className='my-2' controlId='instructions'>
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter instructions'
                        value={instructions}
                        disabled={isLoading}
                        onChange={(e) => setInstructions(e.target.value)}
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

                <Form.Group className='my-2' controlId='cookbook'>
                    <Form.Label>Cookbook</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter cookbook name'
                        value={cookbook}
                        disabled={isLoading}
                        onChange={(e) => setCookbook(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='page'>
                    <Form.Label>Page</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter page number'
                        value={page}
                        disabled={isLoading}
                        onChange={(e) => setPage(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                    Add Recipe
                </Button>
            </Form>

            {isError && <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}
            {isSuccess && <p>Recipe added successfully!</p>}
            {isLoading && <p>Loading...</p>}

            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>

        </FormContainer>
    );
}

export default AddRecipeScreen;
