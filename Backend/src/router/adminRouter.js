const express = require("express");
const AdminModel = require("../models/AdminModel");
const router = express.Router();


router.post("/createAdmin", async (req, res) => {

    try {
        const admin = new AdminModel({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password,
            contact_no : req.body.contact_no,
            address : req.body.address
        });
        const newAdmin = await admin.save();
        res.json(newAdmin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getAdmin", async (req, res) => {

    try {
        const admin = await AdminModel.find({});
        res.json(admin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/getAdminById", async (req, res) => {

    try {
        const admin = await AdminModel.find({_id:req.body.custId});
        res.json(admin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateAdmin", async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;

    try {
        const admin = await AdminModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteAdmin", async (req, res) => {

    const id  = req.body.id;
    try {
        const admin = await AdminModel.findByIdAndDelete(id);
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router