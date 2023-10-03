import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import Home from './Home'
import Today from './TodaySchedules'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css';

const Dashboard = () => {
  const [activeHome, setActiveHome] = useState(true)
  const [activeToday, setActiveToday] = useState(false)
  const [activeUpcoming, setActiveUpcoming] = useState(false)
  const [activeHistory, setActiveHistory] = useState(false)
  const [activeFeedback, setActiveFeedback] = useState(false)


  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#000", height: "99vh" }}>

        <div className='row'>
          <div className='col-md-2'>
            <Sidebar></Sidebar>
          </div>
          <div className='col-md-10'>
            <div className="container-fluid" style={{ backgroundColor: "#D4E6F1", height: "99vh" }}>
              
              {activeHome && <div className='scrollable-div'><Today></Today> </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard