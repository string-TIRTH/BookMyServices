import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AddEmpSer() {
    const { _id } = useParams();
    const data={
        empId:"6513c824512e0ee41f233f35",
        serId:"6513b57a004a356e1e543ce3"
    }
    const [selectedService, setSelectedService] = useState('');
    const [services, setServices] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        axios
            .post("http://localhost:5000/service/getService")
            .then((response) => {
                console.log(response.data);
                setServices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service data:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .post("http://localhost:5000/empser/getEmpSerByEmpId",data)
            .then((response) => {
                console.log(response.data);
                // setServices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service data:', error);
            });
    }, []);

    const handleAddToCart = () => {
        if (selectedService !== '') {
            setCartItems([...cartItems, selectedService]);
            setSelectedService('');
        }
            // Make an Axios request to remove the service from the employee's list in the database.
            axios
            .post('http://localhost:5000/empser/addService', data
        
            )
            .then((response) => {
                console.log('Service removed successfully from the database');
            })
            .catch((error) => {
                console.error('Error removing service from the database:', error);
            });

    };

    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter((item) => item !== itemToRemove);
        setCartItems(updatedCart);

        // Make an Axios request to remove the service from the employee's list in the database.
        axios
            .post('http://localhost:5000/Customer/removeService', {
                _id: _id,
                service: itemToRemove,
            })
            .then((response) => {
                console.log('Service removed successfully from the database');
            })
            .catch((error) => {
                console.error('Error removing service from the database:', error);
            });
    };

    const HandlePlaceOrder = async () => {
        const requestData = {
            _id: _id,
            serId: cartItems,
        };

        try {
            const response = await axios.post('http://localhost:5000/empser/addService', requestData);

            if (response) {
                console.log('Services booked successfully');
                // Navigate to the employee's page in the admin section
                // history.push(`/admin/employee/${_id}`);
            } else {
                console.error('Error booking services');
            }
        } catch (error) {
            console.error('Error booking services:', error);
        }
    };

    return (
        <div className="container mt-5 d-flex flex-shrink-0 align-items-center justify-content-center bg-white">
            <div className="row">
                <div className="col-md-6">
                    <div className="border p-3" style={{ width: "700px" }}>
                        <h2 className="mb-4">Add Services</h2>
                        <div className="d-flex">
                            <select
                                className="form-select me-3"
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                            >
                                <option value="">Select a service</option>
                                {services
                                    .filter((service) => !cartItems.includes(service.name))
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
                        <br />
                        <ul className="list-group">
                            {cartItems.map((item, index) => (
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
                        <button
                            className="btn btn-success mt-3"
                            type="button"
                            onClick={HandlePlaceOrder}
                            disabled={cartItems.length === 0}
                            style={{ width: "200px" }}
                        >
                            Add to EmployeeList
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmpSer;
