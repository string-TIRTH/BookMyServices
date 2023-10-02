import NavBar from "../NavBar";
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import Typography from '@mui/material/Typography';
const CustOrder = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartActive, setCartActive] = useState(false)

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogin = () => {
        window.location.href="/Login"
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
                <div>
              
                   
                   
                </div>
            )}

        </>
    );

}
export default CustOrder