const express = require("express");
const router = express.Router();
const {
  getAccounts,
  setAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-account", protect, setAccount);
router.get("/get-accounts", protect, getAccounts);
router.delete("/delete-account/:id", protect, deleteAccount);
router.put("/update-account/:id", protect, updateAccount);

module.exports = router;
