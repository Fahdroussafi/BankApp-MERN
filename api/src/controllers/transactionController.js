const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private

const createTransaction = asyncHandler(async (req, res) => {
  const { account_id, transaction_amount, transaction_type, transfer_to } =
    req.body;

  const account = await Account.findById(account_id);

  if (account) {
    if (transaction_type === "deposit") {
      account.balance =
        parseInt(account.balance) + parseInt(transaction_amount);
    } else if (transaction_type === "withdrawal") {
      account.balance =
        parseInt(account.balance) - parseInt(transaction_amount);
      if (account.balance < 0) {
        res.status(400);
        throw new Error("Insufficient funds");
      }
    } else if (transaction_type === "transfer") {
      account.balance =
        parseInt(account.balance) - parseInt(transaction_amount);

      if (account.balance < 0) {
        res.status(400);
        throw new Error("Insufficient funds");
      }

      const transferToAccount = await Account.findById(req.body.transfer_to);
      if (transferToAccount) {
        transferToAccount.balance =
          parseInt(transferToAccount.balance) + parseInt(transaction_amount);
        await transferToAccount.save();
      } else {
        res.status(404);
        throw new Error("Account not found");
      }
    }

    await account.save();

    const transaction = new Transaction({
      user_id: req.user.id,
      account_id,
      transaction_amount,
      transaction_type,
      transfer_to: transfer_to,
      balance: account.balance,
    });

    const createdTransaction = await transaction.save();

    res.status(201).json(createdTransaction);
  } else {
    res.status(404);
    throw new Error("Account not found");
  }
});

// get all transactions for a user
// GET /api/transactions/get-transactions
// @access  Private

const getTransactions = asyncHandler(async (req, res) => {
  // show all the transactions by user and also account _id informations from account table
  const transactions = await Transaction.find({
    user_id: req.user.id,
  })
    .populate({
      path: "account_id",
      select: "name",
      model: Account,
      options: { strictPopulate: false },
    })
    .populate({
      path: "transfer_to",
      select: "name",
      model: Account,
      options: { strictPopulate: false },
    });

  res.json(transactions);
});

module.exports = { createTransaction, getTransactions };
