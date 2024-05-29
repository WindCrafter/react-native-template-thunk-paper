import { useCallback, useEffect, useRef } from "react";

import setupAxiosInterceptors from "configs/axios.config";
import { useAppDispatch, useAppSelector } from "configs/store.config";
// import { EnumTheme } from "constants/system.constant";
import { navigationRef } from "helpers/navigation.helper";
import { NativeModules, Platform, StatusBar } from "react-native";
import ErrorBoundary from "react-native-error-boundary";

// import { firebase } from "@react-native-firebase/analytics";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import RNBootSplash from "react-native-bootsplash";
// import { setTokenFirebase } from "store/reducer/system.reducer.store";
import Config from "react-native-config";
// import { createBugToFilesStoreHelper, getFCMTokenHelper } from "helpers/firebase.helper";
import { setBugLogHelper } from "helpers/storage.helper";
import languages from "constants/system/languages";
import { NAVIGATION_HOME_SCREEN, NAVIGATION_LOGIN_SCREEN } from "constants/system/navigation.constant";
import HomeScreen from "screens/home/home.screen";
import LoginScreen from "screens/login/login.screen";


setupAxiosInterceptors((status: number) => {
  switch (status) {
    case 401:
      // GlobalPopupHelper.showPopupRequestLogin()
      break;
    case 403:
      // GlobalPopupHelper.showPopupNoPermission()
      break;
  }
});


const NativeStack = createNativeStackNavigator();

export default function AppNavigation() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const routeNameRef = useRef("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    if (deviceLanguage?.includes("en")) {
      languages.setLanguage("en");
    } else {
      languages.setLanguage("en");
    }

    /**
     *
     */
    // const updateFirebaseToken = async () => {
    //   const token = await getFCMTokenHelper();
    //   dispatch(setTokenFirebase(token));
    // };
    // updateFirebaseToken();
  }, []);

  const onErrorCrashApp = useCallback((error: any, stackTrace: string) => {
    if (!__DEV__) {
      // createBugToFilesStoreHelper(String(error), stackTrace, "crash", navigationHelper.getRouteName() || "");
    }
  }, []);

  const prefix = Config.DEEP_LINK || "";

  return (
    <NavigationContainer ref={navigationRef}
                         linking={{
                           prefixes: [`${prefix}://`]
                         }}
                         onReady={() => {
                           routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name || "";
                           setBugLogHelper(routeNameRef.current);
                           // firebase.analytics().logScreenView({
                           //   screen_name: routeNameRef.current,
                           //   screen_class: routeNameRef.current
                           // }).catch(console.log);
                           RNBootSplash.hide({ fade: false });
                         }}
                         onStateChange={async () => {
                           const previousRouteName = routeNameRef.current;
                           const currentRouteName = navigationRef.current?.getCurrentRoute()?.name || "";

                           if (previousRouteName !== currentRouteName) {
                             setBugLogHelper("|_|" + currentRouteName);
                             // firebase.analytics().logScreenView({
                             //   screen_name: currentRouteName,
                             //   screen_class: currentRouteName
                             // }).catch(console.log);
                           }
                           routeNameRef.current = currentRouteName;
                         }}
    >
      <StatusBar barStyle={"dark-content"} translucent={true}
                 backgroundColor={"transparent"} />
      <ErrorBoundary onError={onErrorCrashApp}>
        <NativeStack.Navigator
          screenOptions={{
            animation: "slide_from_right",
            headerBackTitleVisible: false,
            headerShown: false
          }}
        >
          {
            isAuthenticated ?
              <NativeStack.Screen
                name={NAVIGATION_HOME_SCREEN}
                component={HomeScreen}
              />
              :
              <NativeStack.Screen
                name={NAVIGATION_LOGIN_SCREEN}
                component={LoginScreen}
              />
          }
        </NativeStack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>

  );
}
