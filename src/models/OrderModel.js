const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
   address_id :{
      type : String,
      required : true,
   },
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
  
    custId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'customer',
        required : true,
    },
    empId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'employee'
    },
    serList :[
      {
        serId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'service',
        required : true,
        },
        isActive : {
          type : Boolean,
          default : true
        }
      } 
    ],
    booking_datetime:{
        type : Date,
        default : Date.now()
    },
    service_datetime:{
        type : Date,
        default : Date.now()
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