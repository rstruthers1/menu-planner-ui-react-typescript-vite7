// PlanNextWeek.tsx
import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import TopOffsetContainer from "../components/TopOffsetContainer.tsx"; // Assuming you have this component

import { Menu } from '../types/menu'; // Import the Menu type

// Mock data for initial setup
const hardCodedMenus: Menu[] = [
    { id: "1", day: "Sunday", name: "Polynesian Pineapple Chicken", date: "2024-06-16", category: "Stir fry", mainOrSide: "main", cookbook: "Make It in Minutes: Easy Recipes in 15, 20, and 30 Minutes", page: 58, meat: "Chicken", weather: "Sunny", temp: "80F", icon: "☀️" },
    { id: "2", day: "Monday", name: "Sloppy Joes", date: "2024-06-17", category: "Sandwich", mainOrSide: "main", url: "https://www.allrecipes.com/recipe/24262/sloppy-joes-i/", meat: "Beef", weather: "Cloudy", temp: "75F", icon: "☁️" },
    { id: "3", day: "Tuesday", name: "Classic Chinese Pepper Steak", date: "2024-06-18", category: "Stir fry", mainOrSide: "main", cookbook: "Favorite Brand Name", page: 154, meat: "Beef", weather: "Rainy", temp: "70F", icon: "🌧️" },
    { id: "4", day: "Wednesday", name: "Chicken Nachos", date: "2024-06-19", category: "Nachos", mainOrSide: "main", cookbook: "Notecard", meat: "Chicken", weather: "Sunny", temp: "85F", icon: "☀️" },
    { id: "5", day: "Thursday", name: "Smoked Turkey Paninis", date: "2024-06-20", category: "Sandwich", mainOrSide: "main", meat: "Turkey", weather: "Windy", temp: "78F", icon: "🌬️" },
    { id: "6", day: "Friday", name: "Spaghetti", date: "2024-06-21", category: "Pasta", mainOrSide: "main", meat: "Beef", weather: "Sunny", temp: "82F", icon: "☀️" },
    { id: "7", day: "Saturday", name: "Sherried Beef", date: "2024-06-22", category: "Stir fry", mainOrSide: "main", cookbook: "Favorite Brand Name", page: 158, meat: "Beef", weather: "Rainy", temp: "68F", icon: "🌧️" }
];

const columnStyle: React.CSSProperties = {
    height: '500px', // Set this to the desired height
    overflowY: 'auto',
    paddingRight: '10px'
};

const PlanNextWeek = () => {

    const handleSave =  () => {
       console.log("handle save")

    };

    return (
        <TopOffsetContainer>
            <h2>Plan Next Week</h2>
            <Container fluid>
                <Row>
                    {hardCodedMenus.map(({ id, day, name, date, category, mainOrSide, url, cookbook, page, meat, weather, temp, icon }) => (
                        <Col xs={12} md={6} lg={4} key={id} style={columnStyle}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>Date: {date} ({day})</Card.Text>
                                    <Card.Text>Weather: {weather} {icon}, {temp}</Card.Text>
                                    <Card.Text>Category: {category}</Card.Text>
                                    <Card.Text>Main or Side: {mainOrSide}</Card.Text>
                                    {cookbook && <Card.Text>Cookbook: {cookbook}, Page: {page}</Card.Text>}
                                    {url && <Card.Text><a href={url} target="_blank" rel="noopener noreferrer">View Recipe</a></Card.Text>}
                                    <Card.Text>Meat: {meat}</Card.Text>
                                    <Button onClick={() => handleSave()}>Save</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </TopOffsetContainer>
    );
};

export default PlanNextWeek;
