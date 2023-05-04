// import React, { useState, useEffect } from 'react';
// import './App.css';
// import MyDropdown from './dropDown';
// import { Navbar, Container, Button } from 'react-bootstrap';
// import Logo from './images/LogoLex.png';
// import Nav from 'react-bootstrap/Nav';
// import { FaPowerOff } from 'react-icons/fa';
// import Listview from './table';
// import { useSelector } from 'react-redux';

// function App() {
//     const [data, setData] = useState({});
//     const content = useSelector((state) => state.menuData);
//     const [items, setItems] = useState([]);

// //    console.log((content.data[0].data));
// console.log('====================================');
// // if((content.data[0].data).length) {
// //     setItems(content.data[0].data)
// // }
// console.log('====================================');
//     useEffect(() => {
//         async function fetchData() {
//             const response = await fetch('data.json');
//             const json = await response.json();
//             setData(json);
//         }
//         fetchData();
//     }, []);

//     return (
//         <>
//             <div>
//                 <div className=''>
//                     <Navbar
//                         className='bg-primary'
//                         variant='dark'
//                         collapseOnSelect
//                         expand='lg'
//                     >
//                         <Container fluid className='text-center'>
//                             <Navbar.Brand href='#home'>
//                                 <img
//                                     src={Logo}
//                                     width='205'
//                                     height='80'
//                                     alt='LEXX'
//                                     id='logo'
//                                 />
//                             </Navbar.Brand>
//                             <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//                             <Navbar.Collapse id='responsive-navbar-nav'>
//                                 <Nav className='mx-auto me-5'>
//                                     <Nav.Link
//                                         className='text-white'
//                                         href='#home'
//                                     >
//                                         Feature
//                                     </Nav.Link>
//                                     <Nav.Link
//                                         className='text-white'
//                                         href='#features'
//                                     >
//                                         Flag
//                                     </Nav.Link>
//                                     <Nav.Link
//                                         className='text-white'
//                                         href='#pricing'
//                                     >
//                                         Control
//                                     </Nav.Link>
//                                 </Nav>

//                                 <Nav className='ms-auto'>
//                                     <Button style={{ color: 'white' }}>
//                                         <FaPowerOff />
//                                     </Button>
//                                 </Nav>
//                             </Navbar.Collapse>
//                         </Container>
//                     </Navbar>
//                 </div>

//                 <div className='m-5'>
//                     {Object.keys(data).length > 0 ? (
//                         <MyDropdown {...data}/>
//                     ) : null}
//                 </div>

//                 <div>
//                     <Listview />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default App;
