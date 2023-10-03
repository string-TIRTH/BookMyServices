import React from 'react'
// import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import Home from './Home'
import Today from './TodaySchedules'
import axios from 'axios';
import {
    FaTh,
    FaBars,
    FaUserAlt,
 
    FaShoppingBag,
    FaThList,
  
    FaServer,
    FaIdCard
}from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css';
// import { Upcoming } from '@mui/icons-material';
import  Upcoming from './UpComing';
import  History from './History';

const Dashboard = () => {
  const [activeHome, setActiveHome] = useState(true)
  const [activeToday, setActiveToday] = useState(false)
  const [activeUpcoming, setActiveUpcoming] = useState(false)
  const [activeHistory, setActiveHistory] = useState(false)
  const [activeFeedback, setActiveFeedback] = useState(false)

  const handleHome = ()=>{
    setActiveHome(true)
    setActiveToday(false)
    setActiveUpcoming(false)
    setActiveHistory(false)
    setActiveFeedback(false)
  }
  const handleToday = ()=>{
    setActiveToday(true)
    setActiveHome(false)
    setActiveUpcoming(false)
    setActiveHistory(false)
    setActiveFeedback(false)
  }
  const handleUpComing = ()=>{
    setActiveUpcoming(true)
    setActiveToday(false)
    setActiveHome(false)
    setActiveHistory(false)
    setActiveFeedback(false)
    
  }
  const handleHistory = ()=>{
    setActiveHistory(true)
    setActiveUpcoming(false)
    setActiveToday(false)
    setActiveHome(false)
    setActiveFeedback(false)
  }
  const handleFeedback = ()=>{
    setActiveFeedback(true)
    setActiveHistory(false)
    setActiveUpcoming(false)
    setActiveToday(false)
    setActiveHome(false)
  }
  const handleLogout = ()=>{

  }
  const Sidebar = ({children}) => {
  const menuItem=[
    {
        // path:"/Employee",
        name:"Home",
        icon:<FaTh/>,
        func: handleHome
    },
    {
        name:"Present Schedules",
        icon:<FaUserAlt/>,
        func : handleToday

    },
    
    {
        name:"Up Coming Schedules",
        icon:<FaShoppingBag/>,
        func : handleUpComing
    },
    
    {
        name:"History",
        icon:<FaServer/>,
        func : handleHistory
    },
    {
        name:"Feedbacks",
        icon:<FaServer/>,
        func : handleFeedback
    },
    {
        name:"Logout",
        icon:<FaThList/>,
        func : handleLogout
    }
]
return (
  <>
     <div style={{width: "300px"}} className="sidebar">
         <div className="top_section">
             <h1 style={{display:"block"}} className="logo">DashBoard</h1>
             <div style={{marginLeft: "50px"}} className="bars">
                 {/* <FaBars onClick={toggle}/> */}
             </div>
         </div>
         {
             menuItem.map((item, index)=>(
                 <div onClick={item.func} key={index}  className="link" >
                     <div className="icon">{item.icon}</div>
                     <div style={{display: "block"}} className="link_text">{item.name}</div>
                     </div>
             ))
         }
     </div>
     <main>{children}</main>
  </>
);
  }

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#000", height: "99vh" }}>

        <div className='row'>
          <div className='col-md-2'>
          <Sidebar></Sidebar>
          </div>
          <div className='col-md-10'>
            <div className="container-fluid" style={{ backgroundColor: "#D4E6F1", height: "99vh" }}>
              
              {activeHome && <div className='scrollable-div'><Home></Home> </div>}
              {activeToday && <div className='scrollable-div'><Today></Today> </div>}
              {activeUpcoming && <div className='scrollable-div'><Upcoming></Upcoming> </div>}
              {activeHistory && <div className='scrollable-div'><History></History> </div>}
              {activeFeedback && <div className='scrollable-div'>Feedback </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard