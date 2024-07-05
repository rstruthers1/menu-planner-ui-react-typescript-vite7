import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddUserGroupMutation } from "../services/usergroup.api.ts";
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer.tsx";

const AddGroupScreen = () => {
    const [name, setName] = useState('');
    const [addUserGroup, { isLoading, isSuccess, isError, error }] = useAddUserGroupMutation();

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addUserGroup({ name });
    };

    return (
        <FormContainer>

            <h2>Create Group</h2>
            {isError && <Alert variant="danger">{error.toString()}</Alert>}
            {isSuccess && <Alert variant="success">Group created successfully!</Alert>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter group name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
                    Create Group
                </Button>

            </Form>
            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>

        </FormContainer>
    );
};

export default AddGroupScreen;
