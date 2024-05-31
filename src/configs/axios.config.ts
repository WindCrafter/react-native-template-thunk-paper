import { MMKV } from "react-native-mmkv";

import axios, { AxiosResponse } from "axios";
import { APP_URL } from "configs/index";
// import {createBugToFilesStoreHelper} from "helpers/firebase.helper";
import { globalApp } from "../helpers/railway.helper";
import dayjs from "dayjs";
import { createLogsFromResponseHelper } from "helpers/axios.helper";

const storage = new MMKV();


const TIMEOUT = Number(APP_URL.APP_API_REQUEST_TIMEOUT);
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = APP_URL.APP_MAIN_URL;

let Reset = "\x1b[0m";
let Bright = "\x1b[1m";
let FgGreen = "\x1b[32m";
let BgGreen = "\x1b[42m";
let BgBlue = "\x1b[44m";
let BgMagenta = "\x1b[45m";


export default function setupAxiosInterceptors(onUnauthenticated: (status: number) => void) {

  /**
   * onRequestSuccess
   * @param axios_config
   */
  const onRequestSuccess = async (axios_config: any) => {
    axios_config.headers["X-Authorization"] = storage.getString("session");
    const cacheBuster = Math.round(Math.random() * 1000000);
    axios_config.url = axios_config.url + (axios_config?.url?.includes("cacheBuster=") ? "" : (axios_config.url?.includes("?") ? "&" : "?") + `cacheBuster=${cacheBuster}`);
    axios_config.timeout = TIMEOUT;
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


  /**
   * onResponseSuccess
   * @param response
   */
  const onResponseSuccess = async (response: AxiosResponse<any, any>) => {
    createLogsFromResponseHelper(response, false);

    // set session
    const session = response.headers["x-authorization"];
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


  /**
   * onResponseError
   * @param err
   */
  const onResponseError = async (err: any) => {
    createLogsFromResponseHelper(err, true);
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
     * 401 or 403: not auth or permission
     */
    const requestUrl = err?.request?._url || "";
    if ((status === 401 || status === 403) && requestUrl.toLowerCase().includes(APP_URL.APP_MAIN_URL?.toLowerCase())) {
      onUnauthenticated(status);
    }

    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
