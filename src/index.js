const express = require('express')
const app = express()
const mongoose = require('mongoose')
const custRouter = require('./router/customerRouter')
const empRouter = require('./router/employeeRouter')
const empSerRouter = require('./router/employeeServiceRouter')
const feedbackRouter = require('./router/feedbackRouter')
const promocodeRouter = require('./router/promocodeRouter')
const serviceRouter = require('./router/serviceRouter')
const orderRouter = require('./router/orderRouter')
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/bookmyservices";
mongoose.connect(url).then(()=>{
    console.log("Connected to DB")
    app.listen(5000,()=>{
        console.log("port 5000");
    })
}).catch((err)=>{
    console.log(err);
});


app.use("/customer",custRouter)
app.use("/employee",empRouter)
app.use("/empser",empSerRouter)
app.use("/feedback",feedbackRouter)
app.use("/promocode",promocodeRouter)
app.use("/service",serviceRouter)
app.use("/order",orderRouter)
