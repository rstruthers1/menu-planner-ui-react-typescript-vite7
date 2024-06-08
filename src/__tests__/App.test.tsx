import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import HomeScreen from '../screens/HomeScreen';

test('Renders the main page', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomeScreen />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    // Use findByRole to wait for the h1 element to appear
    const header = await screen.findByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
});
