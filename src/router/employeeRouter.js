const express = require("express");
const EmployeeModel = require("../models/EmployeeModel");
const employeeController = require("../controllers/employeeController");
const router = express.Router();


router.post("/createEmployee", employeeController.createEmployee);
/**
 * async (req, res) => {

    try {
        const employee = new EmployeeModel({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password,
            contact_no : req.body.contact_no,
            address : req.body.address
        });
        const newEmployee = await employee.save();
        res.json(newEmployee);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/getEmployee",employeeController.getAllEmployees);
/**
 *  async (req, res) => {

    try {
        const employee = await EmployeeModel.find({});
        res.json(employee);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/getEmployeeById", employeeController.getEmployeeById);
/**
 * async (req, res) => {

    try {
        const employee = await EmployeeModel.find({_id:req.body.empId});
        res.json(employee);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/updateEmployee",employeeController.updateEmployee);
/**
 *  async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;

    try {
        const employee = await EmployeeModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */

router.post("/deleteEmployee",employeeController.deleteEmployee);

/**
 *  async (req, res) => {

    const id  = req.body.id;
    try {
        const employee = await EmployeeModel.findByIdAndDelete(id);
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */


module.exports = router