import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login", async ({ email, password, remember }) => {
  const response = await axios.post("http://localhost:3001/api/v1/user/login", {
    email,
    password
  });
  const payload = {
    ...response.data.body,
    remember
  }
  return payload;
});