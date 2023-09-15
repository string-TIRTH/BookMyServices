const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const moment = require('moment-timezone');
const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});
moment().tz("Asia/Kolkata").format();
const AddressSchema = new mongoose.Schema({
   house_no :{
      type : String,
      required : true,
   },
   society_name :{
      type : String,
      required : true,
   },
   landmark :{
      type : String
   }, 
   city :{
      type : String
   },
   pincode :{
      type : String,
      required : true,
   },
   lat :{
      type : String,
      required : true,
   },
   lng :{
      type : String,
      required : true,
   },
 })
const OrderSchema = new mongoose.Schema({
  
    orderId :{
      type : mongoose.Schema.Types.ObjectId, 
      require : true
    },
    custId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'customer',
        required : true,
    },
    serId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'service',
        required : true,
    },
    empId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'employee',
        default: null
    },
    qty :{
      type : Number, 
      default : 1,
      },
    endTime :{
      type : String, 
      default : moment().format("hh:mm:ss")
    },
    isActive : {
      type : Boolean,
      default : true
    },
    booking_datetime:{
      type : String,
      default : moment().format("YYYY-MM-DD hh:mm:ss")
    },
    service_date:{
      type : String,
      default : moment().format("YYYY-MM-DD")
    },
    service_startTime:{
      type : String,
      default : moment().format("hh:mm:ss")
    },
    service_endTime:{
      type : String,
      default : moment().format("hh:mm:ss")
    },
    address : {
      type : AddressSchema,
      required : true
    },
    payment_mode:{
      type: String,
      default : "Cash"
    },
    amount:{
        type : String,
        default : 0
    },
    status:{
        type: String,
        default : "Not Assigned"
    },
    promo_code:{
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'promocode'
     },
    isActive : {
        type : Boolean,
        default : true
    }
})



const OrderModel = mongoose.model('order',OrderSchema)
module.exports = OrderModel