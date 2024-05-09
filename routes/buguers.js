const express = require("express");
const router = express.Router();
const uploadImage = require('../middlewares/upload');
const {
    getBurguers,
    getBurguersId,
    postBurguersId,
    putBurguersId,
    deleteBurguersId
  } = require("../controllers/burguers");
  
  router.get("/burguers", getBurguers);
  router.get("/burguers/:id", getBurguersId);
  router.post("/burguers/:id", uploadImage, postBurguersId);
  router.put("/burguers/:id", uploadImage, putBurguersId);
  router.delete("/burguers/:id", deleteBurguersId);
  

module.exports = router;
