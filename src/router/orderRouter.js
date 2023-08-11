const express = require("express");
const OrderModel = require("../models/OrderModel");
const router = express.Router();


router.post("/createOrder", async (req, res) => {

    try {

        /**
         * assign employee before creation.
         * amount calculation with discount(promocode)
         * 
         */
        const order = new OrderModel({
            custId : req.body.id,
            serList : req.body.serList,
            booking_datetime : req.body.booking_datetime,
            service_datetime : req.body.service_datetime,
            address : req.body.address,
            payment_mode : req.body.payment_mode,
            amount : req.body.amount,
            promocode : req.body.promocode,
        });
        const newOrder = await order.save();
        res.json(newOrder);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getOrder", async (req, res) => {

    try {
        const order = await OrderModel.find({});
        res.json(order);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updateOrder", async (req, res) => {

    const id  = req.body.id;
    const  {empId,serList,service_datetime,address,payment_mode,status,isActive}  = req.body;

    try {
        const order = await OrderModel.findByIdAndUpdate(id, { empId,serList,service_datetime,address,payment_mode,status,isActive}, { new: true });
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteOrder", async (req, res) => {

    const id  = req.body.id;
    try {
        const order = await OrderModel.findByIdAndDelete(id);
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router