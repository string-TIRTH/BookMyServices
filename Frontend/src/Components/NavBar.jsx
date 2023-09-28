
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './img/BMS_LOGO.png';
// import logo from '/src/public/logo/BMS_LOGO';
const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData,setUserData] = useState('')
    const [address,setAddress] = useState('')
    const [cartActive,setCartActive] = useState(false)
    useEffect(() => {
        //Runs only on the first render
        if (localStorage.getItem('role') != null) {
            setIsLoggedIn(true);
            const data = {
                _id:localStorage.getItem('id')
            };
            axios.post(`http://localhost:5000/customer/getCustomerById`, data)
            .then((response)=>{
                // console.log(response.data[0].cart.serList )
                setUserData(response.data[0])
                if(response.data[0].cart.serList == ''){
                    setCartActive(false)
                }else{
                    setCartActive(true)
                }
                setAddress(response.data[0].address[0])
            });
        }
    }, []);
    function logout(){
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
            <div className="container-fluid  d-none d-lg-block" style={{ background: "#cca8e9", width: "100%" }}>
                <div className="row align-items-center top-bar" style={{ height: "60px", marginLeft: 20, marginRight: 20 }}>
                    <div className="col-lg-3 col-md-12 text-center text-lg-start ">
                        <Link to="/" className="navbar-brand m-0 p-0">
                            <img src={logo} style ={{width : '100%'}}alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-9 col-md-12 text-end">
                    {isLoggedIn
                        ? <>
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <Link to="https://www.ddu.ac.in/"><i className="fa fa-map-marker-alt text-danger me-2"></i></Link>
                            <p className="m-0">{address.city}</p>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <Link to=""><i className="far fa-envelope-open text-danger me-2" ></i></Link>
                            <p className="m-0">{userData.email}</p>
                        </div>
                        </>
                        : <></>
                    }
                        <div className="h-100 d-inline-flex align-items-center">

                            {!isLoggedIn
                                ? <Link to="/login" className="btn btn-sm-square bg-white text-danger me-1">Login</Link>
                                : <Link to="/login" className="btn btn-sm-square bg-white text-danger me-1" onClick={logout}>Logout</Link>
                            }
                            

                    </div>
                </div>
            </div>
        </div >

            {/* Navbar start */ }
            < div className = "container-fluid nav-bar" style = {{ background: "#cca8e9" }
}>
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
        <Link to="" className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
            <h1 className="text-primary m-0">Plumberz</h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav me-auto">
                <Link to="/" className="nav-item nav-link ">Home</Link>
                <Link to="/Customer/About" className="nav-item nav-link">About</Link>
                <Link to="/Customer/AddServices/" className="nav-item nav-link">Services</Link>
                <Link to="/Customer/Contact" className="nav-item nav-link">Contact</Link>
            </div>
        </div>
    </nav>
            </div >
            
            {cartActive
                                ? <Link to={"/Customer/Cart/"}>
                                <FaShoppingCart size={50} color="blue" item= '10' style={{
                                    position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer', border: '1px solid #e8630a',
                                    borderRadius: '10px',
                                    padding: '8px',
                                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: "50px"
                                }} cartActive = {false}/>
                            </Link>
                                : <></>
            }
        </>
    );
}
export default NavBar;