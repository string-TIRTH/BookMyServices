import React from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
const DetailCustomer =()=>{
    const {id} = useParams();   
    const [user,setuser] =useState([{}]);
    const data={
        _id : id
    }; 
    useEffect(() => {
   
        axios.post(`http://localhost:5000/customer/getCustomerById`,data)
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
            console.error('Error fetching customer data:', error);
          });
      }, []);
      // if(user[0].address !== undefined ){
      // const add =user[0].address[0]
      
      
      // const mess = "donot exist";
      // console.log(user[0]?.address?.length)
      // console.log(user[0].address && user[0].address.length >0 ? "hello" : "not hello");
      
    return(
        <>
     


 
    <Card className="user-details-card">
      <Card.Body>
        <Card.Title>User Details</Card.Title>
        <Card.Text>
          <strong>First Name:</strong> {user[0].fname }<br />
          <strong>Last Name:</strong> {user[0].lname }<br />
          <strong>Email:</strong> {user[0].email}<br />
          <strong>Password:</strong> {user[0].password}<br />
          <strong>Contact:</strong> {user[0].contact_no}<br />
          <strong>House Number:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].house_no: "N/A"}<br />
          <strong>Street Name:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].society_name: "N/A"}<br />
          <strong>Landmark:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].landmark: "N/A"}<br />
          <strong>City:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].city: "N/A"}<br />
          <strong>Pincode:</strong> {user[0]?.address?.length > 0 ? user[0].address[0].pincode: "N/A"}<br />
          <strong>Latitude:</strong> {user[0].latitude}<br />
          <strong>Longitude:</strong> {user[0].longitude}<br />
          <strong>Status:</strong> {user[0].status}<br />
        </Card.Text>
      </Card.Body>
    </Card>
 



        </>
    );
}
export default DetailCustomer;