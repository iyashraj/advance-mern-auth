import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

const store = configureStore({
  reducer: { user: userSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
