import React from 'react'
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import img from '../img/loginBlock.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Home = (props) => {
  const [today, setToday] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [upcoming, setUpcoming] = useState(0);
  const [completed, setCompleted] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [order, setorder] = useState([]);
  // const [empdata, empdatachange] = useState([])
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const data = {
      "empId": localStorage.getItem('id')
    };
    axios.post(`http://localhost:5000/employee/getTodaySchedules`, data)
      .then((response) => {
        if (response.data.length != 0) {
          setToday(response?.data?.length);
          console.log(response.data.length)
        } else {
          setToday(0)
        }
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/getUpcomingSchedules`, data)
      .then((response) => {

        setUpcoming(response?.data?.length);
        console.log(response.data.length);
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/completed`, data)
      .then((response) => {

        setCompleted(response?.data?.length);
        console.log(response.data.length)
        // setcount(response.data.length)
        // console.log(count);
      })
      .catch((error) => {

        console.error('Error fetching customer data:', error);
      });
    axios.post(`http://localhost:5000/employee/avgRating`, data)
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
  const handleLogin = () => {
    window.location.href = "/Login"
  };
  const dialogStyles = {
    maxWidth: '1000px', // Set the maximum width as per your requirements
  };


  useEffect(() => {


    if (localStorage.getItem('role') != null) {
      setIsLoggedIn(true);
      const data = {
        _id: localStorage.getItem('id')
      };
      axios.post(`http://localhost:5000/employee/getEmployeeById`, data)
        .then((response) => {


        });

    }
  }, []);
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    try {


      axios.post("http://localhost:5000/order/getActiveService")
        .then((response) => {
          // console.log(response.data)
          setorder(response.data)
        })
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }

  }, [])









  return (
    <>
      {!isLoggedIn && (
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>

          <img
            src={img}
            alt="Full Page Image"

            style={{ justifyContent: 'center', alignItems: 'center' }}
          />
          <Dialog open={isOpen} onClose={handleClose}>
            <div style={{ padding: '16px' }}>
              <Typography variant="h5" component="div" gutterBottom>
                Employee Must have to do login
              </Typography>
              <Typography variant="body1" component="div">
                Please log in to view your orders and details.
              </Typography>
            </div>
            <DialogActions>
              <Button onClick={handleLogin} variant="contained" color="primary">
                Login
              </Button>
              <Button onClick={handleClose} variant="outlined" color="error">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {isLoggedIn &&
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
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{today}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-danger" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Upcoming services</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{upcoming}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-success" style={{ width: "15rem" }}>

                      <div class="card-body">
                        <h5 class="card-title">Completed</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{completed}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div class="card bg-primary" style={{ width: "15rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Average Rating</h5>
                        <p class="card-text" style={{ fontSize: "50px", textAlign: "center", border: "2px solid black", borderRadius: "120px" }}>{avgRating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
          {/* --------- */}
          <div className="container-fluid" style={{ backgroundColor: '#D4E6F1' }}>
            <div className='col-md-12 justify-content-center' style={{ padding: 20 }}>

              <div className="container-fluid" style={{ backgroundColor: '#FFFFF0' }}>
                {/* <div className='col-md-11' style={{margin :'20'}}>  */}

                <div className='col-md-12' style={{ padding: 20 }}>
                  {order.length === 0 ? (
                    <h1 style={{ textAlign: 'center' }}>No Active Order</h1>
                  ) : (
                    order.map((item, index) => (
                      <div className='row mt-2'>
                        <div className='col-md-10'>
                          <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                            <div className='row' style={{ marginTop: 30 }}>
                              <div className="col-md-6">
                                <div className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
                                  <FontAwesomeIcon icon={faSpinner} spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
                                  <img
                                    className="rounded"
                                    src={item?.serviceDetails[0]?.url}
                                    style={{ width: "60%", zIndex: 0 }}
                                  />
                                </div>
                              </div>



                              <div className='col-md-6' style={{ textAlign: 'left' }}>


                                <p className="card-title"><strong>OrderId:</strong> {item.orderId}</p>
                                <p className="card-title"><strong>Service Start at:</strong> {item.service_startTime}</p>
                                <p className="card-title"><strong>Service end at:</strong> {item.service_endTime}</p>
                                <p className="card-title"><strong>Status of service:</strong> In Working</p>
                              </div>
                            </div>
                            <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                              <button className="btn btn-primary" style={{ width: 100, marginRight: "10px", marginBottom: "10px" }}> order Details</button>
                              <button className="btn btn-danger" style={{ width: 100, marginRight: "10px", marginBottom: "10px" }}> add to AddOn</button>
                              <button className="btn btn-success" style={{ width: "110px", marginRight: "10px", marginBottom: "10px" }}> Completed</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )))}

                </div>
              </div>
            </div>
          </div>




          hello

        </div>
      }
    </>
  );
}
export default Home;
