const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-transaction", protect, createTransaction);
router.get("/get-transactions", protect, getTransactions);

module.exports = router;
