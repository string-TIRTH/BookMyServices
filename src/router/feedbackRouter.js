const express = require("express");
const FeedbackModel = require("../models/FeedbackModel");
const router = express.Router();


router.post("/createFeeback", async (req, res) => {

    try {
        const feedback = new FeedbackModel({
            fname : req.body.empI,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password,
            contact_no : req.body.contact_no,
            address : req.body.address
        });
        const newFeedback = await feedback.save();
        res.json(newFeedback);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getFeedback", async (req, res) => {

    try {
        const feedback = await FeedbackModel.find({});
        res.json(feedback);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateFeedback", async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;

    try {
        const feedback = await FeedbackModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(feedback);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteFeedback", async (req, res) => {

    const id  = req.body.id;
    try {
        const feedback = await FeedbackModel.findByIdAndDelete(id);
        res.send(feedback);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router