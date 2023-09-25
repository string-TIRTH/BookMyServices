import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { useReducer } from 'react';
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
let count = 0;
const Cart = () => {
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [ash, setash] = useState(1);
    const [open, setOpen] = useState(false);
    const [Item, setItem] = useState([]);
    const [user, setUser] = useState({});
    // console.log(count)

    const handleClickOpen = (item) => {
        setItem(item)
        setOpen(true);
    };

    const handleClose = () => {
        setItem([])
        setOpen(false);
    };
    const customerId = "65045d16de311c998f1e4b64";
    const id = {
        _id: "65045d16de311c998f1e4b64"
    }

    var cartData
    useEffect(() => {
        // Replace with the actual customer ID
        // forceUpdate();

        axios.post("http://localhost:5000/Customer/Cart", { custId: customerId })
            .then((response) => {
                cartData = response.data.cart.serList;
                console.log(cartData)
                fetchServiceDetails(cartData);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });

    }, [ash]);
    const fetchServiceDetails = (cartData) => {

        const promises = cartData.map(async (item) => {
            return axios.post("http://localhost:5000/service/getServiceById/", item)
                .then((response) => {
                    return {
                        ...item,
                        serviceDetails: response.data

                    };
                })
                .catch((error) => {
                    console.error('Error fetching service details:', error);
                    return item;
                });
        });

        Promise.all(promises)
            .then((updatedCartData) => {
                console.log(updatedCartData)
                setCartItems(updatedCartData);
            });
    }


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const item of cartItems) {
            totalPrice += parseInt(item.serviceDetails.price, 10);
        }
        return totalPrice;
    };
    const [address, setAddress] = useState({
        houseNo: "",
        society: "",
        landmark: "",
        city: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any action with the address data here
        console.log("Address submitted:", address);
    };

    const HandleRemove = (item) => {
        const data = {
            custId: customerId,
            serId: item.serId,
            time: item.time,
            date: item.date

        }
        try {
            // Replace with the actual customer ID

            axios.post("http://localhost:5000/Customer/removeService", data)
                .then((response) => {
                    Swal.fire({
                        title: 'Removed!',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    }).then(() => {
                        window.location.href = "/Customer/Cart/";
                    })

                    // window.location.href = /Customer/cart/${customerId}
                });

        }
        catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }
    const total = calculateTotalPrice();
    const handleOpenOrderDialog = () => {
        try {
            // Replace with the actual customer ID

            axios.post("http://localhost:5000/Customer/getCustomerById", id)
                .then((response) => {
                    setUser(response.data)
                    console.log(response.data)

                    // window.location.href = /Customer/cart/${customerId}
                })
        }
        catch (error) {
            console.error('Error fetching cart data:', error);
        }
        setOrderDialogOpen(true);
    };

    const handleCloseOrderDialog = () => {
        setOrderDialogOpen(false);
    };
    const handlePlaceOrder = () => {
        try {
            const response = axios.post("http://localhost:5000/Customer/removeService");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <div className='container mt-5 d-flex justify-content-center align-items-center' style={{ marginTop: "10px" }}>
                <Button
                    style={{ width: "400px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {

                        window.location.href = "/Customer/AddServices";
                    }}
                >
                    Add More Services
                </Button>
            </div>


            {cartItems.length === 0 ? (
                <h1>Cart is Empty</h1>
            ) : (
                cartItems.map((item, index) => (
                    <div className='container mt-5 d-flex justify-content-left align-items-center' style={{ marginTop: "10px" }}>
                        <div className="card" key={index} style={{ width: "520px" }}>
                            <div className="row">
                                <div className="col-md-6" style={{ margin: 10 }}>
                                    <h5 className="card-title" style={{ textAlign: "center" }}> {item.serviceDetails.name}</h5>

                                    <img src={item.serviceDetails.url} alt={item.serviceDetails.name} style={{ width: "100%" }} />
                                </div>    
                                <div className="col-md-6" style={{ margin: 10 }}>
                                
                                    <p style={{ textAlign: "center"}}   > ₹{item.serviceDetails.price}</p>



                                    <p className="card-text"> time Slot: {item.time}</p>
                                    <p className="card-text"> date: {item.date}</p>
                                    <br></br>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <Button variant="contained" color="success" onClick={() => handleClickOpen(item)}>
                                                    Read More
                                                </Button>
                                                <Dialog open={open} onClose={handleClose} >
                                                    <DialogTitle>Item Details</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            <div className='container d-flex'>
                                                                <img src={item.serviceDetails.url} alt={item.serviceDetails.name} className="img-fluid" style={{ width: "50%" }} />
                                                                <div style={{ marginLeft: "20px" }}>
                                                                    <h5><strong>Name:</strong> {item.serviceDetails.name}</h5>
                                                                    <h5><strong>Price:</strong>  ₹{item.serviceDetails.price}</h5>
                                                                    <h5><strong>Description:</strong>  {item.serviceDetails.desc}</h5>
                                                                    <h5><strong>Time for Service:</strong>  {item.serviceDetails.time} min</h5>
                                                                    <h5><strong>Date:</strong>  {item.date}</h5>
                                                                    <h5><strong>Time Slot:</strong>  {item.time}</h5>
                                                                </div>
                                                            </div>

                                                        </DialogContentText>

                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} style={{ backgroundColor: "blue", color: "black" }}>
                                                            Close
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>


                                            <div className="col-md-4">
                                                <button className="btn btn-danger" onClick={() => HandleRemove(item)}> <BsTrash /></button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className="row" style={{ margin: "0px", marginRight: "10px", height: "100px" }}>
                <div className="col-md-11 mt-8 d-flex justify-content-end align-items-end" style={{ height: "120px" }} >
                    <div className="card" style={{ height: "200px", marginBottom: "50px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Price</h5>
                            <p className="card-text">₹{calculateTotalPrice()}</p>
                            <Button
                                style={{ width: "100px" }}
                                variant="contained"
                                color="warning"
                                onClick={handleOpenOrderDialog}


                            >
                                Place Order
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog}>
                <DialogTitle>Place Order</DialogTitle>
                <DialogContent>
                    Confirm your address
                    <DialogContentText>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="House Number"
                                name="houseNo"
                                value={user[0]?.address?.length > 0 ? user[0].address[0].house_no : "N/A"}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Society"
                                name="society"
                                value={user[0]?.address?.length > 0 ? user[0].address[0].society_name : "N/A"}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Landmark"
                                name="landmark"
                                value={user[0]?.address?.length > 0 ? user[0].address[0].landmark : "N/A"}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={user[0]?.address?.length > 0 ? user[0].address[0].city : "N/A"}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Pincode"
                                name="pincode"
                                value={user[0]?.address?.length > 0 ? user[0].address[0].pincode : "N/A"}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />

                        </form>

                    </DialogContentText>
                    {/* Add your form fields and order confirmation content */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrderDialog} style={{ backgroundColor: "blue", color: "black" }}>
                        Cancel
                    </Button>
                    <Button onClick={handlePlaceOrder} variant="contained" color="primary">
                        Confirm Order
                    </Button>
                </DialogActions>
            </Dialog>








        </div>
    );
};

export default Cart;