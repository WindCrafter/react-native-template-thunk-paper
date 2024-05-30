import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {MHS} from "constants/system/ui/sizes.ui.constant";
import {useSystem} from "helpers/hooks/system.hook";
import {MD3Colors} from "react-native-paper/lib/typescript/types";
import {useAppDispatch} from "configs/store.config";
import {setThemeTypeThunk} from "store/reducers/system.reducer.store";
import {IThemeType} from "constants/system/system.constant";


export default function LoginScreen() {
  const {styles} = useSystem(createStyles)
  const [text, setText] = React.useState("");

  const dispatch = useAppDispatch()


  function login() {
    // GlobalHelper.showSnackBarHelper({
    //   content: "Hello",
    //   duration: 2000,
    //   elevation: 5
    // });
    dispatch(setThemeTypeThunk(IThemeType.Light))
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


const createStyles = (colors: MD3Colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: MHS._16,
      gap: MHS._16,
      backgroundColor: colors.background
    },
    input: {
      width: "100%",
      borderRadius: 100
    }
  });
};

