import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";
import { deleteAccount } from "../features/accounts/accountSlice";
import { toast } from "react-toastify";
import axios from "axios";
import ATM from "../assets/ATM.jpg";

function AccountItem({ account }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [accountBalance, setAccountBalance] = useState(account.balance);

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
      if (accountBalance) {
        setAccountBalance(accountBalance - amount);
        setAmount(0);
      }
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
      if (accountBalance) {
        setAccountBalance(accountBalance - amount);
        setAmount(0);
      }
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
    <div className="card lg:card-side">
      <figure>
        <img src={ATM} className="rounded-full" alt="credit du maroc" />
      </figure>

      <div className="card-body">
        <div className="from-gray-50 to-blue-500 bg-gradient-to-r shadow-xl mx-0 my-3 px-0 py-10 relative rounded-[10px]">
          <h2 className="font-bold text-center text-black">
            Account name:{" "}
            <span className="text-base font-light mb-2">{account.name}</span>
          </h2>
          <h2 className="font-bold text-center text-black">
            Account balance:{" "}
            <span className="text-base font-light mb-2">
              {/* {accountBalance ? accountBalance : account.balance} MAD */}
              {accountBalance} MAD
            </span>
          </h2>

          <div className="flex justify-center gap-3">
            <label htmlFor="my-modal-delete" className="btn btn-error">
              Delete Account
            </label>

            <input
              type="checkbox"
              id="my-modal-delete"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative bg-white">
                <label
                  htmlFor="my-modal-delete"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <p className="py-4">
                  <span className="font-bold text-center block text-black">
                    Are you sure you want to delete this account?
                  </span>
                </p>
                <div className="modal-action">
                  <label
                    htmlFor="my-modal-delete"
                    className="btn btn-error"
                    onClick={() => dispatch(deleteAccount(account._id))}
                  >
                    Yes
                  </label>
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="input-group">
                <span>Amount</span>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="input input-bordered"
                />
                <span>MAD</span>
              </label>
            </div>

            {amount > account.balance || amount <= 0 ? (
              <label
                htmlFor="my-modal-withdraw"
                className="btn btn-success"
                disabled
              >
                Withdraw
              </label>
            ) : (
              <label htmlFor="my-modal-withdraw" className="btn btn-success">
                Withdraw
              </label>
            )}
            <input
              type="checkbox"
              id="my-modal-withdraw"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box bg-white">
                <p className="py-4">
                  <span className="text-black font-bold text-center block">
                    Are you sure you want to withdraw {amount} MAD from your
                    account?
                  </span>
                </p>
                <label
                  htmlFor="my-modal-withdraw"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <div className="modal-action">
                  <label
                    htmlFor="my-modal-withdraw"
                    className="btn btn-success"
                    onClick={withdrawHandler}
                  >
                    Withdraw
                  </label>
                </div>
              </div>
            </div>
            {amount > account.balance || amount <= 0 ? (
              <label
                htmlFor="my-modal-transfer"
                className="btn btn-warning"
                disabled
              >
                Transfer
              </label>
            ) : (
              <label htmlFor="my-modal-transfer" className="btn btn-warning">
                Transfer
              </label>
            )}
            <input
              type="checkbox"
              id="my-modal-transfer"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box bg-white">
                <p className="py-4">
                  <span className="text-black font-bold text-center block">
                    Are you sure you want to transfer {amount} MAD from your
                    account to another account?
                  </span>
                </p>
                <label
                  htmlFor="my-modal-transfer"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <div className="modal-action">
                  <label
                    htmlFor="my-modal-transfer"
                    className="btn btn-warning"
                    onClick={transferHandler}
                  >
                    Transfer to
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <select
                className="select w-full max-w-xs m-2 block px-3 py-1.5 text-base font-normal text-white "
                id="transfer_to"
              >
                <option value="">Choose Account to transfer to</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;
