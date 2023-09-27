
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
const NavBar = ()=>{
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
    return(
        <>
            <div className="container-fluid  d-none d-lg-block" style={{ background: "#cca8e9", width: "100%" }}>
                <div className="row align-items-center top-bar" style={{ height: "60px", marginLeft: 20, marginRight: 20 }}>
                    <div className="col-lg-3 col-md-12 text-center text-lg-start ">
                        <Link to="" className="navbar-brand m-0 p-0">
                            <h1 className="text m-0" style={{ textDecoration: "underline", color: "#272343" }}>BookMyServices</h1>
                        </Link>
                    </div>
                    <div className="col-lg-9 col-md-12 text-end">
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <Link to="https://www.ddu.ac.in/"><i className="fa fa-map-marker-alt text-danger me-2"></i></Link>
                            <p className="m-0">Dharmsinh Desai University</p>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <Link to=""><i className="far fa-envelope-open text-danger me-2" ></i></Link>
                            <p className="m-0">BookMySevices.com</p>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">

                            <Link to="/login" className="btn btn-sm-square bg-white text-danger me-1">Login\signUp</Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar start */}
            <div className="container-fluid nav-bar" style={{ background: "#cca8e9" }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
                    <Link to="" className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
                        <h1 className="text-primary m-0">Plumberz</h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav me-auto">
                            <Link to="" className="nav-item nav-link ">Home</Link>
                            <Link to="/Customer/About" className="nav-item nav-link">About</Link>
                            <Link to="/Customer/AddServices/" className="nav-item nav-link">Services</Link>
                            <div className="nav-item dropdown">
                                <Link to="/Customer/Cart/" className="nav-item nav-link " >Cart</Link>
                            
                            </div>
                            <Link to="/Customer/Contact" className="nav-item nav-link">Contact</Link>
                        </div>

                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: "45px", height: "50px;", marginRight: "10px", borderRadius: "20px", border: "2px solidblack" }}>
                            <div style={cartIconStyle}>

                                <Link to="/Customer/Cart/" style={linkStyle}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
                                    Cart
                                </Link>


                            </div>

                        </div>


                        {/* ---- */}
                    </div>
                </nav>
            </div>

        </>
    );
}
export default NavBar;