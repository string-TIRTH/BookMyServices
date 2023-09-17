const express = require("express");
const ServiceModel = require("../models/ServiceModel");
const router = express.Router();
const moment = require("moment-timezone")
const uploadImage = require("../Helper/imageUploader")
const multer = require('multer');
const { json } = require("body-parser");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

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

router.post('/createService', (req, res) => {
    const service = new ServiceModel({
        name: req.body.name,
        price: req.body.price,
        time: req.body.time,
        desc: req.body.desc,
    });

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image;
    const id = moment.utc().unix()
    let ext = image.name;
    ext = ext.substring(ext.indexOf(".") + 1);
    image.name = id + "." + ext;
    folderPath = "Services";
    // console.log(image.name)
    // Move the uploaded file to a specific location (e.g., 'uploads/')
    image.mv('src/assets/uploads/' + image.name, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        const result = await uploadImage(id,folderPath,image.name);
        service.url = result.secure_url;

        const newService = await service.save();
        res.json(newService);

    });
});


// router.post("/createService", async (req, res) => {

//     try {
//         const service = new ServiceModel({
//             name : req.body.name,
//             price : req.body.price,
//             time : req.body.time,
//             desc : req.body.desc,
//         });
//         const newService = await service.save();
//         res.json(newService);
//     }
//     catch (err) {
//         res.json({
//             message: err
//         });
//     }
// }
// );

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
        const service = await ServiceModel.find({ _id: req.body.serId });
        res.json(service);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateService", async (req, res) => {

    const id = req.body.id;
    const { name, price, time, desc } = req.body;

    try {
        const service = await ServiceModel.findByIdAndUpdate(id, { name, price, time, desc }, { new: true });
        res.send(service);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteService", async (req, res) => {

    const id = req.body.id;
    try {
        const service = await ServiceModel.findByIdAndDelete(id);
        res.send(service);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});





module.exports = router