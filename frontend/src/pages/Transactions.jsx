import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useSelector((state) => state.auth);

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
    if (!user || user.isAdmin === true) {
      window.location.href = "/dashboard";
    }

    getTransactions();
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Transactions</title>
      </Helmet>
      <Header />

      {transactions.length > 0 ? (
        <table className="border-collapse w-full mx-8">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                From
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                To
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Transaction Amount
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Transaction Type
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Balance
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Transaction Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, key) => (
              <tr
                key={key}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    From
                  </span>
                  {transaction.account_id.name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    To
                  </span>
                  {transaction.transfer_to ? (
                    <td className="px-6 py-4">
                      {transaction.transfer_to.name}
                    </td>
                  ) : (
                    <td className="px-6 py-4">N/A</td>
                  )}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Transaction Amount
                  </span>
                  <span className="rounded py-1 px-3 text-xs font-bold">
                    {" "}
                    {transaction.transaction_amount}
                  </span>
                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Transaction Type
                  </span>
                  <span className="rounded py-1 px-3 text-xs font-bold">
                    {" "}
                    {transaction.transaction_type === "transfer" ? (
                      <span className="text-green-500">Transfer</span>
                    ) : (
                      <span className="text-red-500">Withdrawal</span>
                    )}
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Balance
                  </span>
                  <span className="rounded py-1 px-3 text-xs font-bold">
                    {" "}
                    {transaction.balance}
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Transaction Date
                  </span>
                  <span className="rounded py-1 px-3 text-xs font-bold">
                    {" "}
                    {moment(transaction.createdAt).format(
                      "DD/MM/YYYY hh:mm:ss"
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Transactions have been made</h1>
        </div>
      )}
    </>
  );
}

export default Transactions;
