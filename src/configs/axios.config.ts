import { MMKV } from "react-native-mmkv";

import axios from "axios";

import { APP_URL } from "configs/index";
import { getTypeOfAttributesHelper } from "helpers/object.helper";
import { setBugLogHelper } from "helpers/storage.helper";
// import {createBugToFilesStoreHelper} from "helpers/firebase.helper";
import navigationHelper from "helpers/navigation.helper";
import { globalApp } from "../../logs/logs";
import dayjs from "dayjs";

const storage = new MMKV();


/**

 * Timeout for 10 second

 */

const TIMEOUT = Number(APP_URL.APP_API_REQUEST_TIMEOUT);

axios.defaults.timeout = (TIMEOUT * 1000);

axios.defaults.baseURL = APP_URL.APP_AJAX_URL;

let Reset = "\x1b[0m";
let Bright = "\x1b[1m";
let FgGreen = "\x1b[32m";
let BgGreen = "\x1b[42m";
let BgBlue = "\x1b[44m";
let BgMagenta = "\x1b[45m";


const setupAxiosInterceptors = (onUnauthenticated: (status: number) => void) => {
  const onRequestSuccess = async (axios_config) => {
    axios_config.headers["X-Authorization"] = storage.getString("session");
    const cacheBuster = Math.round(Math.random() * 1000000);
    axios_config.url = axios_config.url + (axios_config.url.includes("cacheBuster=") ? "" : (axios_config.url.includes("?") ? "&" : "?") + `cacheBuster=${cacheBuster}`);
    axios_config.timeout = 25000;
    let Method = String(axios_config.method).toUpperCase();
    if (__DEV__) {
      /**
       * Make color: https://backbencher.dev/articles/nodejs-colored-text-console
       */
      console.info("==========<<<<<<<<<<<<<<<START AXIOS<<<<======================");
      console.log(Bright + BgBlue + ` ${Method} ` + Reset, FgGreen + axios_config.url + Reset);
      console.log(Bright + BgMagenta + ` BODY ` + Reset, FgGreen + JSON.stringify(axios_config.body, null, 4) + Reset);
      console.log(Bright + BgGreen + ` AUTH ` + Reset, FgGreen + axios_config.headers["X-Authorization"] + Reset);
      console.log(Bright + Bright + ` Channel ` + Reset, FgGreen + axios_config.headers["X-Channel"] + Reset);
    }
    if (globalApp.customLog && globalApp.customLog.enableLog) {
      globalApp.customLog.emitEvent({
        type: "call_api",
        method: Method,
        payload: {
          url: axios_config.url,
          data: axios_config.body,
          token: axios_config.headers["X-Authorization"],
          config: axios_config.headers["X-Channel"]
        }
      });
    }
    return axios_config;
  };


  const onResponseSuccess = async (response) => {

    createLogsFromResponse(response, false);

    // set session
    const session = response.headers["x-authorization"];

    // console.info(session, '==========>>>>>>>>>>>>>>>>>>======================');
    if (session) {
      storage.set("session", session);
    }

    let Method = String(response.config.method).toUpperCase();
    if (__DEV__) {
      console.log(Bright + BgBlue + ` ${Method} ` + Reset, FgGreen + response.config.url + Reset);
      console.log("Response Success", response);
    }


    if (globalApp.customLog && globalApp.customLog.enableLog) {
      globalApp.customLog.emitEvent({
        type: "call_api_response",
        payload: `${Method}_RES:: ${response.config.url}${JSON.stringify(response.data)}\nTIME_RES:: ${dayjs().toString()}`
      });
    }

    return response;

  };

  const onResponseError = async (err) => {
    createLogsFromResponse(err, true);
    // set session
    // const session = err?.response?.headers['x-authorization'];
    // if (session) await AsyncStorage.setItem('session', session);

    const status = err.status || (err.response ? err?.response?.status : 0);

    let Method = String(err.config.method).toUpperCase();
    if (globalApp.customLog && globalApp.customLog.enableLog) {
      globalApp.customLog.emitEvent({
        type: "call_api",
        method: Method,
        payload: { url: err?.config?.url, data: err?.config?.data, token: err?.config?.headers?.["X-Authorization"] }
      });
    }
    /**
     * 401: Chuwa login
     * 403: vuot quyen, khong co quyen
     */
    const requestUrl = err?.request?._url || "";
    if ((status === 401 || status === 403) && requestUrl.toLowerCase().includes(APP_URL.APP_AJAX_URL.toLowerCase())) {
      onUnauthenticated(status);
    }

    return Promise.reject(err);

  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

function createLogsFromResponse(response: any, isError: boolean) {
  if (__DEV__) return;

  let dataToLog: any = {
    endpoint: response?.config?.url,
    hasAuth: !!response?.config?.headers?.["X-Authorization"],
    type: response?.config?.method,
    data: getTypeOfAttributesHelper(response?.config?.data),
    responseCode: isError ? response.status || (response.response ? response?.response?.status : 0) : response?.status,
    typeOfResponse: getTypeOfAttributesHelper(response?.data)
  };

  if (isError) {
    dataToLog = {
      ...dataToLog,
      error: response?.response?.data?.error,
      messageError: response?.response?.data?.message
    };
  }
  setBugLogHelper("|*|API_" + JSON.stringify(dataToLog));

  if (isError) {
    setTimeout(() => {
      // createBugToFilesStoreHelper(response?.response?.data?.message || "", "", "api", navigationHelper.getRouteName() || "");
    }, 500);
  }
}

export default setupAxiosInterceptors;
