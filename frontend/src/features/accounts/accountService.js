import axios from "axios";

const API_URL = "/api/accounts/";

// Create account
const createAccount = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "create-account",
    accountData,
    config
  );
  return response.data;
};

// Get account
const getAccount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "get-accounts", config);
  return response.data;
};

// Delete user account
const deleteAccount = async (accountId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/delete-account/" + accountId,
    config
  );

  return response.data;
};

const accountService = {
  createAccount,
  getAccount,
  deleteAccount,
};

export default accountService;
