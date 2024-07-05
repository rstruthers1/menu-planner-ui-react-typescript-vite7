import { Container, Row, Col, Button, Card, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardScreen = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Menu Planner Dashboard</h2>
                </Col>
            </Row>
            <Tabs defaultActiveKey="meals" id="dashboard-tabs" className="mt-4">
                <Tab eventKey="meals" title="Meals">
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
                </Tab>
                <Tab eventKey="recipes" title="Recipes">
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
                </Tab>
                <Tab eventKey="cookbooks" title="Cookbooks">
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
                </Tab>
                <Tab eventKey="groups" title="Groups">
                    <Row className="mt-4">
                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Create Group</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        Create a new group for family meal planning.
                                    </Card.Text>
                                    <Link to="/add-user-group">
                                        <Button variant="primary">Create Group</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Manage Groups</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        Manage your groups and invite members.
                                    </Card.Text>
                                    <Link to="/all-user-groups">
                                        <Button variant="primary">Manage Groups</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default DashboardScreen;
