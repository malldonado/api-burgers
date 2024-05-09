const express = require('express');
const router = express.Router();
const {
    getStatus,
    postStatus,
    putStatusId,
    deleteStatusId
  } = require("../controllers/status");
  
router.get("/status", getStatus);
router.post("/status", postStatus);
router.put("/status/:id", putStatusId);
router.delete("/status", deleteStatusId);

module.exports = router;