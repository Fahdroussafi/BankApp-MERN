import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";
import { deleteAccount } from "../features/accounts/accountSlice";
import { toast } from "react-toastify";
import axios from "axios";

function AccountItem({ account }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);

  const withdrawHandler = () => {
    dispatch(
      createTransaction({
        transaction_amount: amount,
        transaction_type: "withdrawal",
        account_id: account._id,
      })
    );
    if (amount > account.balance) {
      toast.error("You don't have enough money in your account to withdraw ");
    } else if (amount <= 0) {
      toast.error("Amount must be greater than 0");
    } else {
      toast.success("Withdrawal successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const transferHandler = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/transactions/create-transaction",
      {
        transaction_amount: amount,
        transaction_type: "transfer",
        account_id: account._id,
        transfer_to: document.getElementById("transfer_to").value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (amount > account.balance) {
      toast.error("You don't have enough money in your account to withdraw ");
    } else if (amount <= 0) {
      toast.error("Amount must be greater than 0");
    } else {
      toast.success("Transfer successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(
        "http://localhost:8080/api/accounts/get-all-accounts",
        config
      );

      // filter the current account from the select options

      const filteredAccounts = res.data.filter(
        (accountItem) => accountItem._id !== account._id
      );
      setAccounts(filteredAccounts);
    };
    fetchAccounts();
  }, [dispatch, account._id]);

  return (
    <div className="account bg-gray-300 mx-0 my-3 px-0 py-10 relative rounded-[10px]">
      <h2 className="font-bold text-center">
        Account name:{" "}
        <span className="text-base font-light mb-2">{account.name}</span>
      </h2>
      <h2 className="font-bold text-center">
        Account balance:{" "}
        <span className="text-base font-light mb-2">{account.balance} DH </span>
      </h2>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch(deleteAccount(account._id))}
          className="close inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Delete Account
        </button>
        <input
          className="account-input border-solid border py-1 px-2 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          onClick={withdrawHandler}
        >
          Withdraw
        </button>
        <button
          className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
          onClick={transferHandler}
        >
          Transfer to
        </button>
      </div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <select
            className="m-2 block w-full px-3 py-1.5 text-base font-normaltext-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="transfer_to"
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;
