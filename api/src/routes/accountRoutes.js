const express = require("express");
const router = express.Router();
const {
  getAccounts,
  setAccount,
  updateAccount,
  deleteAccount,
  getAllAccounts,
} = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-account", protect, setAccount);
router.get("/get-accounts", protect, getAccounts);
router.get("/get-all-accounts", getAllAccounts);
router.delete("/delete-account/:id", protect, deleteAccount);
router.put("/update-account/:id", protect, updateAccount);

module.exports = router;
