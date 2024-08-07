import React, {useEffect, useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddRecipeMutation } from '../services/recipe.api.ts';
import {useSearchCookbooksQuery} from "../services/cookbook.api.ts";
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

interface CookbookOption {
    value: number;
    label: string;
}

const AddRecipeScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [url, setUrl] = useState('');
    const [cookbookId, setCookbookId] = useState<number | undefined>(undefined);
    const [page, setPage] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [validated, setValidated] = useState(false);
    const [cookbookOptions, setCookbookOptions] = useState([] as CookbookOption[]);

    const [addRecipe, { isLoading, isSuccess, isError, error }] = useAddRecipeMutation();
    const { data: cookbooks, isSuccess: cookbookSuccess} = useSearchCookbooksQuery({ name: '', page: 0, size: 10, sort: 'name,asc' });
    const currentGroupId: number | undefined = useSelector((state:RootState) => state.group.currentGroupId);

    useEffect(() => {
        if (cookbookSuccess) {
            setCookbookOptions(cookbooks.content.map((cookbook) => ({ value: cookbook.id, label: cookbook.name })));
        }
    }, [cookbooks, cookbookSuccess]);

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        let pageNumber;
        try {
            pageNumber = page ? parseInt(page) : undefined;
        } catch (e) {
            pageNumber = undefined;
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            await addRecipe({name,
                description,
                instructions,
                url, cookbookId,
                page: pageNumber,
                imageFileName: imageFileName,
                groupId: currentGroupId,
                isPublic
            });
        }
        setValidated(true);
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {

            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images/upload`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setImageFileName(data.imageFileName);
                    console.log(`Image uploaded: ${data.imageFileName}`)
                } else {
                    console.error('Error uploading image:');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }

    return (
        <FormContainer>
            <h1>Add Recipe</h1>
            <Form onSubmit={submitHandler} noValidate validated={validated}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Recipe Name *</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter recipe name'
                        value={name}
                        disabled={isLoading}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='isPublic'>
                    <Form.Check
                        type="checkbox"
                        label="Public"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        disabled={isLoading}
                    />
                </Form.Group>


                <Form.Group className='my-2' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
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

                <Form.Group className='my-2' controlId='cookbook'>
                    <Form.Label>Cookbook</Form.Label>
                    <Form.Select
                        value={cookbookId}
                        disabled={isLoading}
                        onChange={(e) => setCookbookId(parseInt(e.target.value))}
                        >
                        <option value=''>Select a cookbook</option>
                        {cookbookOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Select>
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

                <Form.Group className='my-2' controlId='instructions'>
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Enter instructions'
                        value={instructions}
                        disabled={isLoading}
                        onChange={(e) => setInstructions(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='image'>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type='file'
                        onChange={handleImageUpload}
                        disabled={isLoading}
                    ></Form.Control>
                    {imageFileName && (
                        <div className='mt-3'>
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/api/images/${imageFileName}`} alt="Uploaded" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
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
