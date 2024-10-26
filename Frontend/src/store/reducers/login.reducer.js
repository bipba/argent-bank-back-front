import { createSlice } from "@reduxjs/toolkit";
import { login } from "./../actions/login.action";

const initialState = {
  isLogged: !!localStorage.getItem("token"),  
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "token",
  initialState,
  reducers: {
    logout (state, action) {
      state.token = null;
      state.isLogged = false;
      localStorage.removeItem("token");
      // rénitialise la valeur de userName après une déconnexion
      state.userReducer.userName = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLogged = false;
      state.loading = true;
      state.error = null;
      state.token = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogged = true;
      action.payload.remember && localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.error(action.error.message);
      state.loading = false;
      state.error = "Le mot de passe ou l'email est incorrect.";
    });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;