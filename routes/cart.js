const express = require("express");
const router = express.Router();
const {
    getCart,
    postCart,
    putCartId,
    deleteCartId
  } = require("../controllers/cart");
  
  router.get("/cart", getCart);
  router.post("/cart", postCart);
  router.put("/cart/:id", putCartId);
  router.delete("/cart/:id", deleteCartId);
  

module.exports = router;
