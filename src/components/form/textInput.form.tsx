import React, {useCallback} from "react";
import {TextInput} from "react-native-paper";
import {Control, useController} from "react-hook-form";

interface IFTextInputProps extends React.ComponentProps<typeof TextInput> {
  control: Control<any>
  name: string
}

/**
 * FTextInput is Form TextInput
 * @param control
 * @param name
 * @param onChangeText
 * @param props
 * @constructor
 */
export default function FTextInput({control, name, onChangeText, ...props}: IFTextInputProps): React.JSX.Element {
  const {field, fieldState} = useController({
    control: control,
    defaultValue: "",
    name
  })

  const onChangeTextOverride = useCallback((text: string) => {
    field.onChange?.(text)
    onChangeText?.(text)
  }, [field.onChange])

  return <TextInput
    onChangeText={onChangeTextOverride}
    {...props}
    value={field.value}
  />;
}
