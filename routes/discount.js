const express = require("express");
const router = express.Router();
const {
    getDiscount,
    postDiscount,
    putDiscountId,
    deleteDiscountId
  } = require("../controllers/discount");
  
router.get("/discount", getDiscount);
router.post("/discount", postDiscount);
router.put("/discount/:id", putDiscountId);
router.delete("/discount/:id", deleteDiscountId);

module.exports = router;