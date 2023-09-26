import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { useEffect } from "react";

// import Slide from '@mui/material/Slide';
import { useParams } from 'react-router-dom';

function AddEmpSer() {
    const {_id} = useParams(); 
    const [selectedService, setSelectedService] = useState('');
    const [services, setServices] = useState([{}]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        axios.post(`http://localhost:5000/service/getService`)
            .then((response) => {
                // Set the fetched customer data in the state
                // setCustomers(response.data);
                console.log(response.data)
                setServices(response.data);

                // console.log(response.data.address[0])
                // empdatachange(response.data);
            })
            .catch((error) => {
                // Handle any errors here
                console.log(error)
                console.error('Error fetching customer data:', error);
            });
    }, []);




    const handleAddToCart = () => {
        // event.preventDefault();
        if (selectedService !== '') {
            setCartItems([...cartItems, selectedService]);
            setSelectedService('');
        }
    };

    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter((item) => item !== itemToRemove);
        setCartItems(updatedCart);
    };
    

    const HandlePlaceOrder = async()=>{
        // alert("Place Order?")
        // e.preventDefault();   
    //    console.log(cartItems)
    // console.log("he;lo");
  
    
   
    const requestData = {
        _id:_id, 
        serId: cartItems, 
    };

    try {
      
        const response = await axios.post('http://localhost:5000/Customer/addServices', requestData);

        if (response) {
          
            console.log('Services booked successfully');
        } else {
            console.error('Error booking services');
        }
    } catch (error) {
        console.error('Error booking services:', error);
    }
};


    

    return (
        // <div className='container'>
        <div className="container mt-5 d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="border p-3" style={{ width: "700px" }}>
                        <h2 className="mb-4" >Add Services
                        <button  className="btn btn-success"
                                type="button"
                                onClick={HandlePlaceOrder}
                                disabled={cartItems.length === 0}
                                style={{ width: "200px",marginLeft:"450px" }}>Add to EmployeeList </button>
                                </h2>
                        <div className="d-flex">
                        
                            <select
                                className="form-select me-3"
                                value={selectedService }
                                onChange={(e) => setSelectedService(e.target.value)}
                            >
                                <option value="" >
                                    Select a service
                                </option>
                                {services.filter(
                                    (service) => !cartItems.includes(service.name)
                                )
                                    .map((service) => (
                                        <option key={service._id} value={service.name}>
                                            {service.name}
                                        </option>
                                    ))}
                            </select>

                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleAddToCart}
                                style={{ width: "200px" }}
                            >
                                Add
                            </button>
                        </div>
                        <br></br>
                        <ul className="list-group">
                            {cartItems
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {item}
                                        
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ width: "200px" }}
                                            onClick={() => handleRemoveFromCart(item)}
                                        >
                                            <BsTrash />
                                        </button>
                                    
                                    </li>
                                   
                                    
                                ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmpSer;
