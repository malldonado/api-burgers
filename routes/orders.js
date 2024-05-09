const express = require("express");
const router = express.Router();
const {
    getOrders,
    postOrders,
    putOrdersId,
    deleteOrdersId
  } = require("../controllers/orders");
  
router.get("/orders", getOrders);
router.post("/orders", postOrders);
router.put("/orders/:id", putOrdersId);
router.delete("/orders/:id", deleteOrdersId);

module.exports = router;