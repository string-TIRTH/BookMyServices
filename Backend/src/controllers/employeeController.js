// Example employeeController.js

const Employee = require('../models/EmployeeModel');

module.exports = {
  getAllEmployees: async (req, res) => {
    try {
      const employee = await Employee.find({});
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  createEmployee: async (req, res) => {
    
    try {
    const employee = new Employee({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        contact_no : req.body.contact_no,
        address : req.body.address
    });
      const newEmployee = await employee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  },

  getEmployeeById: async (req, res) => {
    const empId = req.body._id;
    // console.log(req.body)

    try {
      const employee = await Employee.findById(empId);
    
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getEmployeeByEmail: async (req, res) => {
    // const custId = req.body.email;
    // console.log(req.body.email)
    try {
      const employee = await Employee.findOne({email:req.body.email});
     if(employee){
      // console.log("true");
    
     res.status(200).json({mess : true})
    }
    else{
      // console.log("false")
      res.status(200).json({mess : false});
    }
     
    } catch (error) {
      console.log(error)
      res.status(500).json({ mess: false });
    }
  },
  updateEmployee: async(req,res)=>{
    const empId  = req.body._id;
    const update  = req.body;
    // console.log(req.body)
    // const  {fname,lname,email,password,contact_no}  = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(empId, update, { new: true });
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteEmployee : async (req, res) => {
    const empId  = req.body._id;
    try {
      const employee = await Employee.findByIdAndUpdate(empId,{ status: 'inactive' },{new:true});
        
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  activeEmployee : async (req, res) => {
    const empId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const employee = await Employee.findByIdAndUpdate(empId,{ status: 'active' },{new:true});
        
        
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getActiveCustomer : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Employee.find({status:'active'});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getInActiveCustomer : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Employee.find({status:'inactive'});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting employee...
};
