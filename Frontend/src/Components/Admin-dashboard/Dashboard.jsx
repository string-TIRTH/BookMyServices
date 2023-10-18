import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

import 'bootstrap/dist/css/bootstrap.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const options = {
    animationEnabled: true,	
    title:{
      text: "Active vs. Inactive Customers"
    },
    axisY : {
      title: "Number of Customers"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "2016",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "Jan" },
        { y: 150, label: "Feb" },
        { y: 152, label: "Mar" },
        { y: 148, label: "Apr" },
        { y: 142, label: "May" },
        { y: 150, label: "Jun" },
        { y: 146, label: "Jul" },
        { y: 149, label: "Aug" },
        { y: 153, label: "Sept" },
        { y: 158, label: "Oct" },
        { y: 154, label: "Nov" },
        { y: 150, label: "Dec" }
      ]
    },
    {
      type: "spline",
      name: "2017",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "Jan" },
        { y: 173, label: "Feb" },
        { y: 175, label: "Mar" },
        { y: 172, label: "Apr" },
        { y: 162, label: "May" },
        { y: 165, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 168, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 170, label: "Oct" },
        { y: 165, label: "Nov" },
        { y: 169, label: "Dec" }
      ]
    }]
}

  const [count, setcount] = useState(0);
  const [incount, insetcount] = useState(0);
  const[emp,setemp] =useState(0)
  const[inemp,setinemp] =useState(0)
  // const [empdata, empdatachange] = useState([])
  useEffect(() => {

    axios.post(`http://localhost:5000/customer/getActiveCustomer`)
      .then((response) => {

        setcount(response.data.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/customer/getInActiveCustomer`)
      .then((response) => {

        insetcount(response.data.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/Employee/getActiveEmployee`)
      .then((response) => {

        setemp(response.data.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/Employee/getInActiveEmployee`)
      .then((response) => {

        setinemp(response.data.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);
 

  return (
    <>
    <div className="container-fluid" style={{ backgroundColor: "#000", height: "99vh" }}>

          <div className='row'>
            <div className='col-md-2'>
            <Sidebar></Sidebar>
            </div>
            <div className='col-md-10'>
              <div className="container-fluid" style={{ backgroundColor: "#D4E6F1", height: "99vh" }}>
                
                <div className="container">
                <div className="row">
                  <div className="col-sm" >
                    <div class="card bg-warning" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Total Number of Active Customer</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{count}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-danger" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Total Number of InActive Customer</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{incount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-success" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Total number of Active Employee</h5>
                        <p class="card-text"style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{emp}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-primary" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Total number of InActive Employee</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{inemp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            

              </div>
              
            </div>
          </div>
        </div>
      </>

  );
}
export default Dashboard