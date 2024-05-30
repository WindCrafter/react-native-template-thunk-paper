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
    setLanguageThunk: (state, action: {payload: string}) => {
      state.language = action.payload;
    },
    setThemeTypeThunk: (state, action:{payload: IThemeType}) => {
      state.themeType = action.payload;
    }
  },
  extraReducers(builder) {

  }
});

// Reducer
export const {
  setLanguageThunk,
  setThemeTypeThunk
} = system.actions;
export default system.reducer;
