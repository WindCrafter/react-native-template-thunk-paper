import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Portal, Snackbar, SnackbarProps, useTheme } from "react-native-paper";
import { ESystemStatus } from "constants/system/system.constant";

export interface SnackBarProps extends Omit<SnackbarProps, "children" | "visible" | "onDismiss"> {
  visible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  content?: string,
  type?: ESystemStatus
}

export interface ISnackBarGlobalComponent {
  showSnackBar: (snackBarProps: SnackBarProps) => void;
  hideSnackBar: Function;
}

function SnackBarGlobalComponent(_: any, ref: React.ForwardedRef<ISnackBarGlobalComponent>) {

  const themeMD3 = useTheme();
  const [snackBarProps, setSnackBarProps] = useState<SnackBarProps>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useImperativeHandle(
    ref,
    () => ({
      showSnackBar,
      hideSnackBar
    }),
    []
  );

  const showSnackBar = useCallback((props: SnackBarProps) => {
    let theme = {
      colors: {
        inverseOnSurface: "white"
      }
    };
    switch (props?.type) {

    }

    setSnackBarProps({
      type: ESystemStatus.None, duration: 5000, onDismiss: () => {
      }, theme, ...props, visible: true
    });
  }, []);

  const hideSnackBar = useCallback(() => {
    setSnackBarProps(undefined);
    snackBarProps?.onDismiss?.();
  }, [snackBarProps?.onDismiss]);

  if (!snackBarProps) {
    return null;
  }

  return (
    <Portal>
      <Snackbar
        visible={true}
        {...snackBarProps}
        onDismiss={hideSnackBar}>
        {snackBarProps.children || snackBarProps.content || ""}
      </Snackbar>
    </Portal>

  );
}


export default memo(forwardRef(SnackBarGlobalComponent));
