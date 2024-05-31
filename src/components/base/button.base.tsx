import React from "react";
import { Button } from "react-native-paper";

interface IBButtonProps extends React.ComponentProps<typeof Button> {

}

export default function BButton(props: IBButtonProps) {
  return <Button {...props}  children={props.children}/>;
}

