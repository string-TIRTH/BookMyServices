import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Paper, Typography, TextField, Button, Grid, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import NavBar from '../NavBar';

const Contact = () => {
  return (
    <div style={{ backgroundColor: "#D4E6F1", minHeight: "100vh"  }}>
      <NavBar></NavBar>
      <div style={{ padding: '20px'}}>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5">Our Location</Typography>
              {/* Map container */}
              <Box height="300px" width="100%">
                <MapContainer center={[22.6915853, 72.863363]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A sample marker on the map.
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Paper>
          </Grid>
          {/* Left side of the grid (Contact Form) */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5">Contact Us</Typography>
              <form>
                <TextField label="Name" fullWidth margin="normal" />
                <TextField label="Email" fullWidth margin="normal" />
                <TextField label="Message" fullWidth multiline rows={4} margin="normal" />
                <Button variant="contained" color="primary">
                  Send
                </Button>
              </form>
            </Paper>
          </Grid>


        </Grid>
      </div>
    </div>
  );
}

export default Contact;
