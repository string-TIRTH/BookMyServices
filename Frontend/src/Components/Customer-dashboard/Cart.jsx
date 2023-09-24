import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { useReducer } from 'react';
// import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

let count = 0;
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [ash, setash] = useState(1);
    const [open, setOpen] = useState(false);
    const [Item, setItem] = useState([]);
    console.log(count)

    const handleClickOpen = (item) => {
        setItem(item)
        setOpen(true);
    };

    const handleClose = () => {
        setItem([])
        setOpen(false);
    };
    const customerId = "65045d16de311c998f1e4b64";
    var cartData
    useEffect(() => {
        // Replace with the actual customer ID
        // forceUpdate();

        axios.post(`http://localhost:5000/Customer/Cart`, { custId: customerId })
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

    const HandleRemove = (item) => {
        const data = {
            custId: customerId,
            serId: item.serId,
            time: item.time,
            date: item.date

        }
        try {
            // Replace with the actual customer ID

            axios.post(`http://localhost:5000/Customer/removeService`, data)
                .then((response) => {
                    alert("delete Successfully")

                    window.location.href = `/Customer/Cart/`
                    // window.location.href = `/Customer/cart/${customerId}`
                })
        }
        catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }
    const total = calculateTotalPrice();

    return (
        <>
         <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <h4>Total Price: ₹{total}</h4> {/* Display the total price */}
            </div>
          </div>
        </div>

            {cartItems.length === 0 ? (
                <h1>Cart is Empty</h1>
            ) : (
                cartItems.map((item, index) => (
                    <div className='container mt-5 d-flex justify-content-center align-items-center' style={{ marginTop: "10px" }}>
                        <div className="card" key={index} style={{ width: "520px" }}>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={item.serviceDetails.url} alt={item.serviceDetails.name} className="img-fluid" style={{ width: "100%" }} />
                                    <h5 className="card-title" style={{ textAlign: "center" }}> {item.serviceDetails.name}</h5>
                                    <p className="card-text" style={{ textAlign: "center" }}   > ₹{item.serviceDetails.price}</p>
                                    {/* <p className="card-text">{item.serviceDetails.time}</p> */}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">


                                        <h6 className="card-text"> time Slot: {item.time}</h6>
                                        <h6 className="card-text"> date: {item.date}</h6>
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
                    </div>
                ))
            )}
            
        </>
    );
};

export default Cart;
