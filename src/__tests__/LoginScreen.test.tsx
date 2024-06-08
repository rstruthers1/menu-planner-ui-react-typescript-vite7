import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {useLoginUserMutation} from '../services/auth.api';
import LoginScreen from '../screens/LoginScreen';
import Greeting from "../screens/Greeting.tsx";
import {useFetchGreetingAuthQuery} from "../services/hello.api.ts";


// Mock the useLoginUserMutation hook
jest.mock('../services/auth.api', () => ({
    useLoginUserMutation: jest.fn(),
}));

// Mock useDispatch from react-redux
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux')
}));

// Mock the useFetchGreetingAuthQuery hook
jest.mock('../services/hello.api', () => ({
    useFetchGreetingAuthQuery: jest.fn(),
}));

// Create a mock store
const mockStore = configureStore([]);

test('Renders the greeting page', async () => {


    (useFetchGreetingAuthQuery as jest.Mock).mockReturnValue({
        data: "Hello World, you have been authenticated!",
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
    });

    const store = mockStore({});

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/greeting']}>
                <Routes>
                    <Route path="/greeting" element={<Greeting/>}/>
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    await waitFor(() => {
        expect(screen.getByText('Greeting: Hello World, you have been authenticated!')).toBeInTheDocument();
    });
});

test('Renders the login page and handles form submission', async () => {
    const mockLoginUser = jest.fn().mockResolvedValue({
        data: { id: 1, email: "test@example.com", firstName: "Fred", lastName: "Smith" },
    });

    // Mock implementation for useLoginUserMutation
    (useLoginUserMutation as jest.Mock).mockReturnValue([
        mockLoginUser,
        { data: null, isLoading: false, isSuccess: false, isError: false, error: null },
    ]);

    (useFetchGreetingAuthQuery as jest.Mock).mockReturnValue({
        data: "Hello World, you have been authenticated!",
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
    });

    const store = mockStore({});

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="/greeting" element={<Greeting/>}/>
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    // Check if the heading is rendered
    const header = screen.getByRole('heading', {level: 1});
    expect(header).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Email Address/i), {target: {value: 'test@example.com'}});
    fireEvent.change(screen.getByLabelText(/Password/i), {target: {value: 'password123'}});

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', {name: /Sign In/i}));

    // Wait for the mock API call to be made
    await waitFor(() => expect(mockLoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
    }));


});
