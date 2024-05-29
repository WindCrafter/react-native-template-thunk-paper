import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "configs/index";
import { serializeAxiosError } from "configs/reducer.config";
import { cleanEntityHelper } from "helpers/object.helper";
import DeviceInfo from "react-native-device-info";


interface InitialState {
  language: string;
}

export const initialState: InitialState = {
  language: "en"
};

export const setTokenFirebaseThunk = createAsyncThunk(
  "system/setTokenFirebase",
  async (token: string) => {

    let paramDevice = {
      device_uuid: await DeviceInfo.getUniqueId(),
      device_signature: token,
      language: "vi"
    };

    let response = await axios.patch(`${APP_URL.APP_AJAX_URL}/user/update-session`, cleanEntityHelper(paramDevice));
    if (response.status === 200) {
      return token;
    } else throw "error update firebase token";
  },
  { serializeError: serializeAxiosError }
);

export const system = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setLanguageThunk: (state, action) => {
      state.language = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(setTokenFirebaseThunk.fulfilled, (state, action) => {
        // state.tokenFirebase = action.payload;
      })
  }
});

// Reducer
export const {
  setLanguageThunk
} = system.actions;
export default system.reducer;
