import { AxiosError } from "axios";

import {
  ActionReducerMapBuilder,
  AnyAction,
  AsyncThunk,
  createSlice,
  SerializedError,
  SliceCaseReducers,
  ValidateSliceCaseReducers
} from "@reduxjs/toolkit";

/**
 * Model for redux actions with pagination
 */
export type IQueryParams = {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  [propName: string]: any;
};

/**
 * Useful types for working with actions
 */
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

/**
 * Check if the async action type is rejected
 */
export function isRejectedAction(action: AnyAction) {
  return action.type.endsWith("/rejected");
}

/**
 * Check if the async action type is pending
 */
export function isPendingAction(action: AnyAction) {
  return action.type.endsWith("/pending");
}

/**
 * Check if the async action type is completed
 */
export function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith("/fulfilled");
}

const commonErrorProperties: Array<keyof SerializedError> = ["name", "message", "stack", "code"];

/**
 * serialize function used for async action errors,
 * since the default function from Redux Toolkit strips useful info from axios errors
 * *
 */
export const serializeAxiosError = (value): AxiosError | SerializedError => {
  if (typeof value === "object" && value !== null) {
    if (value.isAxiosError) {
      return {
        name: value?.response?.data?.error || "",
        message: JSON.stringify(value?.response?.data?.message),
        stack: "",
        code: value?.response?.data?.status || 500
      };
    } else {
      const simpleError: SerializedError = {};
      for (const property of commonErrorProperties) {
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};


export interface EntityState<T> {
  loading?: boolean;
  errorMessage?: string | null;
  entities?: ReadonlyArray<T>;
  entity?: T;
  updating?: boolean;
  totalItems?: number;
  updateSuccess?: boolean;

  [propName: string]: any;
}
