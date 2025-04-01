import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_token: null,
    role: "",
  },
  reducers: {
    setUser: (state, actions) => {
      const token = actions.payload;
      state.user_token = token;
      try {
        const decoded = jwtDecode(token);
        state.role = decoded.role;
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        state.role = null;
      }
    },
    logOut: (state, action) => {
      state.user_token = null;
      state.role = null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
