import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import axios from "axios";
import {appUrlConfig} from "configs";
import ReduxHelper from "helpers/redux.helper";
import StorageHelper from "helpers/storage.helper";

interface InitialState {
    isAuthenticated: boolean;
}

export const initialState: InitialState = {
    isAuthenticated: false
};

export const loginWithPasswordThunk = createAsyncThunk(
    "user/loginWithPasswordThunk",
    async ({email, password}: { email: string, password: string }) => {
        return await axios.post<any>(`${appUrlConfig.APP_MAIN_URL}/user/login`)
    },
    {serializeError: ReduxHelper.serializeAxiosError}
);

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setIsAuthenticatedThunk: (state: InitialState, action: { payload: boolean }) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(loginWithPasswordThunk), (state, action) => {
                StorageHelper.setBugOwnerId(action.payload.data?._id || "")
                return ({
                    ...state,
                    isAuthenticated: true,
                })
            })
    }
});

// Reducer
export const {
    setIsAuthenticatedThunk
} = user.actions;

export default user.reducer;
