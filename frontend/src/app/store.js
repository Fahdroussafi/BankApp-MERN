import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountReducer from "../features/accounts/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
  },
});
