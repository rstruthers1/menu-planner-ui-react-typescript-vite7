
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardScreen = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Menu Planner Dashboard</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Add Meals</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Add new meals to your planner.
                            </Card.Text>
                            <Link to="/add-meal">
                                <Button variant="primary">Add Meals</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Search Meals</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Search for existing meals.
                            </Card.Text>
                            <Link to="/search-meals">
                                <Button variant="primary">Search Meals</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Add Recipe</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Add a new Recipe.
                            </Card.Text>
                            <Link to="/add-recipe">
                                <Button variant="primary">Add Recipe</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Search Recipes</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Search for Recipes.
                            </Card.Text>
                            <Link to="/search-recipes">
                                <Button variant="primary">Search Recipes</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Add Cookbook</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Add a new Cookbook.
                            </Card.Text>
                            <Link to="/add-cookbook">
                                <Button variant="primary">Add Cookbook</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Search Cookbooks</Card.Title>
                            <Card.Text className="flex-grow-1">
                                Search for Cookbooks.
                            </Card.Text>
                            <Link to="/search-cookbooks">
                                <Button variant="primary">Search Cookbooks</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardScreen;
