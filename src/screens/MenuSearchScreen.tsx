import React, { useState, useEffect, useMemo } from 'react';
import { useSearchMealsQuery } from '../services/meal.api.ts';
import {Form, Table, Pagination, Alert, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const debounce = <F extends (...args: string[]) => void>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const MenuSearchScreen = () => {
    const [searchParams, setSearchParams] = useState({
        name: '',
        page: 0,
        size: 10,
    });

    const [searchTerm, setSearchTerm] = useState(searchParams.name);
    const [isTyping, setIsTyping] = useState(false);

    // Destructure data and status from the query hook
    const { data, error, isLoading, isFetching, refetch } = useSearchMealsQuery(searchParams);

    // Debounced search handler
    const debouncedSearch = useMemo(
        () => debounce((term: string) => {
            setSearchParams(prevParams => ({
                ...prevParams,
                name: term,
                page: 0, // Reset to first page on new search
            }));
            setIsTyping(false);
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsTyping(true);
        debouncedSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setSearchParams(prevParams => ({ ...prevParams, page }));
    };

    useEffect(() => {
        if (searchParams.name || searchParams.page > 0) {
            refetch();
        }
    }, [searchParams, refetch]);

    return (
        <div>
            <h1>Search Meals</h1>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="searchTerm">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="searchTerm"
                        placeholder="Enter meal name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>

            {error && (
                <Alert variant="danger">Error fetching meals</Alert>
            )}

            {data && data.content.length > 0 ? (
                <>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>URL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.content.map((meal) => (
                            <tr key={meal.id}>
                                <td>{meal.id}</td>
                                <td>{meal.name}</td>
                                <td>{meal.description}</td>
                                <td><a href={meal.url} target="_blank" rel="noopener noreferrer">{meal.url}</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Pagination className="mt-3">
                        {[...Array(data.totalPages)].map((_, page) => (
                            <Pagination.Item
                                key={page}
                                active={page === searchParams.page}
                                onClick={() => handlePageChange(page)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            ) : (
                !isLoading && !isFetching && <p>No meals found</p>
            )}

            {(isLoading || isTyping) && <p>Loading...</p>}
            {isFetching && <p>Searching...</p>}
            <Link to="/dashboard">
                <Button variant="primary" className="mt-3">Back to Dashboard</Button>
            </Link>
        </div>
    );
};

export default MenuSearchScreen;
