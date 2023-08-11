const express = require("express");
const EmpSerModel = require("../models/EmployeeServiceModel");
const router = express.Router();


router.post("/createEmpSer", async (req, res) => {

    try {
        const empSer = new EmpSerModel({
            empId : req.body.empId,
            serList : req.body.serList
        });
        const newEmpSer = await empSer.save();
        res.json(newEmpSer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getEmpSer", async (req, res) => {

    try {
        const empSer = await EmpSerModel.find({});
        res.json(empSer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateEmpSer", async (req, res) => {

    const empID  = req.body.id;
    const  {serList}  = req.body;

    try {
        const empSer = await EmpSerModel.findByIdAndUpdate(empID, {serList}, { new: true });
        res.send(empSer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteEmpSer", async (req, res) => {

    const id  = req.body.id;
    try {
        const empSer = await EmpSerModel.findByIdAndDelete(id);
        res.send(empSer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router