const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController")

router.post('/createService',serviceController.createService);

router.post("/getService",serviceController.getService);


router.post("/getServiceById", serviceController.getServiceById);

router.post("/updateService", serviceController.updateService );

router.post("/deleteService", serviceController.deleteService );





module.exports = router