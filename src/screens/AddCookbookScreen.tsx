import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddCookbookMutation} from "../services/cookbook.api.ts";
import FormContainer from "../components/FormContainer.tsx";
import RenderError from "../components/RenderError.tsx";
import { Link } from "react-router-dom";

const AddCookbookScreen = () => {
    const [name, setName] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [validated, setValidated] = useState(false);

    const [addCookbook, { isLoading, isSuccess, isError, error }] = useAddCookbookMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            await addCookbook({name, imageFileName});
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
            <h1>Add Cookbook</h1>
            {isError && <RenderError error={error} />}
            <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>
                {imageFileName && <img src={`${import.meta.env.VITE_API_BASE_URL}/api/images/${imageFileName}`} alt="Cookbook" />}
                <Button type="submit" variant="primary" className='mt-3' disabled={isLoading}>Add Cookbook</Button>
            </Form>

            {isError && <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}
            {isSuccess && <p>Cookbook added successfully!</p>}
            {isLoading && <p>Loading...</p>}

            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>
        </FormContainer>
    )
}

export default AddCookbookScreen;