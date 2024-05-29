import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isAuthenticated: boolean;
}

export const initialState: InitialState = {
  isAuthenticated: false
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {

  }
});

// Reducer
export const {} = user.actions;
export default user.reducer;
