
import { Link } from 'react-router-dom';
// import Carousels from './Carousels';
import { FaShoppingCart } from 'react-icons/fa';
import { MDBContainer, MDBRow, MDBCol, MDBBtnGroup } from 'mdb-react-ui-kit';

import * as React from "react";
// import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import axios from 'axios';
// import { Carousel } from 'react-carousel-minimal';
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
const CustAddser = () => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [next6Days, setNext6Days] = useState([]);
    const [SerId, SetSerId] = useState('');
    const handleClickOpen = (item) => {
        SetSerId(item)
        setOpen(true);
    };

    const handleClose = () => {
        SetSerId('');
        setOpen(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTimeSlot('');
    };

    const handleTimeSlotChange = (e) => {
        setSelectedTimeSlot(e.target.value);
    };

    const handleConfirm = () => {
        if (!selectedDate) {
            Swal.fire({
                title: 'Date Not Selected!',
                text: 'Select Date',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if (!selectedTimeSlot) {
            Swal.fire({
                title: 'Time Not Selected!',
                text: 'Select Time',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if (selectedDate && selectedTimeSlot) {
            const formattedDate = `${SelectedDay.year}-${SelectedDay.month}-${SelectedDay.date}`;

            const data = {
                custId: id._id,
                serId: SerId,
                time: selectedTimeSlot,
                date: selectedDate.format('YYYY-MM-DD')
            }
            try {

                axios.post(`http://localhost:5000/customer/AddService`, data)
                    .then((response) => {

                        console.log(response.data)
                        Swal.fire({
                            title: 'Sucess',
                            text: 'Service Added To Cart',
                            icon: 'Success',
                            confirmButtonText: 'Okay'
                        })
                      window.location.href = '/Customer/Cart'


                    })
            }
            catch (error) {

                console.error('Error fetching customer data:', error);
            }




            console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
            console.log('Selected Time Slot:', selectedTimeSlot);
        }

       

  
        handleClose();
    };

    // Generate buttons for the next 6 days including today
    const generateNext6Days = () => {
        const days = [];
        for (let i = 0; i < 6; i++) {
            const day = moment().add(i, 'days');
            days.push(day);
        }
        setNext6Days(days);
    };

    // Initialize the date buttons
    useState(() => {
        generateNext6Days();
    }, []);

    const generateTimeSlots = () => {
        const timeSlots = [];
        const today = moment();
        if (selectedDate.isSame(today, 'day')) {
            const nextHour = moment().startOf('hour').add(1, 'hour');
            while (nextHour.isBefore(moment().endOf('day')) && nextHour.hour() <= 24) {
                timeSlots.push(nextHour.format('HH:mm:ss'));
                nextHour.add(1, 'hour');
            }
        } else {
            // Display time slots from 8:00 AM to 6:00 PM for other days
            let hour = 8;
            while (hour <= 18) {
                timeSlots.push(moment().hour(hour).format('HH:00:00'));
                hour++;
            }
        }
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();

    const id = {
        _id: "6513add1e0353232755a88f5"
    }
    const [user, setuser] = useState([])
    const [thought, setthougth] = useState({})
    const [openDialog, handleDisplay] = React.useState(false);  
    const [SelectedDay, Setday] = React.useState({});
    const [next5DaysWithDayAndDate, setNext5DaysWithDayAndDate] = useState([]);

    useEffect(() => {
        function getNext5DaysWithDayAndDate() {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();
            const next5DaysWithDayAndDate = [];

            for (let i = 1; i <= 6; i++) {
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + i);
                const dayName = daysOfWeek[nextDay.getDay()];
                const month = nextDay.getMonth() + 1;;
                const year = nextDay.getFullYear();
                const date = nextDay.getDate();
                next5DaysWithDayAndDate.push({ dayName, date, month, year });
            }

            return next5DaysWithDayAndDate;
        }
        const next5Days = getNext5DaysWithDayAndDate();
        setNext5DaysWithDayAndDate(next5Days);
    }, []);

    const [selectedTime, setSelectedTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [service_id, setSevice_id] = useState('');





    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);


    };




    const openDialogBox1 = (item) => {

        setSevice_id(item._id);
        handleDisplay(true);
    };


    const HandleConfirm = () => {

        if (!SelectedDay) {
            Swal.fire({
                title: 'Date Not Selected!',
                text: 'Select Date',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if (!selectedTime) {
            Swal.fire({
                title: 'Time Not Selected!',
                text: 'Select Time',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if (SelectedDay && selectedTime) {
            const formattedDate = `${SelectedDay.year}-${SelectedDay.month}-${SelectedDay.date}`;

            const data = {
                custId: id._id,
                serId: service_id,
                time: selectedTime,
                date: formattedDate
            }
            try {

                axios.post(`http://localhost:5000/customer/AddService`, data)
                    .then((response) => {

                        console.log(response.data)
                        Swal.fire({
                            title: 'Sucess',
                            text: 'Service Added To Cart',
                            icon: 'Success',
                            confirmButtonText: 'Okay'
                        })
                        window.location.href = '/Customer/Cart'


                    })
            }
            catch (error) {

                console.error('Error fetching customer data:', error);
            }



            console.log(formattedDate);
            // console.log(SelectedDay);
            console.log(selectedTime);
            console.log(service_id);
        }

    }
    useEffect(() => {

        const updateTime = () => {
            setCurrentTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000);


        return () => clearInterval(intervalId);
    }, []);
    const filteredTimeSlots = timeSlots.filter((slot) => {
        const [hour, minute] = slot.split(':');
        const slotTime = new Date();
        slotTime.setHours(parseInt(hour));
        slotTime.setMinutes(parseInt(minute));

        return slotTime > currentTime;
    });
    const buttonStyle = {
        width: "15rem",
        fontsize: "1.5rem",
        height: "2rem",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "green",
        color: "White",
        border: "2px solid yellow",
    };
    const divStyle = {
        display: "flex",
        felxDirection: "row",
        position: "absolute",
        right: "0px",
        bottom: "0px",

        //    padding: "0rem",
    };
    const confirmButtonStyle = {
        margin: "10px",
        width: "5rem",
        height: "2.5rem",
        fontsize: "1rem",
        backgroundColor: "grey",
        color: "black",
        margin: "5px",
        borderRadius: "10px",
        border: "1px solid black",
    };
    const item = {
        id: "6503f21d269c4df8700b622e"
    }
    useEffect(() => {

        axios.post(`http://localhost:5000/service/getService`)
            .then((response) => {
                // Set the fetched customer data in the state
                // setCustomers(response.data);
                console.log(response.data)
                setuser(response.data);

                // console.log(response.data.address[0])
                // empdatachange(response.data);
            })
            .catch((error) => {
                // Handle any errors here
                console.log(error)
                console.error('Error fetching customer data:', error);
            });
    }, []);


    useEffect(() => {

        axios("https://api.quotable.io/random")
            .then((response) => {
                // Set the fetched customer data in the state
                // setCustomers(response.data);
                console.log(response)
                setthougth(response.data)

                // console.log(response.data.address[0])
                // empdatachange(response.data);
            })
            .catch((error) => {
                // Handle any errors here
                console.log(error)
                console.error('Error fetching customer data:', error);
            });
    }, []);
    const handleday = (day) => {

        Setday(day);
        // localStorage.setItem("day",SelectedDay)
        // localStorage.setItem("day",SelectedDay)

    }
    return (
        <>

            <h1 >Welcome User....</h1>
            {"      "}<h4 style={{ color: "#82acff" }}>I have thought for you</h4>
            <h6 style={{ justifyContent: "center", textAlign: "center", color: "#fc3a52" }}>{thought.content}</h6>

            {user &&
                user
                    .filter((item) => item.isActive)
                    .map((item) => (
                        <div className=" d-flex justify-content-center align-items-center"   >
                            <div className="horizontal-product-card d-flex justify-content-center align-items-center" style={{ margin: `10px`, flexDirection: `row`, justifyContent: `center`, border: "2px solid  black", borderRadius: "10px", width: "1000px", backgroundColor: item.name === "Appliances Repairing" ? "#fcff82" : item.name === "Massage" ? "#5e63b6" : item.name === "salon for women" | item.name === "Painting" ? "#f5c7f7" : "#a393eb" }}>
                                <div className="horizontal-product-card-image" style={{ marginRight: "50px", }}>
                                    <img src={item.url} alt="Product" style={{ height: `100px`, borderRadius: "50px" }} />
                                </div>
                                <div className="horizontal-product-card-content " style={{ marginRight: "200px" }}  >
                                    <h3> {item.name === "Appliances Repairing" ? "Repairing" : item.name}</h3>
                                    <p>Product Price : ₹{item.price}</p>
                                </div>
                                <div className="horizontal-product-card-buttons" style={{ marginTop: "0px", marginLeft: "0px", display: "flex", gap: "10px", marginRight: "40px" }}>
                                    <Link to={`/Home/DetailsServices/${item._id}`}><button button className="read-more-button" style={{ width: "100px" }}>Read More</button></Link>
                                    {/* <button onClick={()=>openDialogBox(item)} className="add-to-cart-button" style={{ width: "150px" }}>Add to Cart</button> */}
                                    <Button variant="contained" color="primary" onClick={()=>handleClickOpen(item._id)}>
                                      Add to cart
                                    </Button>   
                                </div>

                            </div>

                        </div>
                    ))
            }
            <Link to={"/Customer/Cart/"}>
                <FaShoppingCart size={50} color="blue" style={{
                    position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer', border: '1px solid #e8630a',
                    borderRadius: '10px',
                    padding: '8px',
                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: "50px"
                }} />
            </Link>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select Date and Time Slot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <div>
                                <h5>Select Date:</h5>

                                <div className="row">

                                    {next6Days.map((day, index) => (
                                        <div className="col-md-2" key={index}>
                                            <button
                                           
                                                key={day}
                                                className={`btn btn-sm ${day.isSame(selectedDate, 'day') ? 'btn-primary' : 'btn-success'
                                                    }`}
                                                onClick={() => handleDateChange(day)}
                                                style={{ width: "65px", height: "50px",borderRadius:"14px" }}
                                            >
                                                {day.format('MMM DD')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>

                                <h5 style={{ marginTop: "10px" }}>Select Time Slot:</h5>
                                <select
                                    id="timeSlotSelect"
                                    className="form-select"
                                    value={selectedTimeSlot}
                                    onChange={handleTimeSlotChange}
                                >
                                    <option value="">Select a time slot</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleConfirm} variant="contained" color="warning">
                        Confirm
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
}
export default CustAddser;