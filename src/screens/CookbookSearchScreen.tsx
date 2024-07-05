import React, { useState, useEffect, useMemo } from 'react';
import {CookbookResponse, useSearchCookbooksQuery} from "../services/cookbook.api.ts";
import {Alert, Form, Modal, Pagination, Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import EditCookbookForm from "../forms/EditCookbookForm.tsx";
import TopOffsetContainer from "../components/TopOffsetContainer.tsx";


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

const CookbookSearchScreen = () => {
    const [searchParams, setSearchParams] = useState({
        name: '',
        page: 0,
        size: 10,
        sort: 'name,asc',
    });

    const [searchTerm, setSearchTerm] = useState(searchParams.name);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedCookbook, setSelectedCookbook] = useState<CookbookResponse | null>(null);

    // Destructure data and status from the query hook
    const { data, error, isLoading, isFetching, refetch } = useSearchCookbooksQuery(searchParams);

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

    const handleCookbookClick = (cookbook: CookbookResponse) => {
        setSelectedCookbook(cookbook);
    }

    const handleCloseModal = () => {
        setSelectedCookbook(null);
        refetch();
    }

    useEffect(() => {
        if (searchParams.name || searchParams.page > 0) {
            refetch();
        }
    }, [searchParams, refetch]);

    return (
        <TopOffsetContainer>
            <h1>Search Recipes</h1>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="searchTerm">
                    <Form.Label>Cookbook Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="searchTerm"
                        placeholder="Enter cookbook name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>

            {error && (
                <Alert variant="danger">Error fetching cookbooks</Alert>
            )}

            {data && data?.content?.length > 0 ? (
                <>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image File Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.content.map((cookbook) => (
                            <tr key={cookbook.id}>
                                <td>{cookbook.id}</td>
                                <td>
                                    <span
                                        onClick={() => handleCookbookClick(cookbook)}
                                        style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}
                                        >
                                            {cookbook.name}
                                    </span>
                                </td>
                                <td>{cookbook.imageFileName}</td>
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
                !isLoading && !isFetching && <p>No recipes found</p>
            )}

            {(isLoading || isTyping) && <p>Loading...</p>}
            {isFetching && <p>Searching...</p>}
            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>
            {selectedCookbook && (
                <Modal show={true} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCookbook.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditCookbookForm cookbook={selectedCookbook} onClose={handleCloseModal}/>
                    </Modal.Body>
                </Modal>
            )}
        </TopOffsetContainer>
    );
};

export default CookbookSearchScreen;