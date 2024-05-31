import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {MHS} from "constants/system/ui/sizes.ui.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import {useAppDispatch} from "configs/store.config";
import {ESystemStatus} from "constants/system/system.constant";
import {ITheme} from "constants/system/ui/theme.constant";
import GlobalHelper from "helpers/globalHelper";


export default function LoginScreen() {
  const {styles} = useSystemTheme(createStyles)
  const [text, setText] = React.useState("");

  const dispatch = useAppDispatch()


  function login() {
    GlobalHelper.showSnackBarHelper({
      content: "Hello",
      duration: 2000,
      elevation: 5,
      type: ESystemStatus.Warning
    });
  }

  return (
    <View style={styles.container}>
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
    input: {
      width: "100%",
      borderRadius: 100
    }
  });
};

