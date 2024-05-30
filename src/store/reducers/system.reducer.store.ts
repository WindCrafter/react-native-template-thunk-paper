import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
  language: string;
}

export const initialState: InitialState = {
  language: "en"
};


export const system = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setLanguageThunk: (state, action) => {
      state.language = action.payload;
    }
  },
  extraReducers(builder) {

  }
});

// Reducer
export const {
  setLanguageThunk
} = system.actions;
export default system.reducer;
