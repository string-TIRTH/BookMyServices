// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Carousels from './Carousels';
import NavBar from '../NavBar';
import { FaShoppingCart } from 'react-icons/fa';
import { Carousel } from 'react-carousel-minimal';
import { useEffect, useState } from "react";
import img1 from './img/service-2.jpg';
import img2 from './img/service-1.jpg';
import img3 from './img/service-3.jpg';
import img4 from './img/about-1.jpg'
import img5 from './img/about-2.jpg'
import img6 from './img/team-1.jpg'
import img7 from './img/team-2.jpg'
import img8 from './img/team-3.jpg'
import img9 from './img/team-4.jpg'
import Card from 'react-bootstrap/Card';
// import Span from '@babel/core'
// import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import md5 from 'md5'
// import img6 from '../img/carousel1.jpg'
// import '../Components/CssF/home.css' 
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css"

import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from '../NavBar';
import { Container, backdropClasses } from '@mui/material';
// import { useState } from 'react';

const Home = () => {
    const [user, setuser] = useState([{}])
    const [cartActive, setCartActive] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [pincode,setPincode] = useState(0)
    useEffect(() => {
       
        //Runs only on the first render
        const role = localStorage.getItem('role');
        if (role != null) {
            if(role === md5("Employee"))
            {
                window.location.href='/Employee';
            }else if(role === md5("Admin")){
                window.location.href='/admin';
            }
            setIsLoggedIn(true);
            const data = {
                _id: localStorage.getItem('id')
            };
            axios.post(`http://localhost:5000/customer/getCustomerById`, data)
                .then((response) => {
                    
                    console.log("response")
                    // console.log(response.data[0].address[0].pincode)
                    setPincode(response.data[0].address[0].pincode)
                    
                    

                    if (response?.data[0]?.cart?.serList == '' || response?.data[0]?.cart?.serList == null) {
                        setCartActive(false)
                      
                    } else {
                        setCartActive(true) 
                    }
                    
                });
               
        }
    }, []);
  
    useEffect(() => {
        const data = {
            _id:localStorage.getItem('id')
        };
        axios.post(`http://localhost:5000/customer/getCustomerById`, data)
            .then((response) => {
                console.log(cartActive)
              
                if (response?.data[0]?.cart?.serList == '') {
                    setCartActive(false)
                } else {
                    setCartActive(true)
                }
            });
        axios.post(`http://localhost:5000/service/getService`)
            .then((response) => {
                // Set the fetched customer data in the state
                // setCustomers(response.data);
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

    const linkStyle = {
        textDecoration: 'none',
        color: 'black', // Change the color to your preference
    };

    const iconStyle = {
        fontSize: '24px', // Adjust the size as needed
        cursor: 'pointer',
    };
    const cartIconStyle = {
        border: '1px solid #e8630a',
        borderRadius: '10px',
        padding: '8px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add the box shadow property
    };


    const data = [
        {
            image: "https://try.geoop.com/wp-content/uploads/2023/03/Best-apps-for-cleaners.jpg",
            caption: " Making Your Life Easier, One Service at a Time."
        },
        {
            image: "https://homemaidbetter.com/wp-content/uploads/2019/05/shutterstock_526418566.jpg",
            caption: "Your Comfort, Our Priority."
        },
        {
            image: "https://cdn.gobankingrates.com/wp-content/uploads/2018/06/20-Professional-House-Cleaning-shutterstock_395889778.jpg?webp=1&w=675&quality=75",
            caption: "Experience the Joy of Convenience"
        },
        {
            image: "https://www.setuppost.com/wp-content/uploads/2022/07/Move-Out-Cleaning-Services-Houston.jpg",
            caption: "We Take Care of Your Home, So You Can Take Care of Life."
        },
        {
            image: "https://integrityjanitorialcleaning.com/wp-content/uploads/2020/02/AdobeStock_217254228-scaled.jpeg",
            caption: "Transforming Homes, Building Trust"
        },
        {
            image: "https://homemaidbetter.com/wp-content/uploads/2018/04/cleaning-services.jpg",
            caption: "From Skilled Professionals to Happy Homes."
        },
        {
            image: "https://fastmaidservice.com/wp-content/uploads/2021/05/What-to-Expect-from-a-Maid-Service.jpg",
            caption: "Effortless Living, Exceptional Services"
        },
        {
            image: "https://alpinemaintenance.com/wp-content/uploads/2017/02/commercial-cleaning-services.jpg",
            caption: "A Better Way to Home Services."
        },
        {
            image: "https://mrtrimfit.com/wp-content/uploads/2022/04/janitorial-services.jpg",
            caption: "Your Happiness is Our Business."
        }
    ];

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }


    return (
        <>
            <div style={{ background: "#D4E6F1"}}>
            <NavBar></NavBar>
          
            {/* topbar start */}

            {/* Carousel */}
            <div className='container-fluid' style={{padding:'2px'}}>
             <div style={{ textAlign: "center"}} >
                {/* <h2>React Carousel Minimal</h2>
                <p>Easy to use, responsive and customizable carousel component for React Projects.</p> */}
                <div style={{ 
                    padding: "0 20px"
                }}>
                    <Carousel
                        data={data}
                        time={1500}
                        width="1300px"
                        height="500px"
                        captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="transparent"
                        // slideImageFit="cover"
                        // thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "1200px",
                            maxHeight: "1000px",
                            margin: "10px auto",
                        }}
                    />
                </div> 
            </div> 


            {/* services*/}
            <div className="d-flex justify-content-center align-items-center">
                {/* <div style={containerStyle}> */}

                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" style={{ justifyItems: "center" }} data-wow-delay="0.1s">
                            <div className="overflow-hidden">
                                <img className="img-fluid w-100 h-100" src={img1} alt="" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between p-4" style={{ backgroundColor: "#8bffff" }}>
                                <h5 className="text-truncate me-3 mb-0">Residential Plumbing</h5>
                                <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices/"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                            <div className="overflow-hidden">
                                <img className="img-fluid w-100 h-100" src={img2} alt="" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between p-4" style={{ backgroundColor: "#afc5ff" }}>
                                <h5 className="text-truncate me-3 mb-0">Commercial Plumbing</h5>
                                <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices/"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s">
                            <div className="overflow-hidden">
                                <img className="img-fluid w-100 h-100" src={img3} alt="" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between  p-4" style={{ backgroundColor: "#cca8e9" }}>
                                <h5 className="text-truncate me-3 mb-0">Emergency Servicing</h5>
                                <Link className="btn btn-square btn-outline-primary border-2 border-black flex-shrink-0" to="/Customer/AddSErvices"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* about  */}
            <div className="container-xxl py-5 d-flex justify-content-center align-items-center" style={{ marginLeft: "" }}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="text-secondary text-uppercase">About Us</h6>
                            <h1 className="mb-4">We Are Trusted Plumbing Company Since 1990</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Residential & commercial plumbing</p>
                            <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Quality services at affordable prices</p>

                            <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Immediate 24/ 7 emergency services</p>
                            <div className="bg-primary d-flex align-items-center p-4 mt-5">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: " 60px", height: "60px" }}>
                                    <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                </div>
                                <div className="ms-3">
                                    <p className="fs-5 fw-medium mb-2 text-white">Emergency 24/7</p>
                                    <h3 className="m-0 text-secondary">+012 345 6789</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pt-4" style={{ minHeight: "500px" }}>
                            <div className="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                                <img className="position-absolute img-fluid w-100 h-100" src={img4} style={{ padding: " 0 0 50px 100px ", objectFit: "cover", borderRadius: "100px" }} alt="" />
                                <img className="position-absolute start-0 bottom-0 img-fluid bg-white pt-2 pe-2 w-50 h-50" style={{ objectFit: "cover", borderRadius: "100px" }} src={img5} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            {/* services */}
            <h6 className="text-secondary text-uppercase d-flex justify-content-center align-items-center">Our Services</h6>
            <h1 className="mb-5 d-flex justify-content-center align-items-center">Explore Our Services</h1>
            <div className="container-xxl py-5 d-flex justify-content-center align-items-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>


                {user &&
                    user
                        .filter((item) => item.isActive)
                        .map((item) => (

                            <Card
                                key={item._id}
                                style={{ width: '260px', margin: '10px', borderColor: '#6d42c7', backgroundColor: "#f7f7f2" }}
                            ><Link to={`/Home/DetailsServices/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>

                                    <Card.Img
                                        variant="top"
                                        src={item.url}
                                        style={{ height: '200px', borderRadius: '100px' }}
                                    />

                                    <Card.Body style={{ height: '70px' }}>
                                        <h6 style={{ color: "#0e2431" }}>Name: {item.name}</h6>
                                        <h6 style={{ color: "#0e2431" }}>Price: ₹{item.price}</h6>




                                    </Card.Body>
                                </Link>

                            </Card>




                        ))}
            </div>

            <div className='container-fluid' style={{flex:"auto"}}>
                <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn  " data-wow-delay="0.1s" style={{padding:"10px"}}>
                    <div className="container-fluid" style={{padding:"40px"}}>
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h4 className="text-light mb-4">Address</h4>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-2"></i>Nadiad, Gujarat</p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-2"></i>+91 8780176056</p>
                                <p className="mb-3"><i className="fa fa-envelope me-2"></i>bookmyservices.one@gmail.com</p>
                            </div>

                            <div className="col-lg-3 col-md-6" style={{ marginLeft: "120px" }}>
                                <h4 className="text-light mb-4">BookMyServices</h4>
                                <p>You Say We Do..!</p>
                            </div>

                            <div className="col-lg-3 col-md-6" style={{ marginLeft: "150px" }}>
                                <h4 className="text-light mb-4">Opening Hours</h4>
                                <h6 className="text-light">Monday - Sunday:</h6>
                                <p className="mb-4">08.00 AM - 06.00 PM</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {!cartActive && isLoggedIn
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
            </div>
        </>
    )
}
export default Home;
