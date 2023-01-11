const express = require("express");
const router = express.Router();
const {
  getAccounts,
  setAccount,
  deleteAccount,
  getAllAccounts,
} = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-account", protect, setAccount);
router.get("/get-accounts", protect, getAccounts);
router.get("/get-all-accounts", getAllAccounts);
router.delete("/delete-account/:id", protect, deleteAccount);

module.exports = router;
