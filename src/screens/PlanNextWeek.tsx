import { Card, Row, Col } from 'react-bootstrap';
import TopOffsetContainer from "../components/TopOffsetContainer.tsx";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const PlanNextWeek = () => {
    return (
        <TopOffsetContainer>
            <h2>Plan Next Week</h2>
            <Row>
                {daysOfWeek.map(day => (
                    <Col key={day} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{day}</Card.Title>
                                <Card.Text>
                                    No menu set.
                                </Card.Text>
                                {/* Add more functionality for setting the menu */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </TopOffsetContainer>
    );
};

export default PlanNextWeek;
