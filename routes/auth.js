const express = require('express');
const router = express.Router();
const authentication = require("../middlewares/auth");
const { postAuth } = require("../controllers/auth");

router.post("/auth", authentication, postAuth);

module.exports = router;
