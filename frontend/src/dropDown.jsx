// import React from 'react';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { addData } from './redux/menu-data/menuData';


// const MyDropdown = (data) => {
//     const dispatch = useDispatch();

//     const setData = (content) => {
//       dispatch(addData(content));
//     };

//     const renderMenu = (menu, depth) => {
//         if (depth > 3) return null; // exit the function if depth is greater than 2
//         return Object.keys(menu).map((key) => {
//             const subMenu = menu[key];
//             if (Object.keys(subMenu).length === 0 || depth === 3) {
//                 // if the submenu is empty, return a dropdown item with a click handler
//                 return (
//                     <Dropdown.Item
//                         key={key}
//                         onClick={() => handleClick(key, subMenu)}
//                     >
//                         {key}
//                     </Dropdown.Item>
//                 );
//             } else {
//                 // if the submenu is not empty and depth is less than or equal to 2, recursively render a dropdown
//                 return (
//                     <DropdownButton
//                         key={key}
//                         title={key}
//                         variant='light'
//                         drop={'end'}
//                         autoClose='outside'
//                     >
//                         {renderMenu(subMenu, depth + 1)}
//                     </DropdownButton>
//                 );
//             }
//         });
//     };

//     const handleClick = (key, subMenu) => {
//         setData(subMenu)
//     };

//     return (
//         <Dropdown drop={'end'} autoClose='outside'>
//             {renderMenu(data, 0)}
//         </Dropdown>
//     );
// };

// export default MyDropdown;