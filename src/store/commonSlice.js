import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    access_token: "",
    userID: "",
    userName: "",
  },
  reducers: {
    userData: (state, action) => {
      state.access_token = action.payload.token;
      state.userID = action.payload.user.id;
      state.userName = action.payload.user.name;
    },
  },
});

export const { userData } = commonSlice.actions;
export default commonSlice.reducer;
