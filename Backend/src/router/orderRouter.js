const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


router.post("/createOrder", orderController.createOrder);
router.post("/checkAvailability", orderController.checkAvailability);

router.post("/getOrder", orderController.getOrder);
router.post("/getOrderById", orderController.getOrderById);
router.post("/getOrderByCustId", orderController.getOrderByCustId);
router.post("/getOrderByEmpId", orderController.getOrderByEmpId);
router.post("/updateOrder", orderController.updateOrder);
router.post("/deleteOrder", orderController.deleteOrder);
router.post("/test", orderController.test);

// router.post("/test", async (req, res) => {

//     try {
//         let orderId = new mongoose.Types.ObjectId();
//         res.json(orderId);
//     }
//     catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

module.exports = router