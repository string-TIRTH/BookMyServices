const FeedbackModel = require("../models/FeedbackModel");
module.exports = {
    createFeedback : async (req, res) => {

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
    },
    
    getFeedbackByCustId: async (req, res) => {
    
        try {
            const feedback = await FeedbackModel.find({custId:req.body.custId});
            res.json(feedback);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    
    
    getFeedbackByEmpId: async (req, res) => {
    
        try {
            const feedback = await FeedbackModel.find({custId:req.body.empId});
            res.json(feedback);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    getFeedback: async (req, res) => {
    
        try {
            const feedback = await FeedbackModel.find({});
            res.json(feedback);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    
    updateFeedback: async (req, res) => {
    
        const id  = req.body.id;
        const  {fname,lname,email,password,contact_no}  = req.body;
    
        try {
            const feedback = await FeedbackModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
            res.send(feedback);
        }catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    
    deleteFeedback: async (req, res) => {
    
        const id  = req.body.id;
        try {
            const feedback = await FeedbackModel.findByIdAndDelete(id);
            res.send(feedback);
        }catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    // Similar functions for updating and deleting empSer...
};
