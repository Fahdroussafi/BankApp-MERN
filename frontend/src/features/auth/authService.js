import axios from "axios";

const API_URL = "/api/auth/";

// Register user
const register = async (userData) => {
  const date = new Date();
  const response = await axios.post(
    "http://localhost:8080/api/auth/create-user",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("token_date", date.getTime());
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const date = new Date();
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("token_date", date.getTime());
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
