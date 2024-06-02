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
  reducers: {
    setIsAuthenticatedThunk: (state: InitialState, action: {payload: boolean}) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers(builder) {

  }
});

// Reducer
export const {
  setIsAuthenticatedThunk
} = user.actions;

export default user.reducer;
