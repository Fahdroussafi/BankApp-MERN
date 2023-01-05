const express = require("express");
const router = express();
const {
  CreateUser,
  LoginUser,
  GetUserById,
} = require("../Controllers/authController");

router.post("/create-user", CreateUser);
router.post("/login", LoginUser);
router.get("/get-user-by-id/:id", GetUserById);

module.exports = router;
