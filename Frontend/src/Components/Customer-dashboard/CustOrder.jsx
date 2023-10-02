import NavBar from "../NavBar";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
// import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaShoppingCart } from 'react-icons/fa';
const CustOrder = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const [Complete, setComplete] = useState([]);
    const [pending, setPending] = useState([]);
    // const [cartItems, set] = useState([]);
    const [open, setOpen] = useState(false);
    const [opencomp, setOpencomp] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [pItem, setpItem] = useState({});
    // var date, time; 
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOrderDetails = (item) => {
        // console.log(item)
        setpItem(item)

        setOpen(true);
    }
    const handleC = () => {
        setpItem({})
        setOpen(false)
    }
    const handleCancelOrder = (item) => {
        Swal.fire({
            title: 'Are you sure... you really want to cancel order',
            text: "If it's possible don't cancel it our workers really work hard to serve your service",
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#57FF00',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#FF4F00',
            allowOutsideClick : false
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id : item._id
                };
                axios.post(`http://localhost:5000/order/cancelOrder`, data)
                .then((response) => {
                    if (response.data.message === true) {
                        Swal.fire({
                            title: 'Your Order Has Been Cancelled!',
                            text: 'Next Time Please Place Order According To Your Needs And Time',
                            icon: 'warning',
                            confirmButtonText: 'Got It'
                        }).then(()=>{
                            window.location.href = '/Customer/CustOrder'
                    })
                    } else {
                        Swal.fire({
                            title: 'Something Went Wrong!',
                            text: 'Please Try Again Later',
                            icon: 'question',
                            confirmButtonText: 'Got It!'
                          })
                    }

                });
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thanks For Not Cancelling Your Order',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    const handlecompOrderDetails = (item) => {
        // console.log(item)
        setpItem(item)

        setOpencomp(true);
    }
    const handleCcomp = () => {
        setpItem({})
        setOpencomp(false)
    }




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
            axios.post(`http://localhost:5000/customer/getCustomerById`, data)
                .then((response) => {

                    if (response?.data[0]?.cart?.serList == '') {
                        setCartActive(false)

                    } else {
                        setCartActive(true)
                    }

                });

        }
    }, []);
    const data = {
        custId: localStorage.getItem('id')
    }
    useEffect(() => {
        axios.post(`http://localhost:5000/order/getOrderByCustId/`, data)
            .then((response) => {
                console.log(response.data)
                console.log(response.data.pendingOrders)
                console.log(response.data.completedOrders)
                setPending(response.data.pendingOrders)
                setComplete(response.data.completedOrders)
            })
            
    },[]);


    return (

        <>
            <NavBar></NavBar>
            {!isLoggedIn && (
                <div style={{ width: '100%', height: '500px' }}>

                    <img
                        src="https://www.vhv.rs/dpng/d/521-5212497_empty-cart-hd-png-download.png"
                        alt="Full Page Image"
                        style={{ width: '100%', height: '580px' }}
                    />
                    <Dialog open={isOpen} onClose={handleClose}>
                        <div style={{ padding: '16px' }}>
                            <Typography variant="h5" component="div" gutterBottom>
                                Orders are only visible after logging in
                            </Typography>
                            <Typography variant="body1" component="div">
                                Please log in to view your orders and continue shopping.
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

            {isLoggedIn && (





                <div className="container-fluid" style={{ backgroundColor: '#D4E6F1' }}>
                    <div className='col-md-12 justify-content-center' style={{ padding: 20 }}>


                        <div className="container-fluid" style={{ backgroundColor: '#FFFFF0' }}>
                            {/* <div className='col-md-11' style={{margin :'20'}}>  */}

                            <div className='col-md-12' style={{ padding: 20 }}>
                                {pending.length === 0 && Complete.length === 0 ? (
                                    <h1 style={{ textAlign: 'center' }}>To see something you have to do something... : ) <br></br> you have never placed an order : /</h1>
                                ) : (
                                    <>
                                        {pending.length === 0 ? <h1 style={{ textAlign: 'center' }}></h1> :
                                            pending.length !== 0 && (
                                                <>
                                                    <h1 style={{ textAlign: 'center' }}></h1>



                                                    {pending.map((item, index) => (

                                                        <div className='row mt-2'>


                                                            <div className='col-md-8'>
                                                                <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                                                    <div className='row' style={{ marginTop: 20 }}>
                                                                        <div className="col-md-6">
                                                                            <img className="rounded" src={item?.serviceDetails[0]?.url} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                        </div>



                                                                        <div className='col-md-6' style={{ textAlign: 'left' }}>


                                                                            <h6 className="card-title"><strong>Order Id: </strong>{item.orderId}</h6>
                                                                            <h6 className="card-title"> <strong>Service Name: </strong>{item?.serviceDetails[0]?.name}</h6>

                                                                            <h6><strong>Total amount:</strong> ₹{item?.serviceDetails[0]?.price}</h6>

                                                                            <h6><strong> Payment mode: </strong>{item.payment_mode}  </h6>
                                                                            <h6><strong> Status: </strong><span className="text-warning">Not Completed</span>  </h6>
                                                                            <h6><strong>
                                                                                Employee Name: </strong>{item?.employeeDetails[0]?.fname} {item?.employeeDetails[0]?.lname}
                                                                            </h6>


                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                                                        < Button onClick={() => handleOrderDetails(item)} style={{
                                                                            marginRight: "50px", backgroundColor: '#007bff', 
                                                                            color: 'white', 
                                                                            padding: '10px 20px', 
                                                                            borderRadius: '5px',
                                                                            border: 'none', 
                                                                            cursor: 'pointer', 
                                                                            fontSize: '16px'
                                                                        }} variant="contained" color="warning">Order Details</Button>
                                                                        <button className="btn btn-danger" style={{ width: 50, }} onClick={()=> handleCancelOrder(item)} > <BsTrash /></button>
                                                                    </div>
                                                                    <div className="col-md-6" style={{ margin: 10 }}>


                                                                        <div className="row">
                                                                            <div className="col-md-8">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <Dialog open={open} onClose={handleC} PaperProps={{ style: dialogStyles }} >
                                                        <DialogTitle style={{ color: "red" }}>Order Details</DialogTitle>
                                                        <DialogContent>
                                                            <p><strong>Order Id :</strong> {pItem.orderId}</p>
                                                            <DialogContentText>
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <img className="rounded" src={pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.url : ""} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                </div>
                                                                <br></br>

                                                                <h6><strong>Service name :</strong> {pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.name : ""}</h6>
                                                                <h6><strong>Total amount :</strong> ₹{pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.price : ""}</h6>
                                                                <h6><strong>Booked at :</strong>{pItem.booking_datetime}</h6>
                                                                <h6><strong>Service date :</strong>{pItem.service_date}</h6>
                                                                <h6><strong>  Service start at:</strong>{pItem.service_startTime}</h6>
                                                                <h6><strong>service ends on:</strong>{pItem.service_endTime}</h6>
                                                                <h6><strong> Payment mode:</strong>{pItem.payment_mode} </h6>
                                                                <h6><strong> Status: </strong><span className="text-warning">Not Completed</span>  </h6>
                                                                <p>
                                                                    <strong>
                                                                        <h3>Employee Details</h3></strong>
                                                                    <h6>
                                                                        <strong>Employee Name:</strong>{pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.fname : ""} {pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.lname : ""} </h6>
                                                                    <h6>  <strong>Contact Number.:</strong>{pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.contact_no : ""}</h6>

                                                                </p>
                                                            </DialogContentText>

                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleC} style={{
                                                                            marginRight: "50px", backgroundColor: '#f96d00', 
                                                                            color: '#f2f2f2', 
                                                                            padding: '10px 20px', 
                                                                            borderRadius: '5px',
                                                                            border: 'none', 
                                                                            cursor: 'pointer', 
                                                                            fontSize: '16px'
                                                                        }}>
                                                                Close
                                                            </Button>

                                                        </DialogActions>
                                                    </Dialog>
                                                </>


                                            )}
                                        {Complete?.length === 0 ? <h1 style={{ textAlign: 'center' }}></h1> :


                                            Complete?.length !== 0 && (
                                                <>
                                                    {/* <h1 style={{ textAlign: 'center' }}></h1> */}



                                                    {Complete.map((item, index) => (

                                                        <div className='row mt-2'>


                                                            <div className='col-md-8'>
                                                                <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                                                    <div className='row' style={{ marginTop: 20 }}>
                                                                        <div className="col-md-6">
                                                                            <img className="rounded" src={item?.serviceDetails[0]?.url} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                        </div>



                                                                        <div className='col-md-6' style={{ textAlign: 'left' }}>


                                                                            <h6 className="card-title"><strong>Order Id: </strong>{item.orderId}</h6>
                                                                            <h6 className="card-title"> <strong>Service Name: </strong>{item?.serviceDetails[0]?.name}</h6>

                                                                            <h6><strong>Total amount:</strong> ₹{item?.serviceDetails[0]?.price}</h6>

                                                                            <h6><strong> Payment mode: </strong>{item.payment_mode}  </h6>
                                                                            {item.status == 'cancelled' ? <h6><strong> Status: </strong><span className="text-danger">Cancelled</span>  </h6>
                                                                            :<h6><strong> Status: </strong><span className="text-success">Completed</span>  </h6>
                                                                
                                                                            }
                                                                
                                                                            <h6><strong>
                                                                                Employee Name: </strong>{item?.employeeDetails[0]?.fname} {item?.employeeDetails[0]?.lname}
                                                                            </h6>


                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                                                        < Button onClick={() => handlecompOrderDetails(item)} style={{
                                                                            marginRight: "50px", backgroundColor: '#007bff', 
                                                                            color: '#f2f2f2', 
                                                                            padding: '10px 20px', 
                                                                            borderRadius: '5px',
                                                                            border: 'none', 
                                                                            cursor: 'pointer', 
                                                                            fontSize: '16px'
                                                                        }}variant="contained" color="warning">Order Details</Button>
                                                                        <button className="btn btn-danger" style={{ width: 50, }} > <BsTrash /></button>
                                                                    </div>
                                                                    <div className="col-md-6" style={{ margin: 10 }}>


                                                                        <div className="row">
                                                                            <div className="col-md-8">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <Dialog open={opencomp} onClose={handleCcomp} PaperProps={{ style: dialogStyles }} >
                                                        <DialogTitle style={{ color: "red" }}>Order Details</DialogTitle>
                                                        <DialogContent>
                                                            <p><strong>Order Id :</strong> {pItem.orderId}</p>
                                                            <DialogContentText>
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <img className="rounded" src={pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.url : ""} style={{ width: "50%", textAlign: "center", paddingLeft: 20 }} />
                                                                </div>
                                                                <br></br>

                                                                <h6><strong>Service name :</strong> {pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.name : ""}</h6>
                                                                <h6><strong>Total amount :</strong> ₹{pItem?.serviceDetails?.length > 0 ? pItem?.serviceDetails[0]?.price : ""}</h6>
                                                                <h6><strong>Booked at :</strong>{pItem.booking_datetime}</h6>
                                                                <h6><strong>Service date :</strong>{pItem.service_date}</h6>
                                                                <h6><strong>  Service start at:</strong>{pItem.service_startTime}</h6>
                                                                <h6><strong>service ends on:</strong>{pItem.service_endTime}</h6>
                                                                <h6><strong> Payment mode:</strong>{pItem.payment_mode} </h6>
                                                                
                                                                {pItem.status == 'cancelled' ? <h6><strong> Status: </strong><span className="text-danger">Cancelled</span>  </h6>
                                                                            :<h6><strong> Status: </strong><span className="text-success">Completed</span>  </h6>
                                                                
                                                                            }

                                                                <p>
                                                                    <strong>
                                                                        <h3>Employee Details</h3></strong>
                                                                    <h6>
                                                                        <strong>Employee Name:</strong>{pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.fname : ""} {pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.lname : ""} </h6>
                                                                    <h6>  <strong>Contact Number.:</strong>{pItem?.employeeDetails?.length > 0 ? pItem?.employeeDetails[0]?.contact_no : ""}</h6>

                                                                </p>
                                                            </DialogContentText>

                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCcomp} style={{
                                                                            marginRight: "50px", backgroundColor: '#f96d00', 
                                                                            color: 'white', 
                                                                            padding: '10px 20px', 
                                                                            borderRadius: '5px',
                                                                            border: 'none', 
                                                                            cursor: 'pointer', 
                                                                            fontSize: '16px'
                                                                        }}>
                                                                Close
                                                            </Button>

                                                        </DialogActions>
                                                    </Dialog>
                                                </>
                                            )}
                                    </>


                                )}
                            </div>
                        </div>
                    </div>
                    {cartActive && isLoggedIn
                    ? <Link to={"/Customer/Cart/"}>
                        <FaShoppingCart size={50} color="#89cff0" item='10' style={{
                            position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer', border: '1px solid #f8f4ff',
                            borderRadius: '10px',
                            padding: '8px',
                            backgroundColor: '#faebd7',
                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: "50px"
                        }} cartActive={false} />
                    </Link>
                    : <></>
                }

                </div>




            )}

        </>
    );

}
export default CustOrder