import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reduces/Auth_reducer/authSlice";


export const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
