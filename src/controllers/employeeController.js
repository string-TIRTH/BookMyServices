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
      const newEmployee = await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  },

  getEmployeeById: async (req, res) => {
    const empId = req.params.empId;

    try {
      const employee = await Employee.findById(empId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  updateEmployee: async(req,res)=>{
    const empId  = req.body.empId;
    const  {fname,lname,email,password,contact_no}  = req.body;
    try {
        const employee = await EmployeeModel.findByIdAndUpdate(empId, { fname,lname,email,password,contact_no}, { new: false });
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteEmployee : async (req, res) => {
    const empId  = req.body.empId;
    try {
        const employee = await EmployeeModel.findByIdAndDelete(empId);
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting employee...
};
