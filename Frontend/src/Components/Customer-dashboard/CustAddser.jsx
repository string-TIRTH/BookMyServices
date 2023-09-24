
import { Link } from 'react-router-dom';
// import Carousels from './Carousels';
import { FaShoppingCart } from 'react-icons/fa';
import { MDBContainer, MDBRow, MDBCol, MDBBtnGroup } from 'mdb-react-ui-kit';

import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from 'axios';
// import { Carousel } from 'react-carousel-minimal';
import { useEffect, useState } from "react";
const CustAddser = () => {

    const id={
        _id:"65045d16de311c998f1e4b64"
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
                const year =nextDay.getFullYear();
                const date = nextDay.getDate();
                next5DaysWithDayAndDate.push({ dayName, date,month,year });
            }

            return next5DaysWithDayAndDate;
        }
        const next5Days = getNext5DaysWithDayAndDate();
        setNext5DaysWithDayAndDate(next5Days);
    }, []);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [service_id, setSevice_id] = useState('');
  
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const [timeSlots, setTimeSlots] = useState([
        '8:00:00',
        '9:00:00',
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '13:00:00',
        '14:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',
        '19:00:00',
        '20:00:00',
        '21:00:00',
        '22:00:00'




      
    ]);


    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
       

    };
    
    


    const openDialogBox1 = (item) => {
    
        setSevice_id(item._id);
        handleDisplay(true);
    };
    
    const handleClose = () => {
      
        setSevice_id('');
        handleDisplay(false);
    };
    const HandleConfirm=()=>{

        if(!SelectedDay ){
            alert('Select the day')
        }
        if(! selectedTime){
            alert('Select the time')
        }
       if(SelectedDay && selectedTime ){
        const formattedDate = `${SelectedDay.year}-${SelectedDay.month}-${SelectedDay.date}`;

            const data= {
                custId:id._id,
                serId:service_id,
                time:selectedTime,
                date:formattedDate
            }
        try{
   
            axios.post(`http://localhost:5000/customer/AddService`,data)
              .then((response) => {
               
                console.log(response.data)
                   alert('Successfully Added to the Cart')
                   window.location.href='/Customer/Cart'
            
              
              })
            }
              catch(error) {
             
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
    const handleday=(day)=>{
     
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
                                    <p>Product Price : {item.price}</p>
                                </div>
                                <div className="horizontal-product-card-buttons" style={{ marginTop: "0px", marginLeft: "0px", display: "flex", gap: "10px", marginRight: "40px" }}>
                                    <Link to={`/Home/DetailsServices/${item._id}`}><button button className="read-more-button" style={{ width: "100px" }}>Read More</button></Link>
                                    {/* <button onClick={()=>openDialogBox(item)} className="add-to-cart-button" style={{ width: "150px" }}>Add to Cart</button> */}
                                    <button onClick={()=>openDialogBox1(item)} className="add-to-cart-button" style={{ width: "150px" }}>Add to Cart</button>
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

            <Dialog onClose={handleClose} open={openDialog} style={{borderRadius:"100px"}}>
                <DialogTitle >Add Your Time Slot for Particular Service </DialogTitle>
                <div>
                  
                        <MDBContainer >
                            <MDBRow>
                    
                            {next5DaysWithDayAndDate.map((day, index) => (                       
                              <MDBCol
                              key={index}
                              size='md'
                              style={{  marginRight: "5px", marginLeft: "5px" }}
                            >
                              <button
                                className={`btn btn-sm ${day.dayName === "Sunday"| day.dayName==="Thursday" ? "btn-danger" : day.dayName==="Tuesday"? "btn-primary": "btn-success"}`} 
                             
                                onClick={() => handleday(day)} 
                                style={{ width: "60px", height: "55px",borderRadius:"20px" }}
                              >
                                {day.dayName==="Sunday" ? "SUN" : day.dayName==="Monday"?"MON" : day.dayName==="Tuesday" ?"TUE":day.dayName==="Wednesday"?"WED" : day.dayName==="Thursday" ? "THU" :day.dayName==="Friday"?"FRI":"SAT" }<br />
                                {day.date}
                             
                              </button>
                            </MDBCol>
                                
                                ))}
                            </MDBRow>
                        </MDBContainer>
                       
                        <div className="mb-3 d-flex justify-content-center align-items-center">
                            <label htmlFor="timeSlotSelect" className="form-label" style={{marginLeft:"10px"}}>
                                Time Slot:
                            </label>
                            <select
                                id="timeSlotSelect"
                                className="form-select"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                style={{marginRight:"10px"}}
                            >
                                <option value="">Select a time slot</option>
                                {filteredTimeSlots.map((slot) => (
                                    <option key={slot} value={slot}> {slot}</option>
                                ))}

                            </select>


                        </div>
                   
                </div>
                <br></br>
                <br></br>
                <br></br>
               
                <div style={divStyle}>
                  
                    <button style={confirmButtonStyle} onClick={HandleConfirm}>
                        Confirm
                    </button>
                   
                    <button style={confirmButtonStyle} onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </Dialog>


        </>
    );
}
export default CustAddser;