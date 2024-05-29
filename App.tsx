import React, { useEffect, useLayoutEffect, useState } from "react";

// import WrapActionSheetView from 'components/actionSheet/WrapActionSheetView.component';
// import WrapAlertView from 'components/Alert/WrapAlertView.component';
// import WrapDropdown from 'components/DropdownAlert/wrapDropdown.component';
import getStore, { persistor } from "configs/store.config";
// import {
//   NotificationHelperHelper,
//   createDefaultChannelsHelper,
//   requestUserPermissionHelper,
// } from 'helpers/firebase.helper';
import AppNavigation from "navigation/app.navigation";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import LevelupModal from 'components/LevelUp/levelup.modal';
// import ModalMedia from 'components/Media/ModalMedia.component';
// import AppStateApp from "components/appConponents/appState.component";
// import GlobalPopupApp from "components/appConponents/globalPopup.component";
import { ENVIRONMENT, setUrlEnv } from "configs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { endConnection, withIAPContext } from "react-native-iap";
import { MMKV } from "react-native-mmkv";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import DisconnectNetworkScreen from 'screens/disconnect/disconnectNetwork.screen';
// import SocketConnect from "./Socket";
// import FaqPointScreen from 'screens/Introduce/faq.point.screen';
// import FaqDiamondScreen from 'screens/Introduce/faq.diamond.screen';
import { clearBugLogHelper, setBugDeviceHelper } from "helpers/storage.helper";
import ViewShot, { CaptureOptions } from "react-native-view-shot";
import GlobalHelper from "helpers/global.helper";
import { VS } from "constants/system/ui/sizes.ui.constant";

const storage = new MMKV();
// import ModalMediaPost from "components/Media/ModalMediaPost.component";


const store = getStore();
const optionsScreenShot: CaptureOptions = { format: "jpg", quality: 0.8 };

const App = () => {
  const [isProduct, setIsProduct] = useState<boolean | null>(null);

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
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ViewShot style={styles.container} ref={GlobalHelper.ViewShotRef} options={optionsScreenShot}>
              <BottomSheetModalProvider>
                <AppNavigation />
              </BottomSheetModalProvider>
              {/*<AppStateApp ref={GlobalPopupHelper.appStateRef} />*/}
              {/*<SocketConnect ref={GlobalPopupHelper.globalSocketRef} />*/}
              {/*<GlobalPopupApp ref={GlobalPopupHelper.globalUIRef} />*/}
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
            </ViewShot>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>

  );
};

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

// export default withIAPContext(App);
export default (App);
