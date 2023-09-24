import React, { useState } from 'react';
import './CssF/login.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };


    return (
        <>

            <div className="container d-flex align-items-center justify-content-center vh-100">

                <div className="p-4" style={{ border: '3px solid rgba(15, 29, 3, 0.93)', borderRadius: '20px', maxWidth: '500px' }}>

                    <div className="p-3" style={{ backgroundColor: 'rgba(128, 252, 8, 0.67)', borderRadius: '20px' }}>

                        <div className="logo-and-text">
                            <div className="logo-container">
                                <img src="/logo/BookMyServices.png" alt="Logo" className="logo" />
                            </div>
                            <span className="logo-text" style={{ fontFamily: "Times New Roman" }}>BookMyServices</span>
                        </div>

                        <h1 className="text-center mb-4" style={{ fontFamily: "Helvetica", }}>Sign in</h1>
                        <form onSubmit={handleLogin}>
                            <div className="row g-3">
                                <div className="col-12" style={{ marginTop: '20px' }}>
                                    <input
                                        type="email"
                                        className="form-control border-0"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Your Email"
                                        style={{ height: '55px' }}
                                    />
                                </div>
                            </div>
                            <div className="row g-3 ">
                                <div className="col-12" style={{ marginTop: '25px' }}>
                                    <input
                                        type="password"
                                        className="form-control border-0"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        style={{ height: '55px' }}
                                    />
                                </div>
                            </div>
                            <div className="row g-6">
                                <div className="col-12" style={{ marginTop: '20px' }}>
                                    <button className="btn btn-primary w-100 py-3" type="submit">
                                        Login
                                    </button>

                                    <p style={{ marginTop: '25px' }}>
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </p>


                                    <p className="text-left">

                                        Create account <Link to="/signup">Signup</Link>

                                    </p>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
};

export default LoginForm;
