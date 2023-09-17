const express = require('express')
const app = express()

var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const multer = require('multer');
const custRouter = require('./router/customerRouter')
const empRouter = require('./router/employeeRouter')
const empSerRouter = require('./router/employeeServiceRouter')
const feedbackRouter = require('./router/feedbackRouter')
const promocodeRouter = require('./router/promocodeRouter')
const serviceRouter = require('./router/serviceRouter')
const orderRouter = require('./router/orderRouter')

app.set('view engine', 'pug');
app.use(express.json());
TZ = 'Asia/Calcutta';
app.use(fileUpload());
// const upload = multer()
// app.use(upload.array()); 
app.use(express.static('public'));

// app.set('views', './views');
// app.use(multer().array())

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://bookmyservicesone:Ce109Ce114@cluster0.rg4p8ay.mongodb.net/bookMyServices?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



const url = "mongodb://127.0.0.1:27017/bookmyservices";
// const url = "mongodb+srv://bookmyservicesone:Ce109Ce114@bookmyservices.neharrl.mongodb.net/";
mongoose.connect(url).then(()=>{
    console.log("Connected to DB")
    app.listen(5000,()=>{
        console.log("port 5000");
    })
}).catch((err)=>{
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
   extended: true 
}));
app.use("/customer",custRouter)
app.use("/employee",empRouter)
app.use("/empser",empSerRouter)
app.use("/feedback",feedbackRouter)
app.use("/promocode",promocodeRouter)
app.use("/service",serviceRouter)
app.use("/order",orderRouter)