const express = require("express");
const router = express.Router();
const uploadImage = require('../middlewares/upload');
const {
    getMenu,
    postMenu,
    putMenuId,
    deleteMenuId
  } = require("../controllers/menu");
  
router.get("/menu", getMenu);
router.post("/menu", uploadImage, postMenu);
router.put("/menu/:id", uploadImage, putMenuId);
router.delete("/menu/:id", deleteMenuId);

module.exports = router;