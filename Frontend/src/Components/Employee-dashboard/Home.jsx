import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

const Home = ()=>{
  const [today, setToday] = useState(0);
  const [upcoming, setUpcoming] = useState(0);
  const[completed,setCompleted] =useState(0)
  const[avgRating,setAvgRating] =useState(0)
  // const [empdata, empdatachange] = useState([])
  useEffect(() => {
    const data = {
        "empId": localStorage.getItem('id')
    };
    axios.post(`http://localhost:5000/employee/getTodaySchedules`,data)
      .then((response) => {
        if(response.data.length != 0){
          setToday(response?.data?.length);
          console.log(response.data.length)  
        }else{
          setToday(0)
        }
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/employee/getUpcomingSchedules`,data)
      .then((response) => {

        setUpcoming(response?.data?.length);
        console.log(response.data.length);
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/employee/completed`,data)
      .then((response) => {

        setCompleted(response?.data?.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
      axios.post(`http://localhost:5000/employee/avgRating`,data)
      .then((response) => {

        setAvgRating(response?.data?.rating);
        console.log(response.data.rating)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
  }, []);

    return (
        <div className="right-content">
          <div className="centered-form" style={{ width: "100%", height: "100%" }}>
            <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "2px", marginRight: "0px" }}>
              <h1> Welcome,User</h1>
              <div className="container">
                <div className="row">
                  <div className="col-sm" >
                    <div class="card bg-warning" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Schedules (Today)</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{today}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-danger" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Upcoming services</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{upcoming}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-success" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Completed</h5>
                        <p class="card-text"style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{completed}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-primary" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Average Rating</h5>
                        <p class="card-text" style={{fontSize:"50px",textAlign: "center",border: "2px solid black",borderRadius:"120px"}}>{avgRating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        
        </div>
    );
}
export default Home;
