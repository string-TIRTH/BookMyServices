const express = require("express");
const moment = require('moment-timezone');
const { ObjectId } = require('mongodb');
moment().tz("Asia/Kolkata").format();
const OrderModel = require("../models/OrderModel");
const ServiceModel = require("../models/ServiceModel");
const EmpSerModel = require("../models/EmployeeServiceModel");
const { default: mongoose } = require("mongoose");
const router = express.Router();


router.post("/createOrder", async (req, res) => {

    try {
        const order = new OrderModel({
            custId: req.body.custId,
            empId: req.body.empId,
            serList: req.body.serList,
            booking_datetime: req.body.booking_datetime,
            service_date: req.body.service_date,
            address: req.body.address,
            payment_mode: req.body.payment_mode,
            amount: req.body.amount,
            promocode: req.body.promocode,
        });
        /**
         * assign employee before creation.
        */

        // const empIdList = await EmpSerModel.find({serId:req.body.serId},{empId:true});
        // res.status(200).json(empIdList);
        // const availOrderList = await OrderModel.find({empId:empIdList.empId,service_datetime:$ne[req.body.service_datetime]})

        /*
         * amount calculation with discount(promocode)
         */
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
router.post("/test", async (req, res) => {

    try {
        var order = new OrderModel({
            custId: req.body.custId,
            serList: req.body.serList,
            booking_datetime: req.body.booking_datetime,
            service_startTime: req.body.service_time,
            service_date: req.body.service_date,
            address: req.body.address,
            payment_mode: req.body.payment_mode,
            amount: req.body.amount,
            promocode: req.body.promocode,
        });
        /**
         * assign employee before creation.
        */
        const serList = req.body.serList;
        var empIdList = await EmpSerModel.distinct("empId", { serId: { $in: [serList.serId] } }, { empId: true });
        var index = 0;
        var serLen = serList.length;
        var empIdIndex = 0;
        var notAssign = false;

        for (var ser of serList) {
            console.log("new 1")
            let list = [];
            for (i = 0; i < empIdList.length; i++) {
                const availOrderList = await OrderModel.find({ "serList.empId": empIdList[i], service_date: { $nin: req.body.service_date } })
                if (availOrderList != "") {
                    list.push(availOrderList);
                }
            }
            console.log(list);
            if (list != "") {
                let empId = list[0][0].serList[empIdIndex].empId;
                order.serList[index].empId = empId;
                var i = 0;
                for (i = 0; i < empIdList.length; i++) {
                    if (empIdList[i] == empId.toString()) {
                        empIdList[i] = null;
                        empIdIndex++;
                    }
                }
                index++;
            }

        }
        if (index < serLen) {
            notAssign = true;
        }
        var empIdList = await EmpSerModel.distinct("empId", { serId: { $in: [serList.serId] } }, { empId: true });
        if (notAssign) {
            console.log("hey12")
            const startTime = req.body.service_time;
            hour = startTime[0] + startTime[1]
            minute = startTime[3] + startTime[4]
            var st = moment({ hour: hour, minute: minute, seconds: 0 });
            var divisor = 0;
            for (let i = index; i < serLen; i++) {
                let serTimelist = []
                let t = moment(st);
                let serResult = await ServiceModel.find({ _id: serList[i].serId });
                serTimelist.push(t.add(-180, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                serTimelist.push(t.add(60, 'minute').format('hh:mm:ss'))
                let list = [];
                var empIdIndex = 0;
                console.log(serTimelist)
                for (i = 0; i < empIdList.length; i++) {
                    console.log("hey2")
                    const availOrderList = await OrderModel.findOne({ "serList.empId": empIdList[i], service_date: { $nin: req.body.service_date }, service_startTime: { $nin: [serTimelist].toString() } })
                    if (availOrderList != "" && availOrderList != null) {
                        list.push(availOrderList);
                    }
                    console.log(availOrderList)
                }
                console.log(list)
                var listLen = list.length;
                if (list != "" && list != null) {
                    console.log("hey in")
                    for (i = index; i < serLen; i++) {
                        let empId = list[listLen - 1].serList[empIdIndex].empId;
                        for (j = 0; j < empIdList.length; j++) {
                            if (empIdList[j] == empId.toString()) {
                                order.serList[empIdIndex].empId = empId;
                                empIdIndex++;
                                empIdList[j] = null;
                                notAssign = false;
                            }
                        }
                    }
                    listLen--;
                }
            }
        }

        if (notAssign && empIdIndex < serLen) {
            console.log("hey123")
            const availOrderList = await OrderModel.findOne({ "serList.empId": empIdList[i], service_date: { $nin: req.body.service_date } })
            if (false) {
                console.log(false)
                notAssign = true;
            }
            else {
                for (i = index; i < serLen; i++) {
                    for (j = 0; j < empIdList.length; j++) {
                        if (empIdList[j] != null) {
                            order.serList[empIdIndex].empId = empIdList[j];
                            empIdIndex++;
                            empIdList[j] = null;
                            notAssign = false;
                        }
                    }
                }
            }
        }
        if (empIdIndex < serLen) {
            notAssign = true;
        }
        // empID is found 
        /*
         * amount calculation with discount(promocode)
         */
        var totalAmt = 0;
        for (var service of serList) {
            const result = await ServiceModel.find({ _id: service.serId });

            if (result)
                totalAmt += parseInt(result[0].price);
        }


        // total found 

        // discount counting;

        order.amount = totalAmt - req.body.discount;
        const startTime = req.body.service_time;
        // console.log(moment(startTime).format('hh:mm:ss'))
        hour = startTime[0] + startTime[1]
        minute = startTime[3] + startTime[4]
        var st = moment({ hour: hour, minute: minute, seconds: 0 });


        var i = 0;
        var m = st;
        for (var service of serList) {
            const result = await ServiceModel.find({ _id: service.serId });

            if (result) {
                // console.log(result[0].time)
                let t = st
                order.serList[i].endTime = t.add(result[0].time, 'minute').format('hh:mm:ss-a');
                m = moment.max(m, t);
                i++;
            }
        }
        if (notAssign) {
            res.json("employee not available")
        } else {
            order.service_endTime = m.format('hh:mm:ss-a')
            const newOrder = await order.save();
            res.json(newOrder);
        }

    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/test2", async (req, res) => {

    try {
        var order = new OrderModel({
            custId: req.body.custId,
            serList: req.body.serList,
            booking_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
            service_startTime: req.body.service_time,
            service_date: req.body.service_date,
            address: req.body.address,
            payment_mode: req.body.payment_mode,
            amount: req.body.amount,
            promocode: req.body.promocode,
        });
        const serList = req.body.serList;
        var empIdList = await EmpSerModel.distinct("empId", { serId: { $in: [serList.serId] } }, { empId: true });

        serTimeList = [];
        const startTime = req.body.service_time;
        hour = startTime[0] + startTime[1]
        minute = startTime[3] + startTime[4]
        var st = moment({ hour: hour, minute: minute, seconds: 0 });
        let t = moment(st);
        serTimeList.push(t.add(-180, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        serTimeList.push(t.add(60, 'minute').format('hh:mm:ss'))
        console.log(serTimeList)
        let orderList = []
        let validEmpList = []
        for (let eid of empIdList) {
            const availOrderList = await OrderModel.findOne({ "serList.empId": eid, service_date: { $in: req.body.service_date }, service_startTime: { $in: serTimeList } })
            if (availOrderList != null && availOrderList != "") {
                orderList.push(availOrderList)
            } else {
                validEmpList.push(eid)
            }
        }
        let responseAck = {};
        let i = 0
        for (i = 0; i < serList.length; i++) {
            if (validEmpList.length != 0)
                order.serList[i].empId = validEmpList.pop();
            else {
                if (i == 0) {
                    responseAck.serviceAssign = 0;
                    responseAck.status = "employee not available"
                    responseAck.code = 2; // 0 employee available
                }
                else {
                    responseAck.serviceAssign = i + 1;
                    responseAck.status = "ok"
                    responseAck.code = 1; // some employee assigned
                }
                break;
            }
        }
        var totalAmt = 0;
        for (var service of serList) {
            const result = await ServiceModel.find({ _id: service.serId });

            if (result)
                totalAmt += parseInt(result[0].price);
        }
        // total found 

        // discount counting;

        order.amount = totalAmt - req.body.discount;

        // console.log(orderList);
        // res.json(validEmpList);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
router.post("/test3", async (req, res) => {

    try {
        const serList = req.body.serList;
        let temp=[];
        const serDate = req.body.service_date;
        let i=0;
        for (let ser of serList) {
            let empIdList = await EmpSerModel.distinct("empId", { "serList.serId": ser.serId }, { empId: true });
            serTimeList = [];
            const startTime = req.body.service_time;
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
                const availOrderList = await OrderModel.findOne({"empId": eid, service_date: serDate, service_startTime: {$in :serTimeList}})
                console.log(availOrderList)
                if (availOrderList != null && availOrderList != "") {
                    orderList.push(availOrderList)
                }else {
                    foundEmpId = eid;
                    empFound = true;
                    break;
                }
            }

            if(empFound){
                let serRes = await ServiceModel.findById(ser.serId,{time:true,price:true});
                console.log(serRes);
                let price = 0;
                if(req.body.discount != ""){
                    price = serRes.price;
                }
                else{
                    price = serRes.price - req.body.discount;
                }
                let service_endTime = st.add(serRes.time,'minute').format('HH:mm:ss');
                var order = new OrderModel({
                    custId: req.body.custId,
                    serId: ser.serId,
                    empId : foundEmpId,
                    booking_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
                    service_startTime: req.body.service_time,
                    service_endTime: service_endTime,
                    service_date: req.body.service_date,
                    address: req.body.address,
                    payment_mode: req.body.payment_mode,
                    amount: price,
                    status: "assigned",
                    promocode: req.body.promocode,
                });
                // console.log(order);
                i++;
                const newOrder = await order.save();
                console.log(newOrder)

            }

        }
        let responseAck = {}
        console.log(i)
        if(i == 0){
            console.log("employee not found")
            responseAck.serviceAssign = 0;
            responseAck.status = "employee not found"
            responseAck.code = 2
        }
        else if(i < serList.length){
            console.log("employee not found")
            responseAck.serviceAssign = i;
            responseAck.status = "ok"
            responseAck.code = 1; // some employee assigned
        }else{
            console.log("employee assigned")
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
});
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

router.post("/getOrderById", async (req, res) => {

    try {
        const order = await OrderModel.find({ _id: req.body.orderId });
        res.json(order);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

// router.post("/placeOrder", async(req,res)=>{
//     try{
//         const order = await OrderModel.find({custId:req.body.custId});
//         res.json(order);
//     }catch(err){
//         res.json({
//             message: err
//         });
//     }
// });

router.post("/getOrderByCustId", async (req, res) => {

    try {
        const order = await OrderModel.find({ custId: req.body.custId });
        res.json(order);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/getOrderByEmpId", async (req, res) => {

    try {
        const order = await OrderModel.find({ empId: req.body.empId });
        res.json(order);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
router.post("/updateOrder", async (req, res) => {

    const id = req.body.id;
    const { empId, serList, service_datetime, address, payment_mode, status, isActive } = req.body;

    try {
        const order = await OrderModel.findByIdAndUpdate(id, { empId, serList, service_datetime, address, payment_mode, status, isActive }, { new: true });
        res.send(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deleteOrder", async (req, res) => {

    const id = req.body.id;
    try {
        const order = await OrderModel.findByIdAndDelete(id);
        res.send(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router