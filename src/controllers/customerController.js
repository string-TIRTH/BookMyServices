// Example customerController.js

const Customer = require('../models/CustomerModel');
var nodemailer = require('nodemailer');
module.exports = {
  getAllCustomers: async (req, res) => {
    try {
      const customer = await Customer.find({});
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  createCustomer: async (req, res) => {
    try {
      console.log(req);
    const customer = new Customer({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        contact_no : req.body.contact_no,
        address : req.body.address
    });
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  sendOTP : async (req,res)=>{
    const transporter = nodemailer.createTransport({
      port: 465,               // true for 465, false for other ports
      host: "smtp.gmail.com",
         auth: {
              user: 'bookmyservices.one@gmail.com',
              pass: 'dpxtivjexdkxucvq',
           },
      secure: true,
      });

      const mailData = {
        from: 'bookmyservice@noreply.com',  // sender address
          to: 'tirthprajapati26@gmail.com',   // list of receivers
          subject: 'OTP for account authentication',
          text: 'OTP for account authentication don\' share',
          html: '<p>dont Share : </p><p style ="color:red;"><b> 123456<b> </p>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
       res.send("ok");
  },
  getCustomerById: async (req, res) => {
    const custId = req.params.custId;

    try {
      const customer = await Customer.findById(custId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  updateCustomer: async(req,res)=>{
    const custId  = req.body.custId;
    const  {fname,lname,email,password,contact_no}  = req.body;
    try {
        const customer = await CustomerModel.findByIdAndUpdate(custId, { fname,lname,email,password,contact_no}, { new: false });
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteCustomer : async (req, res) => {
    const custId  = req.body.custId;
    try {
        const customer = await CustomerModel.findByIdAndDelete(custId);
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting customer...
};
