import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import setupAxiosInterceptors from "configs/axios.config";
import { useAppDispatch, useAppSelector } from "configs/store.config";
// import { EnumTheme } from "constants/system.constant";
import { navigationRef } from "helpers/navigation.helper";
import { NativeModules, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";

// import { firebase } from "@react-native-firebase/analytics";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import RNBootSplash from "react-native-bootsplash";
// import { setTokenFirebase } from "store/reducer/system.reducer.store";
import Config from "react-native-config";
// import { createBugToFilesStoreHelper, getFCMTokenHelper } from "helpers/firebase.helper";
import { clearBugLogHelper, setBugDeviceHelper, setBugLogHelper, storage } from "helpers/storage.helper";
import languages from "constants/system/languages";
import { NAVIGATION_HOME_SCREEN, NAVIGATION_LOGIN_SCREEN } from "constants/system/navigation.constant";
import HomeScreen from "screens/home/home.screen";
import LoginScreen from "screens/login/login.screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import LoadingGlobalComponent from "components/global/loading.global.component";
import GlobalHelper from "helpers/globalHelper";
import SnackBarGlobalComponent from "components/global/snackbar.global.component";
import { PaperProvider } from "react-native-paper";
import { THEME } from "constants/system/ui/theme.constant";
import { ENVIRONMENT, setUrlEnv } from "configs";
import { VS } from "constants/system/ui/sizes.ui.constant";
import { IThemeType } from "constants/system/system.constant";


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
  const themeType = useAppSelector((state) => state.system.themeType);
  const [isProduct, setIsProduct] = useState<boolean | null>(null);
  const theme = useMemo(()=> THEME[themeType],[themeType])
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



  useLayoutEffect(() => {
    clearBugLogHelper();
  }, []);

  useEffect(() => {
    const env = storage.getString("env") || (__DEV__ ? ENVIRONMENT.DEVELOP : ENVIRONMENT.PRODUCT);

    setUrlEnv(env === ENVIRONMENT.PRODUCT);
    setIsProduct(env === ENVIRONMENT.PRODUCT);

    setBugDeviceHelper();

    // return () => {
    //   endConnection();
    // };
  }, []);

  // useEffect(() => {
  //   if (isProduct !== null) {
  //     requestUserPermissionHelper()
  //     createDefaultChannelsHelper()
  //     NotificationHelperHelper()
  //   }
  // }, [isProduct])


  if (isProduct === null) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}
                             theme={theme}
                             linking={{
                               prefixes: [`${Config.DEEP_LINK}://`]
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
      </BottomSheetModalProvider>
      {/*<AppStateApp ref={GlobalPopupHelper.appStateRef} />*/}
      {/*<SocketConnect ref={GlobalPopupHelper.globalSocketRef} />*/}
      <LoadingGlobalComponent ref={GlobalHelper.LoadingRef} />
      <SnackBarGlobalComponent ref={GlobalHelper.SnackBarRef} />
      {/*<WrapDropdown ref={GlobalPopupHelper.globalAlertRef} />*/}
      {/*<WrapAlertView ref={GlobalPopupHelper.alertRef} />*/}
      {/*<WrapActionSheetView ref={GlobalPopupHelper.actionSheetRef} />*/}
      {/*<DisconnectNetworkScreen />*/}
      {/*<ModalMedia ref={GlobalPopupHelper.modalMediaRef} />*/}
      {/*<ModalMediaPost ref={GlobalPopupHelper.modalMediaPostRef} />*/}
      {/*<LevelupModal ref={GlobalPopupHelper.levelUpRef} />*/}
      {/*<FaqPointScreen ref={GlobalPopupHelper.faqPointRef} />*/}
      {/*<FaqDiamondScreen ref={GlobalPopupHelper.faqDiamond} />*/}
      {
        !isProduct ? (
          <View pointerEvents="none" style={styles.devType}>
            <Text style={styles.title}>{"DEVELOP"}</Text>
          </View>
        ) : null
      }
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  devType: {
    position: "absolute",
    top: VS._10,
    right: -VS._50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: VS._160,
    height: VS._32,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }]
  },
  title: {
    color: "white",
    fontWeight: "600"
  }
});
