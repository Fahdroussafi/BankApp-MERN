import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.get("/api/users/get-all-users", config);
      const filteredUsers = response.data.filter(
        (user) => user.isAdmin !== true
      );
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Created At
          </th>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-70">
          {users.map((user) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {moment(user.createdAt).format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
