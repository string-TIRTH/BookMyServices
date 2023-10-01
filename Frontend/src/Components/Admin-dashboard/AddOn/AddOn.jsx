import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

const rowsPerPageOptions = [4, 5, 7];

const AddOn = () => {
    const [open, setOpen] = useState(false);
    const [openrem, setOpenrem] = useState(false);
    const [opendet, setOpendet] = useState(false);
    const [SelectEmp, setEmp] = useState({})
    const [selectAddOn, setSelectAddOn] = useState({})
    const [SelectEmpdet, setEmpdet] = useState({})
    //   const services = [ /* Your list of services goes here */ ];
    const [services, setService] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [employeeServices, setEmployeeServices] = useState([]);
    const [addOnRemove, setAddOnRemove] = useState([]);
    const [employeeServicesdet, setEmployeeServicesdet] = useState([]);
    const handleClose = () => {
        setEmp('')
        setOpen(false);
    };

    


    





    const [serData, serDataChange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const HandleOpenRem = (item) => {
      
        setSelectAddOn(item)
        setOpenrem(true);
        try {
            console.log(item)
            axios.post("http://localhost:5000/addOn/getAddOnBySerId",{serId : item._id})
                .then((response) => {
                    console.log(response.data.addOns);
                    setAddOnRemove(response.data.addOns);



                })
        }
        catch (error) {

        }
    }

    const handleCloserem = () => {
        setSelectAddOn('')
        setOpenrem(false);
    };
    const HandleDelete =(item) =>{
        handleCloserem()
        const datarem={
            addOnId:selectAddOn._id,
            serId:item._id
        }
        try {

            axios.post("http://localhost:5000/addOn/getAddOnBySerId", datarem)
                .then((response) => {
                    
            
                Swal.fire({
                    title: 'Deleted Successfully',
                    icon: 'success',
                    text: "",
                    confirmButtonText: 'Okay'
                }).then(() => {
                   
                   window.location.href="/admin/EmpSer"
                })



                })
        }
        catch (error) {
            console.log(error)

        }

    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {

        axios.post('http://localhost:5000/service/getService')
            .then((response) => {
                console.log(response.data);
                setService(response.data);
            })
            .catch((error) => {

                console.error('Error fetching customer data:', error);
            });
    }, []);



    





    useEffect(() => {

        axios.post('http://localhost:5000/service/getService')
            .then((response) => {

                serDataChange(response.data);
            })
            .catch((error) => {

                console.error('Error fetching employee data:', error);
            });
    }, []);

    return (

        <div className="container" style={{ backgroundColor: "#000" }}>
            <div className="left-sidebar">

                <Sidebar></Sidebar>
            </div>
            <div className="right-content" >
                <div className="centered-form" style={{ width: "900px", height: "100%" }}>
                    <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "3px", marginRight: "0px" }}>
                        <div className="card-title" style={{ marginLeft: "300px" }} >
                            <h2>Employee Listing</h2>
                        </div>
                        <div className="card-body" >
                           
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Time</td>

                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody style={{ marginRight: "0px", textAlign: "center" }}>

                                    {
                                        serData && serData

                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <tr key={item._id}>
                                                    <td >{page * rowsPerPage + index + 1}</td>
                                                    <td style={{textAlign: "left" }}>{item.name}</td>
                                                    <td style={{textAlign: "left" }}>{item.price}</td>
                                                    <td style={{textAlign: "left" }}>{item.time}</td>



                                                    <td ><button className="btn btn-success" style={{ marginLeft: "5px" }}>Add Accessories</button>
                                                    <button onClick={() => HandleOpenRem(item)} className="btn btn-danger" style={{ marginLeft: "5px" }}>Remove Accessories</button>
                                                    <button  className="btn btn-primary" style={{ marginLeft: "5px" }}>Details</button>
                                                       
                                                        {/* { item.status === 'active'  && <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"style={{marginLeft:"5px"}}>InActive</a>} */}
                                                    </td>
                                                </tr>
                                            )
                                            )
                                    }

                                </tbody>

                            </table>
                            <div className="fluid-container" style={{ width: "600px", height: "10%" }}>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={serData
                                        .length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={openrem} onClose={handleCloserem}>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogContent>
                    {addOnRemove &&
                        addOnRemove?.existingSer?.length === 0 ? (
                        <h1>It has No Services</h1>
                    ) : (
                        addOnRemove?.existingSer?.map((item) => (
                            <div class="container mt-5" key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            {/* <img src={item.url} className="img-fluid" alt={item.name} /> */}
                                        </div>
                                        <div className="col-md-8">
                                            <h2 className="card-title mt-2">{item.name}</h2>
                                            <div className="container">
                                                
                                            <h3>₹{item.price}</h3>
                                            <button  onClick={()=> HandleDelete(item)} className = "bg-info"style={{backgroundColor:"",marginLeft:"100px",width:"90px" }}>Delete</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                  
                    <Button onClick={handleCloserem} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
{/* --- */}
<Dialog open={opendet}>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogContent>
                    {employeeServicesdet &&
                        employeeServicesdet?.existingSer?.length === 0 ? (
                        <h1>It has No Services</h1>
                    ) : (
                        employeeServicesdet?.existingSer?.map((item) => (
                            <div class="container mt-5" key={item._id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={item.url} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <h2 className="card-title mt-2">{item.name}</h2>
                                            <div className="container">
                                                
                                            <h3>₹{item.price}</h3>
                                     
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                  
                    <Button  color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>




        </div>


    );
}
export default AddOn;