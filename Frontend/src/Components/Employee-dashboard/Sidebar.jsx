import React, { useState } from 'react';
import './Dashboard'
import {
    FaTh,
    FaBars,
    FaUserAlt,
 
    FaShoppingBag,
    FaThList,
  
    FaServer,
    FaIdCard
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {

    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Employee",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:"/Employee/today",
            name:"Present Schedules",
            icon:<FaUserAlt/>
        },
        
        {
            path:"/Employee/upcoming",
            name:"Up Coming Schedules",
            icon:<FaShoppingBag/>
        },
        
        {
            path:"/Employee/history",
            name:"History",
            icon:<FaServer/>
        },
        {
            path:"/Employee/feedback",
            name:"Feedbacks",
            icon:<FaServer/>
        },
        {
            path:"/Employee/logout",
            name:"Logout",
            icon:<FaThList/>
        }
    ]
    return (
        <>
           <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">DashBoard</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       {/* <FaBars onClick={toggle}/> */}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </>
    );
};



// const Sidebar =() =>{
//     const menuItem=[
//         {
//             path:"/Dashboard",
//             name:"",
//             icons:<FaTh/>
//         },
//         {
//             path:"/about",
//             name:"about",
//             icons:<FaUserAlt></FaUserAlt>
//         },
//         {
//             path:"/analytics",
//             name:"analytics",
//             icons:<FaRegChartBar></FaRegChartBar>
//         },
//         {
//             path:"/comments",
//             name:"Comments",
//             icons:<FaCommentAlt></FaCommentAlt>
//         }, {
//             path:"/product",
//             name:"Product",
//             icons:<FaShoppingBag></FaShoppingBag>
//         },
//         {
//             path:"/productlist",
//             name:"ProductList",
//             icons:<FaList></FaList>
//         },
//     ]
//     return (
//         <>
//             <div className="container">
//                 <div className="sidebar">
//                     <div className="top_section">
//                         <h1 className="logo">logo</h1>
//                         <div className="bars">
//                             <FaBars></FaBars>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
export default Sidebar;