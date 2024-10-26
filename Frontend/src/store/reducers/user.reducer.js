import { createSlice } from "@reduxjs/toolkit";

import { getProfile, updateProfile } from "./../actions/user.action";

const initialState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  userName: null,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) =>({
      ...state,
      username: action.payload.username,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => initialState);
    builder.addCase(getProfile.fulfilled, (state, action) => action.payload);
    builder.addCase(getProfile.rejected, (state, action) => {
      console.error("Erreur lors de la récupération du profil de l'utilisateur.")
    });
    builder.addCase(updateProfile.pending, (state, action) => initialState);
    builder.addCase(updateProfile.fulfilled, (state, action) => action.payload);
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.error("Erreur lors de la modification du profil de l'utilisateur.")
    });
  }
});

export const { setUsername } = user.actions;
export default user.reducer;