const express = require("express");
const ServiceModel = require("../models/ServiceModel");
const router = express.Router();
const uploadImage = require("../Helper/imageUploader")
/*
name :{
    type : String,
    required : true,
 },
 price :{
    type : String,
    required : true,
 },
 time :{
    type : String,
    required : true,
 },
 avgRating :{
    type : String,
    default : "Not Rated"
 }, 
 desc :{
    type : String,
    default : "Not Specified"
 },
 isActive :{
    type : Boolean,
    default : true
 },
*/

router.post("/test", async (req, res) => {

    try {
        cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        { public_id: "olympic_flag" }, 
        function(error, result) {console.log(result); });
        res.json("ok")
    }
    catch (err) {
        res.json(
             err
        );
    }
}
);
router.post("/test2", async (req, res) => {
    try {
        
        uploadImage()        
        console.log(req)
        res.send('e')
    }
    catch (err) {
        res.json(
             err
        );
    }
}
);

router.post("/createService", async (req, res) => {

    try {
        const service = new ServiceModel({
            name : req.body.name,
            price : req.body.price,
            time : req.body.time,
            desc : req.body.desc,
        });
        const newService = await service.save();
        res.json(newService);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getService", async (req, res) => {

    try {
        const service = await ServiceModel.find({});
        res.json(service);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});


router.post("/getServiceById", async (req, res) => {

    try {
        const service = await ServiceModel.find({_id : req.body.serId});
        res.json(service);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateService", async (req, res) => {

    const id  = req.body.id;
    const  {name,price,time,desc}  = req.body;

    try {
        const service = await ServiceModel.findByIdAndUpdate(id, { name,price,time,desc}, { new: true });
        res.send(service);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteService", async (req, res) => {

    const id  = req.body.id;
    try {
        const service = await ServiceModel.findByIdAndDelete(id);
        res.send(service);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});





module.exports = router