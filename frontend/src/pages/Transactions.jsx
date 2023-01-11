import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/api/transactions/get-transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTransactions(response.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
              To
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Type
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Date
            </th>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-70">
            {transactions.map((transaction, key) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={key}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.account_id.name}
                </th>
                {transaction.transfer_to ? (
                  <td className="px-6 py-4">{transaction.transfer_to.name}</td>
                ) : (
                  <td className="px-6 py-4">N/A</td>
                )}
                <td className="px-6 py-4">{transaction.transaction_amount}</td>
                <td className="px-6 py-4">{transaction.transaction_type}</td>
                <td className="px-6 py-4">{transaction.balance}</td>
                <td className="px-6 py-4">
                  {moment(transaction.createdAt).format("DD/MM/YYYY hh:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ;
    </>
  );
}

export default Transactions;
