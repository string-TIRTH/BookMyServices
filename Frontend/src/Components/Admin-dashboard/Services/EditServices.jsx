import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ServiceCreationForm() {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        time: '',
        desc: '',
        image: null, // To store the selected image file
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({ ...formData, image: imageFile });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_id',id);
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('time', formData.time);
        data.append('desc', formData.desc);
        data.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:5000/service/updateService', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Service created:', response.data);
            if(response)
            alert("Services is Updated Successfully")
            window.location.href = '/';
          
        } catch (error) {
            console.error('Error creating service:', error);
           
        }
    };

    return (
        <div style={{
            width: "420px",
            margin: "0 auto",
            marginTop: "90px",
            border: "2px solid black",
            borderRadius: "10px",
            height: "550px",
            backgroundColor: "#c3bef0", // Add a background color
            display: "flex", // To center the form horizontally and vertically
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
        }}>
            <div style={{ }}>
                <h2 style={{ marginTop: "10px" }}>Create a New Service</h2>
                <form onSubmit={handleSubmit} style={{ width: "300px" }}>
                    <div >
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input type="text" name="time" value={formData.time} onChange={handleInputChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Description:</label>
                        <textarea name="desc" value={formData.desc} onChange={handleInputChange} required />
                    </div>
                    <br></br>
                    <div>
                        <label>Image:</label>
                        <input type="file" name="image" style={{border:"2px solid black "}}onChange={handleImageChange} accept="image/*" required />
                    </div>
                    <br></br>
                    <div>
                        <button type="submit">Update Service</button>
                    </div>
                </form>
            </div>
            </div>
            );
}

            export default ServiceCreationForm;
