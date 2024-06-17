import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {MHS} from "constants/system/ui/sizes.ui.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import {useAppDispatch} from "configs/store.config";
import {ITheme} from "constants/system/ui/theme.constant";
import BButton from "components/base/button.base";
import {loginWithPasswordThunk} from "store/reducers/user.reducer.store";
import {SubmitHandler, useForm} from "react-hook-form";
import FTextInput from "components/form/textInput.form";
import {ILoginWithPassword} from "models/user.model";

export default function LoginScreen() {
  const {styles} = useSystemTheme(createStyles);
  const {control, handleSubmit} = useForm<ILoginWithPassword>()

  const dispatch = useAppDispatch();


  const login: SubmitHandler<ILoginWithPassword> = useCallback((data) => {
    console.log(data)
    dispatch(loginWithPasswordThunk(data))
  }, [])


  return (
    <View style={styles.container}>
      <Text variant={"displayMedium"}>{"Login"}</Text>
      <FTextInput
        name={"user_email"}
        control={control}
        label="Email"
        style={styles.input}
        mode={"outlined"}
      />
      <FTextInput
        name={"password"}
        control={control}
        label="Password"
        style={styles.input}
        mode={"outlined"}
        secureTextEntry
      />

      <BButton onPress={handleSubmit(login)} mode={"contained"} eventKey={"login"}>
        Login
      </BButton>

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
    }, contentContainer: {
      flex: 1, alignItems: "center", minHeight: 100
    }, input: {
      width: "100%", borderRadius: 100
    }
  });
};

