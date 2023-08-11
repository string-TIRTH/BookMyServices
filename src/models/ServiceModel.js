const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  name :{
     type : String,
     required : true,
  },
  price :{
     type : String,
     required : true,
  },
  time :{
     type : String,
     required : true,
  },
  avgRating :{
     type : String,
     default : "Not Rated"
  }, 
  desc :{
     type : String,
     default : "Not Specified"
  },
  isActive :{
     type : Boolean,
     default : true
  },
})



const ServiceModel = mongoose.model('service',ServiceSchema)
module.exports = ServiceModel