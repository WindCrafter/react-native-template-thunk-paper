import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore, Storage } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducer, { BLACK_LIST, RootReducer, WHITE_LIST } from "store/index";
import { MMKV } from "react-native-mmkv";
import logger from "redux-logger";
import { customLogStoreHelper } from "helpers/redux.helper";

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  }
};

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  blacklist: BLACK_LIST,
  whitelist: WHITE_LIST,
  stateReconciler: autoMergeLevel2
};


const persistedReducer = persistReducer<RootReducer>(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: { warnAfter: 50 },
      serializableCheck: false
    }).concat(logger).concat(customLogStoreHelper)
  }
});

export default function getStore() {
  return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

