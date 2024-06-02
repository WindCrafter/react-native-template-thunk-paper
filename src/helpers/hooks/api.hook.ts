import {useAppDispatch} from "configs/store.config";
import GlobalHelper from "helpers/globalHelper";
import {ESystemStatus} from "constants/system/system.constant";
import languages from "constants/system/languages";

namespace IUseAPI {
  export interface ICallThunk {
    dispatchFunction?: Function;
    params?: any;
    messageSuccess?: string;
    actionSuccess?: Function;
    showLoading?: boolean;

    autoHideLoading?: boolean;
    messageFailed?: string;
    actionFailed?: Function;
    functionService?: Function;
  }
}

export const useAPI = <T>() => {
  const dispatch = useAppDispatch();

  const callThunk = async ({
                             dispatchFunction,
                             params,
                             messageSuccess,
                             messageFailed,
                             showLoading = true,
                             autoHideLoading = false,
                             actionSuccess,
                             actionFailed
                           }: IUseAPI.ICallThunk) => {
    if (showLoading) {
      GlobalHelper.showLoading(autoHideLoading);
    }

    const res = await dispatch(dispatchFunction?.(params));
    GlobalHelper.hideLoading();

    if (res.payload?.data) {
      if (actionSuccess) {
        actionSuccess?.(res.payload.data);
      }
      if (messageSuccess) {
        GlobalHelper.showSnackBar({
          type: ESystemStatus.Success,
          content: messageSuccess
        });
      }
      return;
    }

    const message = Array.isArray(res.error?.message) ? res.error?.message?.[0] : (res.error?.message || languages.somethingWentWrong);
    if (messageFailed) {
      GlobalHelper.showSnackBar({
        type: ESystemStatus.Error,
        content: messageFailed || message
      });
    }
    actionFailed?.(message);
  };

  const callService = async ({
                               functionService,
                               params,
                               messageSuccess = "",
                               showMessageFailed = true,
                               actionSuccess = undefined,
                               showLoading = true,
                               hideLoading = true,
                               actionFailed,
                               messageFailed = ""
                             }: TypedCallApi) => {
    try {
      if (showLoading) {
        GlobalHelper.showLoading();
      }
      const res = await functionService?.(params);
      if (hideLoading) {
        GlobalHelper.hideLoading();
      }
      if (res) {
        if (actionSuccess) {
          actionSuccess?.(res);
        }
        if (messageSuccess) {
          GlobalHelper.showSnackBar({
            type: ESystemStatus.Success,
            content: messageSuccess
          });
        }
        return;
      }
      actionFailed?.("Network Error");
    } catch (error: any) {
      GlobalHelper.hideLoading();
      const messages = error?.response?.data?.message;
      const message = Array.isArray(messages) ? messages?.[0] : (messages || languages.somethingWentWrong);
      if (showMessageFailed) {
        let messageContent = languages[message];
        console.log("Call api failed", message, params);
        GlobalHelper.showSnackBar({
          type: ESystemStatus.Error,
          content: messageFailed || messageContent || message
        });
      }
      actionFailed?.(message);
    }
  };

  return { callThunk, callService };
};
