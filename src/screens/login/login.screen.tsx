import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { MHS } from "constants/system/ui/sizes.ui.constant";
import { useSystemTheme } from "helpers/hooks/system.hook";
import { useAppDispatch } from "configs/store.config";
import { ITheme } from "constants/system/ui/theme.constant";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import SkeletonContainerComponent from "components/skeleton/skeletonContainer.component";


export default function LoginScreen() {
  const { styles } = useSystemTheme(createStyles);
  const [text, setText] = React.useState("");

  const dispatch = useAppDispatch();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);


  function login() {
    // GlobalHelper.showSnackBarHelper({
    //   content: "Hello",
    //   duration: 2000,
    //   elevation: 5,
    //   type: ESystemStatus.Warning
    // });
    bottomSheetRef.current?.expand();
  }


  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant={"displayMedium"}>{"Login"}</Text>
      <TextInput
        label="Email"
        value={text}
        style={styles.input}
        onChangeText={text => setText(text)}
        mode={"outlined"}
      />
      <TextInput
        label="Password"
        value={text}
        style={styles.input}
        onChangeText={text => setText(text)}
        mode={"outlined"}
        secureTextEntry
      />

      <Button onPress={login} mode={"contained"}>
        Login
      </Button>

      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing
        onChange={handleSheetChanges}
        enablePanDownToClose
        animateOnMount
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>

  );
};


const createStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: MHS._16,
      gap: MHS._16,
      backgroundColor: theme.colors.background
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      minHeight: 100
    },
    input: {
      width: "100%",
      borderRadius: 100
    }
  });
};

