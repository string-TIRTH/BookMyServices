import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';

function ServiceCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    time: '',
    desc: '',
    image: null,
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
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('time', formData.time);
    data.append('desc', formData.desc);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/service/createService', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Service created:', response.data);
     
        Swal.fire({
          title: 'Service Created Successfully',
          text: 'New service added!',
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then( window.location.href = '/Admin/Services');
       
      
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#c3bef0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginTop: '90px',
        }}
      >
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#00204a' }}>
          Create a New Service
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Time"
            name="time"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
          <TextareaAutosize
            aria-label="Description"
            rowsMin={6}
            placeholder="Description"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
          
            <Input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create Service
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ServiceCreationForm;
