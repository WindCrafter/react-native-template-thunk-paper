import Config from "react-native-config";
import {MMKV} from "react-native-mmkv";

export enum ENVIRONMENT {
  DEVELOP = "develop",
  PRODUCT = "product"
}

const storage = new MMKV()
const isProduction = (storage.getString("env") || (__DEV__ ? ENVIRONMENT.DEVELOP : ENVIRONMENT.PRODUCT)) === ENVIRONMENT.PRODUCT

const DEVELOPER_DOMAIN_DEV = "https://dev.api.gamifabiz.appuni.io";
const DEVELOPER_DOMAIN_MEDIA_DEV = "https://dev.api.gamifabiz.appuni.io/v2/media/upload";
const DEVELOPER_DOMAIN_MEDIA_V1_DEV = "https://media.lgbt.appuni.io";
const DEVELOPER_DOMAIN_CHAT_DEV = "https://dev.api.gamifabiz.appuni.io";
const DEVELOPER_DOMAIN_SOCKET_DEV = "https://dev.api.gamifabiz.appuni.io";

// const PRODUCTION_DOMAIN_PRODUCTION = "https://api.behapyglobal.com";
// const PRODUCTION_DOMAIN_MEDIA_PRODUCTION = "https://api.behapyglobal.com/media/upload";
// const PRODUCTION_DOMAIN_CHAT_PRODUCTION = "https://api.behapyglobal.com";
// const PRODUCTION_DOMAIN_SOCKET_PRODUCTION = "https://api.behapyglobal.com";
const PRODUCTION_DOMAIN_PRODUCTION = "https://api.behapyglobal.com";
const PRODUCTION_DOMAIN_MEDIA_PRODUCTION = "https://api.behapyglobal.com/v2/media/upload";
const PRODUCTION_DOMAIN_MEDIA_V1_PRODUCTION = "https://media.lgbt.appuni.io";
const PRODUCTION_DOMAIN_CHAT_PRODUCTION = "https://api.behapyglobal.com";
const PRODUCTION_DOMAIN_SOCKET_PRODUCTION = "https://api.behapyglobal.com";

/**
 * Domain cho production
 */
const DOMAIN = !isProduction ? DEVELOPER_DOMAIN_DEV : PRODUCTION_DOMAIN_PRODUCTION;
const DOMAIN_MEDIA = !isProduction ? DEVELOPER_DOMAIN_MEDIA_DEV : PRODUCTION_DOMAIN_MEDIA_PRODUCTION;
const DOMAIN_MEDIA_V1 = !isProduction ? DEVELOPER_DOMAIN_MEDIA_V1_DEV : PRODUCTION_DOMAIN_MEDIA_V1_PRODUCTION;
const DOMAIN_API = DOMAIN;
const DOMAIN_CHAT = !isProduction ? DEVELOPER_DOMAIN_CHAT_DEV : PRODUCTION_DOMAIN_CHAT_PRODUCTION;
const DOMAIN_CHAT_API = DOMAIN_CHAT;
const DOMAIN_SOCKET = !isProduction ? DEVELOPER_DOMAIN_SOCKET_DEV : PRODUCTION_DOMAIN_SOCKET_PRODUCTION;


/**
 * Jamviet.com added: Permalink, not depend on environment
 */


export const APP_ID_IOS = Config.APP_ID_IOS || ""
export const WEB_CLIENT_ID_GOOGLE = Config.WEB_CLIENT_ID_GOOGLE || ""
export const IOS_CLIENT_ID_GOOGLE = Config.IOS_CLIENT_ID_GOOGLE || ""
export const SHARED_SERCET_KEY_APPLE = ""
export const G_RECAPTCHA = Config.G_RECAPTCHA || ""

export let APP_URL = {
  APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
  APP_AJAX_URL: DOMAIN_API + '',
  APP_UPLOAD_MEDIA: DOMAIN_MEDIA + "/media",
  APP_UPLOAD_FILE: DOMAIN_MEDIA + "/file",
  APP_UPLOAD_MEDIA_V1: DOMAIN_MEDIA_V1 + "/upload-media"+ `?callback=${DOMAIN}/chat-media/create`,
  APP_UPLOAD_FILE_V1: DOMAIN_MEDIA_V1 + "/upload-file"+ `?callback=${DOMAIN}/chat-media/create`,
  APP_CHAT_MEDIA: DOMAIN_CHAT_API + "/chat-media",
  VUE_APP_URL_CHAT_SOCKET: DOMAIN_SOCKET + '/socket',

  APP_CHAT_ROOT: DOMAIN_CHAT,
  TERM: Config.TERM_URL,
  POLICIES: Config.POLICY_URL,
  WEBSITE_FRONTEND: Config.WEBSITE_FRONTEND
}

export function setUrlEnv(isProduction: boolean) {
  const DOMAIN = !isProduction ? DEVELOPER_DOMAIN_DEV : PRODUCTION_DOMAIN_PRODUCTION;
  const DOMAIN_MEDIA = !isProduction ? DEVELOPER_DOMAIN_MEDIA_DEV : PRODUCTION_DOMAIN_MEDIA_PRODUCTION;
  const DOMAIN_MEDIA_V1 = !isProduction ? DEVELOPER_DOMAIN_MEDIA_V1_DEV : PRODUCTION_DOMAIN_MEDIA_V1_PRODUCTION;
  const DOMAIN_API = DOMAIN + "";
  const DOMAIN_CHAT = !isProduction ? DEVELOPER_DOMAIN_CHAT_DEV : PRODUCTION_DOMAIN_CHAT_PRODUCTION;
  const DOMAIN_CHAT_API = DOMAIN_CHAT + "";
  const DOMAIN_SOCKET = !isProduction ? DEVELOPER_DOMAIN_SOCKET_DEV : PRODUCTION_DOMAIN_SOCKET_PRODUCTION;

  APP_URL = {
    APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
    APP_AJAX_URL: DOMAIN_API + '',
    APP_UPLOAD_MEDIA: DOMAIN_MEDIA + "/media",
    APP_UPLOAD_FILE: DOMAIN_MEDIA + "/file",
    APP_UPLOAD_MEDIA_V1: DOMAIN_MEDIA_V1 + "/upload-media"+ `?callback=${DOMAIN}/chat-media/create`,
    APP_UPLOAD_FILE_V1: DOMAIN_MEDIA_V1 + "/upload-file"+ `?callback=${DOMAIN}/chat-media/create`,
    APP_CHAT_MEDIA: DOMAIN_CHAT_API + "/chat-media",
    VUE_APP_URL_CHAT_SOCKET: DOMAIN_SOCKET + '/socket',

    APP_CHAT_ROOT: DOMAIN_CHAT,
    TERM: Config.TERM_URL,
    POLICIES: Config.POLICY_URL,
    WEBSITE_FRONTEND: Config.WEBSITE_FRONTEND
  }
}
