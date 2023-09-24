import React from 'react';
// import Card from 'react-bootstrap/Card'; 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import axios from 'axios';
const DetailServices = () => {
  const { id } = useParams();
  const [user, setuser] = useState({});
  // const [user,setuser] =useState({});
  const data = {
    _id: id
  };
  useEffect(() => {

    axios.post(`http://localhost:5000/service/getServiceById`, data)
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
  const handleclick = () => {
    window.location.href = '/';
  }


  return (

    <Card style={{ width: '400px', margin: '0 auto', marginTop: "50px" }}>
      <Card.Img variant="top" src={user.url} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <p>Price: ${user.price}</p>
        <p>Time: {user.time} hours</p>
        <p>Average Rating: {user.avgRating}</p>
        <p>Description: {user.desc}</p>
        <p>isActive: {user.isActive ? "True" : "False"}</p>

        <Button variant="primary" onClick={handleclick}>Go Back</Button>
      </Card.Body>
    </Card>

  );


}
export default DetailServices