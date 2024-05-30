import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import Config from "react-native-config";
import { IThemeType } from "constants/system/system.constant";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
});


export const THEME: {
  [IThemeType.Light]: MD3Theme,
  [IThemeType.ExactDark]: MD3Theme,
  [IThemeType.AdaptiveDark]: MD3Theme,
} = {
  [IThemeType.Light]: {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: Config.PRIMARY_COLOR || MD3LightTheme.colors.primary,
      secondary: Config.SECONDARY_COLOR || MD3LightTheme.colors.secondary,
      tertiary: Config.TERTIARY_COLOR || MD3LightTheme.colors.tertiary
    }
  },
  [IThemeType.ExactDark]: {
    ...MD3DarkTheme,
    ...DarkTheme,
    mode: "exact",
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      primary: Config.PRIMARY_COLOR || MD3DarkTheme.colors.primary,
      secondary: Config.SECONDARY_COLOR || MD3DarkTheme.colors.secondary,
      tertiary: Config.TERTIARY_COLOR || MD3DarkTheme.colors.tertiary
    }
  },
  [IThemeType.AdaptiveDark]: {
    ...MD3DarkTheme,
    ...DarkTheme,
    mode: "adaptive",
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      primary: Config.PRIMARY_COLOR || MD3DarkTheme.colors.primary,
      secondary: Config.SECONDARY_COLOR || MD3DarkTheme.colors.secondary,
      tertiary: Config.TERTIARY_COLOR || MD3DarkTheme.colors.tertiary
    }
  }
};
