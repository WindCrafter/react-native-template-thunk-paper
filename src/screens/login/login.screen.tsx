import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {TextInput} from "react-native-paper";
import {MHS} from "constants/system/ui/sizes.ui.constant";


export default function LoginScreen() {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={text}
        style={styles.input}
        onChangeText={text => setText(text)}
        mode={"outlined"}
        outlineStyle={{borderRadius: 100}}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: MHS._16
  },
  input: {
    width: '100%',
    borderRadius: 100
  }
});
