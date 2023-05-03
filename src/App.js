import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Container, Button, Table, Modal } from 'react-bootstrap';
import { FaPowerOff } from 'react-icons/fa';
import Logo from './images/LogoLex.png';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const App = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({
        instance: '',
        client: '',
        project: '',
        product: ''
    });
    const [filterOptions, setFilterOptions] = useState({
        instance: [],
        client: [],
        project: [],
        product: []
    });
    const [filteredData, setFilteredData] = useState(data);

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleFilterChange = (columnName, filterText) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [columnName]: filterText
        }));
    };

    useEffect(() => {
        const newFilterOptions = {};
        Object.keys(filterOptions).forEach((key) => {
            newFilterOptions[key] = [
                ...new Set(data.map((value) => value[key]))
            ];
        });
        setFilterOptions(newFilterOptions);
    }, [data]);

    const handleFilterClick = () => {
        const filteredData = data.filter((value) => {
            return (
                value.instance.includes(filters.instance) &&
                value.client.includes(filters.client) &&
                value.project.includes(filters.project) &&
                value.product.includes(filters.product)
            );
        });
        setFilteredData(filteredData);
    };

    // fetching json data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('newdata.json');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className=''>
                <Navbar
                    className='bg-primary'
                    variant='dark'
                    collapseOnSelect
                    expand='lg'
                >
                    <Container fluid className='text-center'>
                        <Navbar.Brand href='#home'>
                            <img
                                src={Logo}
                                width='205'
                                height='80'
                                alt='LEXX'
                                id='logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='mx-auto me-5'>
                                <Nav.Link className='text-white' href='#home'>
                                    Feature
                                </Nav.Link>
                                <Nav.Link
                                    className='text-white'
                                    href='#features'
                                >
                                    Flag
                                </Nav.Link>
                                <Nav.Link
                                    className='text-white'
                                    href='#pricing'
                                >
                                    Control
                                </Nav.Link>
                            </Nav>

                            <Nav className='ms-auto'>
                                <Button style={{ color: 'white' }}>
                                    <FaPowerOff />
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <table className='my-table'>
                    <thead className='text-center'>
                        <tr>
                            <th>
                                <select
                                    value={filters.instance}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'instance',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value=''>Select instance</option>
                                    {filterOptions.instance.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <th>
                                <select
                                    value={filters.client}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'client',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value=''>Select client...</option>
                                    {filterOptions.client.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <th>
                                <select
                                    value={filters.project}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'project',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value=''>Select project...</option>
                                    {filterOptions.project.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <th>
                                <select
                                    value={filters.product}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'product',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value=''>Select product...</option>
                                    {filterOptions.product.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <th>
                                <button onClick={handleFilterClick}>
                                    Filter
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th>Instance</th>
                            <th>Client</th>
                            <th>Project</th>
                            <th>Product</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {filteredData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.instance}</td>
                                    <td>{value.client}</td>
                                    <td>{value.project}</td>
                                    <td>{value.product}</td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                handleEdit(index);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Modal
                show={showModal}
                fullscreen={true}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Feature List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead className='text-center'>
                            <tr>
                                <th>Feature</th>
                                <th>Status</th>
                                <th>Enable/Disable</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {data.map((value, index) => {
                                console.log(value.features[0].featureId);
                                return (
                                    <tr key={index} className='h-50'>
                                        <td>{value.features[0].featureId}</td>
                                        <td>{value.features[0].state}</td>
                                        <td>
                                            <BootstrapSwitchButton
                                                checked={true}
                                                size='sm'
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default App;
