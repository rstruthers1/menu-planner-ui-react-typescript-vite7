// components/MealPlanningWeek.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { setStartDate } from '../slices/startDateSlice';
import {
    MealPlanningDayResponse,
    MealPlanningWeekRequest,
    useFetchOrCreateMealPlanningWeekMutation
} from '../services/mealPlanningDay.api';
import {Row, Col, Button, Card} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {parse} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import TopOffsetContainer from '../components/TopOffsetContainer';
import {getWeekStart} from "../utils/date.utils.ts";

const MealPlanningWeek = () => {
    const { startDate: urlStartDate } = useParams<{ startDate: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const reduxStartDate = useSelector((state: RootState) => state.startDate.startDate);

    const initialDate = urlStartDate ? parse(urlStartDate, 'yyyy-MM-dd', new Date()) : parse(reduxStartDate, 'yyyy-MM-dd', new Date());
    const [startDate, setStartDateState] = useState<Date>(initialDate);

    const [fetchOrCreateMealPlanningWeek, { error, isLoading }] = useFetchOrCreateMealPlanningWeekMutation();
    const [mealPlanningDays, setMealPlanningDays] = useState<MealPlanningDayResponse[]>([]);
    const currentGroupId: number | undefined = useSelector((state:RootState) => state.group.currentGroupId);

    const fetchMealPlanningDays = async (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const request: MealPlanningWeekRequest = {
            groupId: currentGroupId,
            startDate: formattedDate,
        };

        try {
            const response = await fetchOrCreateMealPlanningWeek(request).unwrap();
            if (response.mealPlanningDays) {
                setMealPlanningDays(response.mealPlanningDays);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (currentGroupId) {
            fetchMealPlanningDays(startDate);
            dispatch(setStartDate(startDate.toISOString().split('T')[0]));
        }
    }, [startDate, dispatch, currentGroupId]);

    const handlePrevWeek = () => {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() - 7);
        setStartDateState(newDate);
        navigate(`/menu-planning/weekly-plan/${newDate.toISOString().split('T')[0]}`);
    };

    const handleNextWeek = () => {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + 7);
        setStartDateState(newDate);
        navigate(`/menu-planning/weekly-plan/${newDate.toISOString().split('T')[0]}`);
    };

    const handleDateChange = (date: Date | null) => {
        if (!date) {
            return;
        }
        const weekStartDate = getWeekStart(date);
        setStartDateState(weekStartDate);
        navigate(`/menu-planning/weekly-plan/${weekStartDate.toISOString().split('T')[0]}`);
    };

    return (
        <TopOffsetContainer>
            <h2>Meal Planning Week</h2>
            <Row className="mb-4">
                <Col>
                    <Button onClick={handlePrevWeek}>Previous Week</Button>
                </Col>
                <Col className="text-center">
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"

                        />
                </Col>
                <Col className="text-end">
                    <Button onClick={handleNextWeek}>Next Week</Button>
                </Col>
            </Row>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching meal planning days.</p>}
            <Row>
                {mealPlanningDays.map((day) => (
                    <Col key={day.id} xs={12} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{day.date}</Card.Title>
                                <Card.Text>
                                    Weather: {day.weatherDescription}, High: {day.weatherHighTemp}°{day.temperatureUnit}, Low: {day.weatherLowTemp}°{day.temperatureUnit}
                                </Card.Text>
                                <Card.Text>No meals set for this day.</Card.Text>
                                {/* Additional meal planning details and actions can be added here */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </TopOffsetContainer>
    );
};

export default MealPlanningWeek;
