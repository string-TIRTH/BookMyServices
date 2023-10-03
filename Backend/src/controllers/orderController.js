const moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
const distance = require('../Helper/distanceFinder')
const OrderModel = require("../models/OrderModel");
const ServiceModel = require("../models/ServiceModel");
const EmpSerModel = require("../models/EmployeeServiceModel");
const emailSender = require("../Helper/otpHelper")
const { default: mongoose } = require("mongoose");
const CustomerModel = require('../models/CustomerModel');
const { response } = require('express');
module.exports = {
    checkAvailability: async (req, res) => {
        try {
            const serId = req.body.serId;
            const date = req.body.date
            const time = req.body.time
            const empIdList = await EmpSerModel.distinct("empId", { "serList.serId": serId }, { empId: true });
            console.log(empIdList)
            serTimeList = [];
            const startTime = time;
            hour = startTime[0] + startTime[1]
            minute = startTime[3] + startTime[4]
            var st = moment({ hour: hour, minute: minute, seconds: 0 });
            let t = moment(st);
            serTimeList.push(t.add(-180, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
            console.log(serTimeList)
            let orderList = []
            let foundEmpId = null;
            let empFound = false;
            for (let eid of empIdList) {
                console.log(eid)
                const availOrderList = await OrderModel.findOne({ "empId": eid, service_date: date, service_startTime: { $in: serTimeList },isActive : true })
                console.log(availOrderList)
                if (availOrderList != null && availOrderList != "") {
                    orderList.push(availOrderList)
                } else {
                    foundEmpId = eid;
                    empFound = true;
                    break;
                }
            }
            if(empFound){
                responseAck = {
                    message : true
                }
            }else{
                responseAck = {
                    message : false
                }
            }
            console.log(responseAck)
            res.json(responseAck);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    createOrder: async (req, res) => {
        try {
            const custId = req.body.custId;
            const address = req.body.address;
            console.log(address)
            console.log(custId)
            const customer = await CustomerModel.findById(custId, { cart: true });
            console.log(customer)

            const serList = customer.cart.serList;
            // const serList = req.body.serList;
            console.log(serList)
            let temp = [];
            const serDate = req.body.service_date;
            let i = 0;
            // let orderId = new mongoose.Types.ObjectId();
            let orderId = moment().unix();
            orderId *=2;
            for (let ser of serList) {
                let empIdList = await EmpSerModel.distinct("empId", { "serList.serId": ser.serId }, { empId: true });
                serTimeList = [];
                const startTime = ser.time;
                console.log(startTime);
                hour = startTime[0] + startTime[1]
                minute = startTime[3] + startTime[4]
                var st = moment({ hour: hour, minute: minute, seconds: 0 });
                let t = moment(st);
                serTimeList.push(t.add(-180, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                // console.log(serTimeList)
                let orderList = []
                let foundEmpId = null;
                let empFound = false;
                for (let eid of empIdList) {
                    const availOrderList = await OrderModel.findOne({ "empId": eid, service_date: ser.date, service_startTime: { $in: serTimeList },isActive : true })
                    // console.log(availOrderList)
                    if (availOrderList != null && availOrderList != "") {
                        orderList.push(availOrderList)
                    } else {
                        foundEmpId = eid;
                        empFound = true;
                        break;
                    }
                }

                if (empFound) {
                    let serRes = await ServiceModel.findById(ser.serId, { time: true, price: true });
                    // console.log(serRes);
                    let price = 0;
                    if (req.body.discount != "") {
                        price = serRes.price;
                    }
                    else {
                        price = serRes.price - req.body.discount;
                    }
                    let service_endTime = st.add(serRes.time, 'minute').format('HH:mm:ss');
                    var order = new OrderModel({
                        custId: req.body.custId,
                        serId: ser.serId,
                        orderId: orderId,
                        empId: foundEmpId,
                        booking_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
                        service_startTime: startTime,
                        service_endTime: service_endTime,
                        service_date: ser.date,
                        address: req.body.address,
                        payment_mode: req.body.payment_mode?? "Cash",
                        amount: price,
                        status: "assigned",
                        promocode: req.body.promocode?? null,
                    });
                    // console.log(order);
                    i++;
                    const newOrder = await order.save();
                    // console.log(newOrder)

                }

            }
            let responseAck = {}
            console.log(i)
            if (i == 0) {
                // console.log("employee not found")
                responseAck.serviceAssign = 0;
                responseAck.status = "employee not found"
                responseAck.code = 2
            }
            else if (i < serList.length) {
                // console.log("employee not found")
                const result = await OrderModel.deleteMany({orderId:orderId});
                responseAck.serviceAssign = i;
                responseAck.status = "ok"
                responseAck.code = 1; // some employee assigned
            } else {
                // console.log("employee assigned")
                responseAck.serviceAssign = i;
                responseAck.status = "success"
                responseAck.code = 0; //
            }
            res.json(responseAck);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    test: async (req, res) => {
        try {
            console.log(moment().unix());
            res.send("he;;pw");
        }
        catch (err) {
            res.send(err);
        }
    },
    getOrder: async (req, res) => {
        try {
            const order = await OrderModel.find({});
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await OrderModel.find({ orderId: req.body.orderId });
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    getOrderByCustId: async (req, res) => {

        try {

            const custId = req.body.custId;    
            const completedOrders = await OrderModel.aggregate(
                [
                    {$match:{custId:new mongoose.Types.ObjectId(custId),status: {$not : {$eq : "assigned"}}}},
                    {$sort: { service_date: -1 }},
                    
                    {$lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                      },
                    },
                    {$lookup: {
                        from: "employees",
                        localField: "empId",
                        foreignField: "_id",
                        as: "employeeDetails",
                      },
                    },
                    { $project: { 
                        _id: 1,
                        orderId:1,
                        serId:1,
                        empId:1,
                        custId:1,
                        status:1,
                        amount:1,
                        service_startTime:1,
                        service_endTime:1,
                        service_date:1,
                        payment_mode:1,
                        booking_datetime:1,
                        "serviceDetails.name":1,
                        "serviceDetails.price":1,
                        "serviceDetails.avgRating":1,
                        "serviceDetails.url":1,
                        "serviceDetails.url":1,
                        "employeeDetails.fname":1,
                        "employeeDetails.lname":1,
                        "employeeDetails.contact_no":1,
                        "employeeDetails.rating":1,
                       
                    } }

                ],
            )
            const pendingOrders = await OrderModel.aggregate(
                [
                    {$match:{custId:new mongoose.Types.ObjectId(custId),status: "assigned"}},
                    {$sort: { service_date: -1 }},
                    
                    {$lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                      },
                    },
                    {$lookup: {
                        from: "employees",
                        localField: "empId",
                        foreignField: "_id",
                        as: "employeeDetails",
                      },
                    },
                    { $project: { 
                        _id: 1,
                        orderId:1,
                        serId:1,
                        empId:1,
                        custId:1,
                        status:1,
                        amount:1,
                        service_startTime:1,
                        service_endTime:1,
                        service_date:1,
                        payment_mode:1,
                        booking_datetime:1,
                        "serviceDetails.name":1,
                        "serviceDetails.price":1,
                        "serviceDetails.avgRating":1,
                        "serviceDetails.url":1,
                        "serviceDetails.url":1,
                        "employeeDetails.fname":1,
                        "employeeDetails.lname":1,
                        "employeeDetails.contact_no":1,
                        "employeeDetails.rating":1,
                       
                    } }

                ],
            )
            console.log(completedOrders)
            res.json({completedOrders:completedOrders,pendingOrders:pendingOrders});
        }
        catch (err) {
            console.log(err)
            res.json({
                message: err
            });
        }
    },
    getOrderTodayByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;    
            const date = moment().format('YYYY-MM-DD');
            console.log(date)
            const pendingOrders = await OrderModel.aggregate(
                [
                    {$match:{empId:new mongoose.Types.ObjectId(empId),service_date : date,status: "assigned"}},
                    {$sort: { service_date: -1 }},
                    
                    {$lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                      },
                    },
                    {$lookup: {
                        from: "customers",
                        localField: "custId",
                        foreignField: "_id",
                        as: "customerDetails",
                      },
                    },
                    { $project: { 
                        _id: 1,
                        orderId:1,
                        serId:1,
                        empId:1,
                        custId:1,
                        status:1,
                        amount:1,
                        service_startTime:1,
                        service_endTime:1,
                        service_date:1,
                        payment_mode:1,
                        booking_datetime:1,
                        "serviceDetails.name":1,
                        "serviceDetails.price":1,
                        "serviceDetails.avgRating":1,
                        "serviceDetails.url":1,
                        "serviceDetails.url":1,
                        "customerDetails.fname":1,
                        "customerDetails.lname":1,
                        "customerDetails.contact_no":1,
                        "customerDetails.address":1,
                       
                    } }

                ],
            )
            console.log(pendingOrders)
            res.json({pendingOrders:pendingOrders});
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    getOrderUpcomingByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;    
            const date = moment().format('YYYY-MM-DD');
            console.log(date)
            const upcomingOrders = await OrderModel.aggregate(
                [
                    {$match:{empId:new mongoose.Types.ObjectId(empId),service_date: {$not : {$eq : date}},status: "assigned"}},
                    {$sort: { service_date: -1 }},
                    
                    {$lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                      },
                    },
                    {$lookup: {
                        from: "customers",
                        localField: "custId",
                        foreignField: "_id",
                        as: "customerDetails",
                      },
                    },
                    { $project: { 
                        _id: 1,
                        orderId:1,
                        serId:1,
                        empId:1,
                        custId:1,
                        status:1,
                        amount:1,
                        service_startTime:1,
                        service_endTime:1,
                        service_date:1,
                        payment_mode:1,
                        booking_datetime:1,
                        "serviceDetails.name":1,
                        "serviceDetails.price":1,
                        "serviceDetails.avgRating":1,
                        "serviceDetails.url":1,
                        "serviceDetails.url":1,
                        "customerDetails.fname":1,
                        "customerDetails.lname":1,
                        "customerDetails.contact_no":1,
                        "customerDetails.address":1,
                       
                    } }

                ],
            )
            // console.log(upcomingOrders)
            res.json({upcomingOrders:upcomingOrders});
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    getHistoryByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;    
            // const date = moment().format('YYYY-MM-DD');
            // console.log(date)
            const history = await OrderModel.aggregate(
                [
                    {$match:{empId:new mongoose.Types.ObjectId(empId),status: {$not : {$eq : "assigned"}}}},
                    {$sort: { service_date: -1 }},
                    
                    {$lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                      },
                    },
                    {$lookup: {
                        from: "customers",
                        localField: "custId",
                        foreignField: "_id",
                        as: "customerDetails",
                      },
                    },
                    { $project: { 
                        _id: 1,
                        orderId:1,
                        serId:1,
                        empId:1,
                        custId:1,
                        status:1,
                        amount:1,
                        service_startTime:1,
                        service_endTime:1,
                        service_date:1,
                        payment_mode:1,
                        booking_datetime:1,
                        "serviceDetails.name":1,
                        "serviceDetails.price":1,
                        "serviceDetails.avgRating":1,
                        "serviceDetails.url":1,
                        "serviceDetails.url":1,
                        "customerDetails.fname":1,
                        "customerDetails.lname":1,
                        "customerDetails.contact_no":1,
                        "customerDetails.address":1,
                       
                    } }

                ],
            )
            console.log(history)
            res.json({"history":history});
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    cancelOrder: async (req, res) => {

        const id = req.body.id;
        try {
            status = "cancelled";
            isActive = false;
            const order = await OrderModel.findByIdAndUpdate(id, { status ,isActive});
            res.json({"message" : true});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    updateOrder: async (req, res) => {

        const id = req.body.id;
        const { empId, serList, service_datetime, address, payment_mode, status, isActive } = req.body;

        try {
            const order = await OrderModel.findByIdAndUpdate(id, { empId, serList, service_datetime, address, payment_mode, status, isActive }, { new: true });
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    
    sendOTP: async (req, res) => {

        const id = req.body.orderId;
        const otp = Math.round(Math.random() * (987654 - 123456) + 123456);
        // console.log(otp)
        try {
            // const orderOLD = await OrderModel.find({"orderId" : id},{_id:true});
            // console.log(orderOLD);
            const order = await OrderModel.findByIdAndUpdate(id, { otp }, { new: false })
                .then(async () => {
                    const data = {}
                    const newOrder = await OrderModel.findById(id, { serId: true, custId: true, service_startTime: true });
                    const service = await ServiceModel.findById(newOrder.serId, { price: true, name: true });
                    const customer = await CustomerModel.findById(newOrder.custId, { email: true });
                    const responseAck = emailSender(customer.email ?? "tirthprajapati26@gmail.com", {
                        "name": service.name,
                        "price": service.price,
                        "startTime": newOrder.service_startTime,
                        "otp": otp
                    }).then(async () => {
                        console.log(responseAck);
                    });
                }).then(() => {
                    res.send("ok");
                }).catch(() => {
                    res.send("error");
                });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    deleteOrder: async (req, res) => {

        const id = req.body.id;
        try {
            const order = await OrderModel.findByIdAndDelete(id);
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    // Similar functions for updating and deleting empSer...
};
