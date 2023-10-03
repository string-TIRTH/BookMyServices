const FeedbackModel = require("../models/FeedbackModel");
const EmployeeModel = require("../models/EmployeeModel");
const ServiceModel = require("../models/ServiceModel");
module.exports = {
    createFeedback : async (req, res) => {
        try {
            const custId =req.body.custId;
            const empId =req.body.empId;
            const serId =req.body.serId;
            const serRating =req.body.serRating;
            const empRating =req.body.empRating;
            const feedback = new FeedbackModel({
                custId: custId,
                empId: empId,
                orderId: req.body.orderId,
                serId: serId,
                serRating: serRating,
                empRating: empRating,
                feed_text: req.body.feed_text,
            });
            const newFeedback = await feedback.save();
            if(empRating != 0){
                const employee = await EmployeeModel.findById(empId,{rating:true});
                if(employee.rating == '-1' || employee.rating == 'Not Rated'){
                    employee.rating = parseInt(empRating);
                }else{
                    const rating = parseInt(empRating) + parseInt(employee.rating);
                    employee.rating = rating/2;
                }
                const newEmployee = await EmployeeModel.findByIdAndUpdate(empId,employee);
            }
           
            if(serRating != 0){
                const service = await ServiceModel.findById(serId,{rating:true});
                if(service.rating == '-1'){
                    service.rating = parseInt(serRating);
                }else{
                    const rating =parseInt(serRating) + parseInt(service.rating);
                    service.rating = rating/2;
                }
                const newService= await ServiceModel.findByIdAndUpdate(serId,service);
            }
            res.json(newFeedback);
        }
        catch (err) {
            console.log(err)
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
