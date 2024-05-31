import React from "react";
import { Text } from "react-native-paper";

interface IBTextProps extends React.ComponentProps<typeof Text> {

}

export default function BText(props: IBTextProps): React.JSX.Element {
  return <Text {...props} />;
}

