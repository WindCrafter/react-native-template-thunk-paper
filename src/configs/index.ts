import Config from "react-native-config";
import {MMKV} from "react-native-mmkv";

export enum ENVIRONMENT {
  DEVELOP = "develop",
  PRODUCT = "product"
}

const isProduction = (new MMKV().getString("env") || (__DEV__ ? ENVIRONMENT.DEVELOP : ENVIRONMENT.PRODUCT)) === ENVIRONMENT.PRODUCT



/**
 * Used domain
 */
const USED_DOMAIN = isProduction ? Config.PRO_DOMAIN : Config.DEV_DOMAIN;
export let APP_URL = {
  APP_API_REQUEST_TIMEOUT: 15000,
  APP_MAIN_URL: USED_DOMAIN,

  TERM: Config.TERM_URL,
  POLICIES: Config.POLICY_URL,
  WEBSITE_FRONTEND: Config.WEBSITE_FRONTEND
}



/**
 * Function to switch ENV
 * @param isProduction
 */
export function setUrlEnv(isProduction: boolean) {
  const NEW_USED_DOMAIN = isProduction ? Config.DEV_DOMAIN : Config.PRO_DOMAIN;

  APP_URL = {
    APP_API_REQUEST_TIMEOUT: 15000,
    APP_MAIN_URL: NEW_USED_DOMAIN,

    TERM: Config.TERM_URL,
    POLICIES: Config.POLICY_URL,
    WEBSITE_FRONTEND: Config.WEBSITE_URL
  }
}
