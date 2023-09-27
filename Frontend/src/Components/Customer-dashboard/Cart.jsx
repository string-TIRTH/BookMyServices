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
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { red } from '@mui/material/colors';
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
    const customerId = "6513add1e0353232755a88f5";
    const id = {
        _id: "6513add1e0353232755a88f5"
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
        house_no: "",
        society_name: "",
        landmark: "",
        city: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("here " + name, value)
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
    // const total = calculateTotalPrice();
    const handleOpenOrderDialog = () => {
        try {
            // Replace with the actual customer ID

            axios.post("http://localhost:5000/Customer/getCustomerById", id)
                .then((response) => {
                    setUser(response.data)
                    // const address = {
                    //     house_no: response.data[0].address[0].house_no,
                    //     society_name: response.data[0].address[0].society_name,
                    //     landmark: response.data[0].address[0].landmark,
                    //     pincode: response.data[0].address[0].pincode,
                    //     city : response.data[0].address[0].city   
                    // }
                    const address = response.data[0].address[0];
                    setAddress(address);
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
    const handlePlaceOrder = async () => {
        try {
            const placeOrderData = {
                custId: id._id,
                address: address
            }
            console.log(address)
            const response = await axios.post("http://localhost:5000/Order/createOrder", placeOrderData);
            if (response) {
                handleCloseOrderDialog();
                // setCartItems(null);
                cartItems.length = 0;
                console.log(response.data)
                if (response.data.code === 0) {
                    let text = "";

                    cartItems.map((item, index) => (item) => {
                        text += "\n" + item.serviceDetails.name;
                    });
                    Swal.fire({
                        title: 'Order Placed Successfully',
                        icon: 'success',
                        text: text,
                        confirmButtonText: 'Okay'
                    }).then(() => {
                        const data = {
                            custId: id._id
                        }
                        axios.post("http://localhost:5000/customer/removeCart", data);
                    })
                }
            }

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

            <div className="container-fluid">
                <div className='col-md-12'> 
                        {cartItems.length === 0 ? (
                            <h1 style={{ textAlign: 'center' }}>Cart is Empty</h1>
                        ) : (
                            cartItems.map((item, index) => (
                                <div className='row mt-2'>
                                <div className='col-md-6'>
                                <div className="card" key={index} style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                                    <div className='row'>
                                        <div className="col-md-12" style={{ padding: 20, color: 'white' }} onClick={() => handleClickOpen(item.serviceDetails)}>
                                            <h5 className="card-title" style={{ marginRight: "20%", marginLeft: "20%", textAlign: "center", backgroundColor: 'white', color: 'black', borderRadius: 20, fontSize: 30 }}> {item.serviceDetails.name}</h5>
                                        </div>
                                    </div>
        
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <img className="rounded" src={item.serviceDetails.url} alt={item.serviceDetails.name} style={{ width: "100%", textAlign: "center", paddingLeft:20}} />
                                            </div>
                                           
                                        
                                   
                                        <div className='col-md-6'>
                                        
                                            
                                            <p style={{textAlign:'left',paddingLeft:'0'}}>Price : ₹{item.serviceDetails.price}</p>

                                            
                                        
                                        <div className='row'>
                                            

                                                <p> Want on: {item.date} at: {item.time}</p> 
                                            
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-12" style={{ textAlign: "right", paddingRight: '10%' }}>
                                        <button className="btn btn-danger" style={{ width: 50 }} onClick={() => HandleRemove(item)}> <BsTrash /></button>
                                    </div>
                                    <div className="col-md-6" style={{ margin: 10 }}>


                                        <div className="row">
                                            <div className="col-md-8">
                                                <Dialog open={open} onClose={handleClose} >
                                                    <DialogTitle>Item Details</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            <div className='container d-flex'>
                                                                <img src={Item.url} alt={Item.name} className="img-fluid" style={{ width: "50%" }} />
                                                                <div style={{ marginLeft: "20px" }}>
                                                                    <h5><strong>Name:</strong> {Item.name}</h5>
                                                                    <h5><strong>Price:</strong>  ₹{Item.price}</h5>
                                                                    <h5><strong>Description:</strong>  {Item.desc}</h5>
                                                                    <h5><strong>Time for Service:</strong>  {Item.time} </h5>
                                   
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
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                            ))
                        )}

                    </div>
                    </div>
            <div className="col-md-12 align-content-right ">
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
                                // value={user[0]?.address?.length > 0 ? user[0].address[0].house_no : "N/A"}
                                value={address.house_no}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Society"
                                name="society"
                                value={address.society_name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Landmark"
                                name="landmark"
                                value={address.landmark}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Pincode"
                                name="pincode"
                                value={address.pincode}
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