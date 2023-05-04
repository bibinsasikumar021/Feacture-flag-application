import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Container, Button, Table, Modal } from 'react-bootstrap';
import { FaPowerOff } from 'react-icons/fa';
import Logo from './images/lexx-logo.png';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import axios from "axios";
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/feature-flags`;

const App = () => {
    const [data, setData] = useState([]);
    const [features, setFeatures] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clientFeature, setClientFeature] = useState({});
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

    const handleEdit = (client) => {
        setFeatures(client.features);
        setClientFeature(client);
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
        handleFilterClick();
    }, [data, filters,features]);

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

    const handleClearFilter = () => {
        setFilters({
            instance: '',
            client: '',
            project: '',
            product: ''
        });
    }

    const changeState = (ind) => {
        console.log("CHange state calleds");
        let data = features
        data.forEach((feature, index) => {
            if(index === ind){
                if (feature.state === 'disabled') {
                    feature.state = 'enabled';
                } else {
                    feature.state = 'disabled';
                }
            }
        })
        // if (features[index].state === 'disabled') {
        //     features[index].state = 'enabled';
        // } else {
        //     features[index].state = 'disabled';
        // }
        console.log(data);
        setFeatures(data);
    } 
    // fetching json data
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);

    const updateFeatureFlag = () => {
        let req = clientFeature;
        req.features = features;
        axios.patch(baseURL, req).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    return (
        <>
            <div className=''>
                <Navbar
                    className='bg-primary'
                    background-color= '#034E91'
                    variant='dark'
                    collapseOnSelect
                    expand='lg'
                >
                 
                   
                    <Container fluid className='text-center'>
                        <Navbar.Brand href='#home'>
                            <img
                                src={Logo}
                                width='150'
                                height='40'
                                alt='LEXX'
                                id='logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>


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
         
                <Table className='my-table'>
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
                                        <option key={option} value={option} >
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
                            {/* <th>
                                <button onClick={handleFilterClick}>
                                    Filter
                                </button>
                            </th> */}
                            <th>
                                <button onClick={handleClearFilter}>
                                    Clear filter
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
                                                handleEdit(value);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
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
                    <Button style={{float: 'right'}} onClick={updateFeatureFlag}>Update features</Button>
                    <Table striped bordered hover>
                        <thead className='text-center'>
                            <tr>
                                <th>Feature</th>
                                <th>Status</th>
                                <th>Enable/Disable</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {features.map((value, index) => {
                                return (
                                    <tr key={index} className='h-50'>
                                        <td>{value.featureId}</td>
                                        <td>{value.state}</td>
                                        <td>
                                            <BootstrapSwitchButton
                                                checked={value.state === 'enabled'?true:false}
                                                size='sm'
                                                onChange={(state) => changeState(index)}
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
