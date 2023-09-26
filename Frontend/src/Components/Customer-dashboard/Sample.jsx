import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';

const YourComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [next6Days, setNext6Days] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleConfirm = () => {
    // Handle the selected date and time slot
    console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
    console.log('Selected Time Slot:', selectedTimeSlot);

    // Close the dialog
    handleClose();
  };

  // Generate buttons for the next 6 days including today
  const generateNext6Days = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = moment().add(i, 'days');
      days.push(day);
    }
    setNext6Days(days);
  };

  // Initialize the date buttons
  useState(() => {
    generateNext6Days();
  }, []);

  // Generate time slots based on the selected date
  const generateTimeSlots = () => {
    const timeSlots = [];
    const today = moment();
    if (selectedDate.isSame(today, 'day')) {
      // Display time slots starting from the next hour for today
      const nextHour = moment().startOf('hour').add(1, 'hour');
      while (nextHour.isBefore(moment().endOf('day'))) {
        timeSlots.push(nextHour.format('h:mm A'));
        nextHour.add(1, 'hour');
      }
    } else {
      // Display time slots from 8:00 AM to 6:00 PM for other days
      let hour = 8;
      while (hour <= 18) {
        timeSlots.push(moment().hour(hour).format('h:00 A'));
        hour++;
      }
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Date and Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <div>
                <h5>Select Date:</h5>
                
                <div className="row">

                {next6Days.map((day,index) => (
                     <div className="col-md-2" key={index}>
                  <button
                    key={day}
                    className={`btn btn-sm ${
                      day.isSame(selectedDate, 'day') ? 'btn-primary' : 'btn-success'
                    }`}
                    onClick={() => handleDateChange(    day)}
                    style={{width:"65px",height:"50px"}}
                  >
                    {day.format('MMM DD')}
                  </button>
                  </div>
                ))}
                </div>
              </div>
              <div>
                
                <h5 style={{marginTop:"10px"}}>Select Time Slot:</h5>
                <select
                  id="timeSlotSelect"
                  className="form-select"
                  value={selectedTimeSlot}
                  onChange={handleTimeSlotChange}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default YourComponent;
