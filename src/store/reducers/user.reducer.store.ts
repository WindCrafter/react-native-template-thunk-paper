import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import axios from "axios";
import {appUrlConfig} from "configs";
import ReduxHelper from "helpers/redux.helper";
import StorageHelper from "helpers/storage.helper";
import {ILoginWithPassword, IUser} from "models/user.model";
import ObjectHelper from "helpers/object.helper";
import DeviceInfo from "react-native-device-info";
import {Platform} from "react-native";

interface IInitialState {
  isAuthenticated: boolean;
  user?: IUser
}

export const initialState: IInitialState = {
  isAuthenticated: false,
  user: undefined
};

export const loginWithPasswordThunk = createAsyncThunk(
  "user/loginWithPasswordThunk",
  async (params: ILoginWithPassword) => {
    params.device_uuid = await DeviceInfo.getUniqueId();
    // params.device_signature = await getFCMTokenHelper();
    params.device_signature = "getFCMTokenHelper";
    params.device_type = Platform.OS;
    return await axios.post<IUser>(`${appUrlConfig.APP_MAIN_URL}/login`, ObjectHelper.removeEmptyFields(params))
  },
  {serializeError: ReduxHelper.serializeAxiosError}
);

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setIsAuthenticatedThunk: (state: IInitialState, action: { payload: boolean }) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(loginWithPasswordThunk), (state, action) => {
        StorageHelper.setBugOwnerId(action.payload.data?.id || "")
        console.log(action.payload)
        return ({
          ...state,
          isAuthenticated: true,
          user: action.payload.data
        })
      })
  }
});

// Reducer
export const {
  setIsAuthenticatedThunk
} = user.actions;

export default user.reducer;
