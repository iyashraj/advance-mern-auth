import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinHandler: (state) => {
      state.loading = true;
    },
    signinSuccessHandler: (state, action) => {
        state.currentUser = action.payload,
        state.loading = false,
        state.error = false
    },
    signinFailureHandler: (state, action) => {
        console.log(action.payload)
        state.error = action.payload,
        state.loading = false
    }
  },
});
export const {signinHandler, signinSuccessHandler, signinFailureHandler} = userSlice.actions

export default userSlice.reducer