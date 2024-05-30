import {useMemo} from "react";
import {useAppSelector} from "configs/store.config";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {useTheme} from "react-native-paper";
import {IThemeType} from "constants/system/system.constant";
import {ITheme} from "constants/system/ui/theme.constant";


dayjs.extend(isBetween);


type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useSystem<T extends NamedStyles<T> | NamedStyles<any>>(createStyle?: (theme: ITheme) => T): {
  styles: T,
  themeType: IThemeType,
  theme: ITheme
} {
  const themeType = useAppSelector((state) => state.system.themeType);

  const theme = useTheme() as ITheme;
  const styles = useMemo(() => {
    return createStyle?.(theme) || {} as T;
  }, [theme]);

  return {theme, themeType, styles};
}
