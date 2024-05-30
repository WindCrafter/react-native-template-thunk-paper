import { createSlice } from "@reduxjs/toolkit";
import { IThemeType } from "constants/system/system.constant";


interface InitialState {
  language: string;
  themeType: IThemeType;
}

export const initialState: InitialState = {
  language: "en",
  themeType: IThemeType.Light,
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
