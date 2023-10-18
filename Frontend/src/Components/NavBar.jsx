
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './img/BMS_LOGO.png';
import Swal from 'sweetalert2'

// import logo from '/src/public/logo/BMS_LOGO';
const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState('')
    const [address, setAddress] = useState('')
    const [cartActive, setCartActive] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    useEffect(() => {
       
        //Runs only on the first render
        if (localStorage.getItem('role') != null) {
            setIsLoggedIn(true);
            const data = {
                _id: localStorage.getItem('id')
            };
            axios.post(`http://localhost:5000/customer/getCustomerById`, data)
                .then((response) => {
                    // console.log(response.data[0].cart.serList )
                    setUserData(response.data[0])
                    if (response?.data[0]?.cart?.serList == '') {
                        setCartActive(false)
                      
                    } else {
                        setCartActive(true)
                    }
                    setAddress(response.data[0].address[0])
                });
               
        }
    }, []);
    
    const logout = () => {

 
        Swal.fire({
            title: 'Logout Successfully',
            icon: 'success',
            text: "",
            confirmButtonText: 'Okay'
        }).then(() => {
           
           

            window.location.href = "/"

        })
        localStorage.clear()
    };
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
    return (
        <>
            <div className="container-fluid  d-none d-lg-block" style={{ background: "#D4E6F1", width: "100%" }}>
                <div className="row align-items-center top-bar" style={{ height: "60px", marginLeft: 20, marginRight: 20 }}>
                    <div className="col-lg-3 col-md-12 text-center text-lg-start ">
                        <Link to="/" className="navbar-brand m-0 p-0">
                            <img src={logo} style={{ width: '100%' }} alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-9 col-md-12 text-end">
                        {isLoggedIn
                            ? <>
                                <div className="h-100 d-inline-flex align-items-center me-4">
                                    <Link to=""><i className="fa fa-map-marker-alt text-danger me-2"></i></Link>
                                    <p className="m-0">{address.city}</p>
                                </div>
                                <div className="h-100 d-inline-flex align-items-center me-4">
                                    <Link to=""><i className="far fa-envelope-open text-danger me-2" ></i></Link>
                                    <p className="m-0">{userData.email}</p>
                                </div>
                            </>
                            : <></>
                        }
                        <div className="h-100 d-inline-flex align-items-center" style={{marginRight:"64px"}}>

                            {!isLoggedIn
                                ?
                                
                                <Link to="/login" className="btn btn-sm-square bg-white text-danger me-1">Login</Link>
                                // </div>
                               
                                :
                                <div className="d-inline-flex align-items-center" >
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-primary rounded-circle dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-bs-toggle="dropdown"
                                      aria-expanded={dropdownOpen}
                                      onClick={toggleDropdown}
                                    >
                                     
                                      <i className="fas fa-user"></i>
                                    </button>
                                    <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                      <li>
                                      <Link to ={"/Customer/Profile/" + localStorage.getItem('id')} className="dropdown-item">
                                          Profile
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to ={"/Customer/CustEditProfile/"+ localStorage.getItem('id')} className="dropdown-item" >
                                          Edit Profile
                                        </Link>
                                      </li>
                                      <li>
                                        <button className="dropdown-item" onClick={logout}>
                                          Logout
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                           
                            }


                        </div>
                    </div>
                </div>
            </div >

           
                <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4 square border border-dark border-right-0 border-left-0">
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav me-auto">
                            <Link to="/" className="nav-item nav-link ">Home</Link>
                            <Link to="/Customer/About" className="nav-item nav-link">About</Link>
                            <Link to="/Customer/AddServices/" className="nav-item nav-link">Services</Link>
                            <Link to="/Customer/CustOrder" className="nav-item nav-link">Order</Link>
                            <Link to="/Customer/Contact" className="nav-item nav-link">Contact</Link>
                        </div>
                    </div>
                </nav>
  
           
        </>
    );
}
export default NavBar;