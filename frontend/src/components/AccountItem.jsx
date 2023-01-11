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
      toast.error("You don't have enough money in your account");
    } else {
      toast.success("Withdrawal successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const depositHandler = () => {
    dispatch(
      createTransaction({
        transaction_amount: amount,
        transaction_type: "deposit",
        account_id: account._id,
      })
    );
    toast.success("Deposit successful");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const transferHandler = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
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
    if (response.data.error) {
      toast.error(response.data.error);
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
  }, [dispatch]);

  return (
    <div className="account">
      <h2>
        Account name: <span className="account-title-span">{account.name}</span>
      </h2>
      <h2>
        Account balance:
        <span className="account-title-span">{account.balance} DH </span>
      </h2>
      <h2 className="account-id">
        Account ID: <span className="account-id-2">{account._id}</span>
      </h2>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch(deleteAccount(account._id))}
          className="close bg-red-600 hover:bg-red-700 hover:duration-300 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete Account
        </button>
        <input
          className="account-input"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-orange-600 hover:bg-orange-700 hover:duration-300 text-white font-bold py-2 px-4 rounded-full"
          onClick={withdrawHandler}
        >
          Withdraw
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 hover:duration-300 text-white font-bold py-2 px-4 rounded-full"
          onClick={depositHandler}
        >
          Deposit
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 hover:duration-300 text-white font-bold py-2 px-4 rounded-full"
          onClick={transferHandler}
        >
          Transfer to
        </button>
      </div>

      <select className="w-72 m-2" id="transfer_to">
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account._id} value={account._id}>
            {account.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AccountItem;
