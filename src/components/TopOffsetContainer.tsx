import React from 'react';
import {Container} from "react-bootstrap";

const TopOffsetContainer: React.FC<React.PropsWithChildren<NonNullable<unknown>>> = ({ children }) => {
    return (
        <Container style={{ paddingTop: '56px' }}> {/* Adjust based on the height of your top navbar */}
            {children}
        </Container>
    );
};

export default TopOffsetContainer;