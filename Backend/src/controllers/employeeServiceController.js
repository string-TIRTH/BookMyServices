const EmpSer = require('../models/EmployeeServiceModel');

module.exports = {
  getAllEmpSers:  async (req, res) => {
    try {
        const empSer = await EmpSerModel.find({});
        res.status(200).json(empSer);
    }
    catch (err) {
        res.status(500).json({error:'Server error'});
    }
  },

  addEmpSer: async (req, res) => {
    try {
        const empSer = new EmpSerModel({
            empId : req.body.empId,
            serList : req.body.serList
        });
        const newEmpSer = await empSer.save();
        res.status(200).json(newEmpSer);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
  },

  getEmpSerByEmpId:  async (req, res) => {
    try {
        const empSer = await EmpSerModel.find({empId:req.body.empId});
        res.status(200).json(empSer);
    }
    catch (err) {
        res.status(500).json({error: 'Server error'});
    }
  },
  getEmpSerBySerId:  async (req, res) => {
    try {
        const empSer = await EmpSerModel.find({serId:req.body.serId});
        res.status(200).json(empSer);
    }
    catch (err) {
        res.status(500).json({error: 'Server error'});
    }
  },
  updateEmpSer: async (req, res) => {

    const id  = req.body.id;
    const  {serList}  = req.body;
    try {
        const empSer = await EmpSerModel.findByIdAndUpdate(id, {serList}, { new: true });
        res.status(200).json(empSer);
    }catch (error) {
        res.status(500).json({error: 'Server error'});
    }
},
  deleteEmpSer : async (req, res) => {

    const id  = req.body.id;
    try {
        const empSer = await EmpSerModel.findByIdAndDelete(id);
        res.send(empSer);
    }catch (error) {
        res.status(500).json({error: 'Server error'});
    }
},
  // Similar functions for updating and deleting empSer...
};
