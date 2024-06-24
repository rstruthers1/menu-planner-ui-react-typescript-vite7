import {CookbookResponse, useUpdateCookbookMutation} from "../services/cookbook.api.ts";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import RenderError from "../components/RenderError.tsx";

interface EditCookbookFormProps {
    cookbook: CookbookResponse;
    onClose: () => void;
}

const EditCookbookForm: React.FC<EditCookbookFormProps> = ({ cookbook, onClose }) => {
    const [name, setName] = useState(cookbook.name);
    const [imageFileName, setImageFileName] = useState(cookbook.imageFileName || '');
    const [validated, setValidated] = useState(false);

    const [updateCookbook, { isLoading, isSuccess, isError, error }] = useUpdateCookbookMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            await updateCookbook({id: cookbook.id, cookbook: {name, imageFileName}});
            onClose();
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
        <Form noValidate validated={validated} onSubmit={submitHandler}>
            <h1>Edit Cookbook</h1>
            {isError && <RenderError error={error} />}
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
            <Button variant="primary" type="submit" className='mt-3' disabled={isLoading}>
                Update Cookbook
            </Button>
            <Button variant="secondary" className='mt-3 ml-3' onClick={onClose}>
                Cancel
            </Button>
            {isSuccess && <p>Cookbook updated successfully!</p>}
            {isLoading && <p>Updating cookbook...</p>}
        </Form>
    );


}

export default EditCookbookForm;