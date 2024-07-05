import {Row, Col} from 'react-bootstrap';
import React from "react";
import TopOffsetContainer from "./TopOffsetContainer.tsx";

export interface FormContainerProps {
    children: React.ReactNode;

}

const FormContainer = (props: FormContainerProps) => {
    return (
        <TopOffsetContainer>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6} className='card p-5'>
                    {props.children}
                </Col>
            </Row>
        </TopOffsetContainer>
    );
};

export default FormContainer;