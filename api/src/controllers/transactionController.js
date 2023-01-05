const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// create a new transaction for a user
// POST /api/transactions

const createTransaction = asyncHandler(async (req, res) => {
  const { account_id, transaction_amount, transaction_type } = req.body;

  const account = await Account.findById(account_id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  //Check for User
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transaction = await Transaction.create({
    user_id: req.user.id,
    account_id: account_id,
    transaction_date: Date.now(),
    transaction_amount: transaction_amount,
    transaction_type: transaction_type,
    balance: account.amount,
  });

  if (transaction_type === "deposit") {
    account.amount = parseInt(account.amount) + parseInt(transaction_amount);
  } else if (transaction_type === "withdrawal") {
    account.amount = parseInt(account.amount) - parseInt(transaction_amount);
  }
  balance = account.amount;

  // if the withdrawal amount is greater than the account balance, throw an error
  if (account.amount < 0) {
    res.status(400);
    throw new Error("Insufficient funds");
  }

  await account.save();

  res.status(200).json(transaction);
});

// get all transactions for a user
// GET /api/transactions

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user_id: req.user.id });

  res.status(200).json(transactions);
});

module.exports = { createTransaction, getTransactions };
