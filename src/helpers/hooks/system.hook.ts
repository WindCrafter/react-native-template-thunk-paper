import { useMemo } from "react";
import { useAppSelector } from "configs/store.config";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { MMKV } from "react-native-mmkv";
import { useTheme } from "react-native-paper";
import { IThemeType } from "constants/system/system.constant";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const storage = new MMKV();

dayjs.extend(isBetween);


type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useSystem<T extends NamedStyles<T> | NamedStyles<any>>(createStyle?: (colors: MD3Colors) => T): {
  styles: T,
  themeType: IThemeType,
  colors: MD3Colors
} {
  const themeType = useAppSelector((state) => state.system.themeType);

  const colors = useTheme().colors;
  const styles = useMemo(() => {
    return createStyle?.(colors) || {} as T;
  }, [colors]);

  return { colors, themeType, styles };
}
