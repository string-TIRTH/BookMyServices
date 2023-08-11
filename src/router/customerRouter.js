const express = require("express");
const CustomerModel = require("../models/CustomerModel");
const customerRouter = express.Router();


customerRouter.post("/createCustomer", async (req, res) => {

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
}
);

customerRouter.post("/getCustomer", async (req, res) => {

    try {
        const customer = await CustomerModel.find({});
        res.json(customer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

customerRouter.post("/updateCustomer", async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;

    try {
        const customer = await CustomerModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

customerRouter.post("/deleteCustomer", async (req, res) => {

    const id  = req.body.id;
    try {
        const customer = await CustomerModel.findByIdAndDelete(id);
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = customerRouter