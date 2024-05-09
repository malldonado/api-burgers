const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const uploadImage = require("../middlewares/upload");
const {
  getUsers,
  postUsers,
  getUsersId,
  deleteUsersId,
  putUsersId,
} = require("../controllers/users");

router.get("/users", authentication, getUsers);
router.post("/users", authentication, uploadImage, postUsers);
router.get("/users/:id", authentication, getUsersId);
router.delete("/users/:id", authentication, deleteUsersId);
router.put("/users/:id", authentication, uploadImage, putUsersId);

module.exports = router;
