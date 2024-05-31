import * as React from "react";
import { ILoadingGlobalComponentRef } from "components/global/loading.global.component";
import { ISnackBarGlobalComponentRef, SnackBarProps } from "components/global/snackbar.global.component";

interface IGlobalHelperTyped {
  ViewShotRef: React.RefObject<any>;
  LoadingRef: React.RefObject<ILoadingGlobalComponentRef>;
  SnackBarRef: React.RefObject<ISnackBarGlobalComponentRef>;

  showLoadingHelper: (autoHide: boolean) => void;
  hideLoadingHelper: Function;
  showSnackBarHelper: (snackBarProps: SnackBarProps) => void;
  hideSnackBarHelper: Function;
}

/**
 * Refs
 */
export const ViewShotRef = React.createRef<any>();
export const LoadingRef = React.createRef<ILoadingGlobalComponentRef>();
export const SnackBarRef = React.createRef<ISnackBarGlobalComponentRef>();


/**
 * Functions loading
 */
export function showLoadingHelper(autoHide: boolean = true) {
  LoadingRef.current?.showLoading(autoHide);
}

export function hideLoadingHelper() {
  LoadingRef.current?.hideLoading();
}

/**
 * Functions SnackBar
 */
export function showSnackBarHelper(snackBarProps: SnackBarProps) {
  SnackBarRef.current?.showSnackBar(snackBarProps);
}

export function hideSnackBarHelper() {
  SnackBarRef.current?.hideSnackBar();
}


const GlobalHelper: IGlobalHelperTyped = {
  ViewShotRef,
  LoadingRef,
  SnackBarRef,
  showLoadingHelper,
  hideLoadingHelper,
  showSnackBarHelper,
  hideSnackBarHelper
};

export default GlobalHelper;
