import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk("getProfile", async ({ token }) => {
  const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
  });
  const payload = response.data.body;
  return payload;
});

export const updateProfile = createAsyncThunk("updateProfile", async ({ token, userName }) => {
  const response = await axios.put('http://localhost:3001/api/v1/user/profile', {userName}, {
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
  });
  const payload = response.data.body;
  return payload;
});