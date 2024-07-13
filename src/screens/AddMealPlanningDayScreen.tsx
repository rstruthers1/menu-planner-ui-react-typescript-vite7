import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useCreateMealPlanningDayMutation } from '../services/mealPlanningDay.api.ts';
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import FormContainer from "../components/FormContainer.tsx";

const AddMealPlanningDayScreen = () => {
    const [date, setDate] = useState('');
    const [weatherHighTemp, setWeatherHighTemp] = useState('');
    const [weatherLowTemp, setWeatherLowTemp] = useState('');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [temperatureUnit, setTemperatureUnit] = useState('C');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const currentGroupId: number | undefined = useSelector((state:RootState) => state.group.currentGroupId);

    const [createMealPlanningDay] = useCreateMealPlanningDayMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newMealPlanningDay = {
                groupId: currentGroupId,
                date,
                weatherHighTemp: weatherHighTemp ? parseFloat(weatherHighTemp) : undefined,
                weatherLowTemp: weatherLowTemp ? parseFloat(weatherLowTemp) : undefined,
                weatherDescription,
                temperatureUnit
            };

            await createMealPlanningDay(newMealPlanningDay).unwrap();

            setSuccess('Meal planning day created successfully!');
            setError('');
        } catch (error) {
            console.log(error);
            setError('Failed to create meal planning day.');
            setSuccess('');
        }
    };

    return (
        <FormContainer>
            <h2>Create Meal Planning Day</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="weatherHighTemp">
                    <Form.Label>High Temperature</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter high temperature"
                        value={weatherHighTemp}
                        onChange={(e) => setWeatherHighTemp(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="weatherLowTemp">
                    <Form.Label>Low Temperature</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter low temperature"
                        value={weatherLowTemp}
                        onChange={(e) => setWeatherLowTemp(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="weatherDescription">
                    <Form.Label>Weather Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter weather description"
                        value={weatherDescription}
                        onChange={(e) => setWeatherDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="temperatureUnit">
                    <Form.Label>Temperature Unit</Form.Label>
                    <Form.Control
                        as="select"
                        value={temperatureUnit}
                        onChange={(e) => setTemperatureUnit(e.target.value)}
                    >
                        <option value="C">Celsius</option>
                        <option value="F">Fahrenheit</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Create Meal Planning Day
                </Button>
            </Form>
        </FormContainer>
    );
};

export default AddMealPlanningDayScreen;
