const AddOnModel = require('../models/AddOnModel');
const ServiceModel = require('../models/ServiceModel');

module.exports = {
  getAllItems: async (req, res) => {
    try {
      const addOns = await AddOnModel.find({});
      res.status(200).json(addOns);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAddOnById: async (req, res) => {
    const addonId = req.body._id;
    // console.log(req.body)

    try {
      const addOns = await AddOnModel.findById(addonId);
      res.status(200).json(addOns);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAddOnBySerId: async (req, res) => {
    const addOnSerId = req.body._id;
    // console.log(req.body)

    try {
      const addOns = await AddOnModel.findById(addOnSerId);
    
      res.status(200).json(addOns);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  addAddOns: async(req,res)=>{
    const serId  = req.body.serId;
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const addOnRecord = {
        "name":name,
        "price":price,
        "desc":desc
    }
    try {
        ser = await ServiceModel.findById(serId);
        let ResposeAck = {
            message : false
        };
        console.log(ser)
        if(ser != null){
            addOn = await AddOnModel.findOne({"serId":serId},{addOnList:true,_id:true})
            if(addOn != null && addOn != ""){
                const _id = addOn._id;
                console.log(addOn.addOnList)
            
                const items = addOn.addOnList;
                console.log(items+"here")
                items.push(addOnRecord);
                addOn.addAddList = items;
                newAddOn = await AddOnModel.findByIdAndUpdate(_id,addOn);

            }else{
                const addOn = new AddOnModel({
                    serId:serId,
                    addOnList : addOnRecord
                });
                newAddOn = await addOn.save();
            }
            ResposeAck = {
                message : true
            }
        }else{
            console.log("not found")
        }
        res.json(ResposeAck)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  }
};
