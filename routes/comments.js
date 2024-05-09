const express = require("express");
const router = express.Router();
const {
    getComments,
    getCommentsId,
    postComments,
    putCommentsId,
    deleteCommentsId
  } = require("../controllers/comments");
  
router.get("/comments", getComments);
router.get("/comments/:id", getCommentsId);
router.post("/comments", postComments);
router.put("/comments/:id", putCommentsId);
router.delete("/comments/:id", deleteCommentsId);

module.exports = router;