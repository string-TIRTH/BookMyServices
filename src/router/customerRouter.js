const express = require("express");
const CustomerModel = require("../models/CustomerModel");
const router = express.Router();
const custController = require("../controllers/customerController");
const customerController = require("../controllers/customerController");

router.post("/createCustomer",custController.createCustomer);
/**async (req, res) => {

    try {
        const customer = new CustomerModel({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password,
            contact_no : req.body.contact_no,
            address : req.body.address
        });
        const newCustomer = await customer.save();
        res.json(newCustomer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
} */

router.post("/getCustomer", custController.getAllCustomers);
/**
 * {

    try {
        const customer = await CustomerModel.find({});
        res.json(customer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/getCustomerById", async (req, res) => {

    try {
        const customer = await CustomerModel.find({_id:req.body.custId});
        res.json(customer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateCustomer", customerController.updateCustomer);
/**
 * async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;
    
    try {
        const customer = await CustomerModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */
router.post("/deleteCustomer", customerController.deleteCustomer);
/**
 * async (req, res) => {

    const id  = req.body.id;
    try {
        const customer = await CustomerModel.findByIdAndDelete(id);
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */


module.exports = router