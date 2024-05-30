import {adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, MD3Theme} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme
} from "@react-navigation/native";
import Config from "react-native-config";
import {IThemeType} from "constants/system/system.constant";

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
});

export interface ITheme extends MD3Theme, Theme {
  colors: MD3Theme["colors"] & Theme["colors"] & {
    success: string,
    onSuccess: string,
    successContainer: string,
    onSuccessContainer: string,
    warning: string,
    onWarning: string,
    warningContainer: string,
    onWarningContainer: string,
    info: string,
    onInfo: string,
    infoContainer: string,
    onInfoContainer: string,
  }
}

export const THEME: {
  [IThemeType.Light]: ITheme,
  [IThemeType.ExactDark]: ITheme,
  [IThemeType.AdaptiveDark]: ITheme,
} = {
  [IThemeType.Light]: {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: Config.PRIMARY_COLOR || MD3LightTheme.colors.primary,
      secondary: Config.SECONDARY_COLOR || MD3LightTheme.colors.secondary,
      tertiary: Config.TERTIARY_COLOR || MD3LightTheme.colors.tertiary,
      success: "rgb(56, 107, 1)",
      onSuccess: "rgb(255, 255, 255)",
      successContainer: "rgb(183, 244, 129)",
      onSuccessContainer: "rgb(13, 32, 0)",
      warning: "rgb(121, 89, 0)",
      onWarning: "rgb(255, 255, 255)",
      warningContainer: "rgb(255, 223, 160)",
      onWarningContainer: "rgb(38, 26, 0)",
      info: "rgb(0, 99, 154)",
      onInfo: "rgb(255, 255, 255)",
      infoContainer: "rgb(206, 229, 255)",
      onInfoContainer: "rgb(0, 29, 50)"
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
      tertiary: Config.TERTIARY_COLOR || MD3DarkTheme.colors.tertiary,
      success: "rgb(156, 215, 105)",
      onSuccess: "rgb(26, 55, 0)",
      successContainer: "rgb(40, 80, 0)",
      onSuccessContainer: "rgb(183, 244, 129)",
      warning: "rgb(248, 189, 42)",
      onWarning: "rgb(64, 45, 0)",
      warningContainer: "rgb(92, 67, 0)",
      onWarningContainer: "rgb(255, 223, 160)",
      info: "rgb(150, 204, 255)",
      onInfo: "rgb(0, 51, 83)",
      infoContainer: "rgb(0, 74, 117)",
      onInfoContainer: "rgb(206, 229, 255)"
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
      tertiary: Config.TERTIARY_COLOR || MD3DarkTheme.colors.tertiary,
      success: "rgb(156, 215, 105)",
      onSuccess: "rgb(26, 55, 0)",
      successContainer: "rgb(40, 80, 0)",
      onSuccessContainer: "rgb(183, 244, 129)",
      warning: "rgb(248, 189, 42)",
      onWarning: "rgb(64, 45, 0)",
      warningContainer: "rgb(92, 67, 0)",
      onWarningContainer: "rgb(255, 223, 160)",
      info: "rgb(150, 204, 255)",
      onInfo: "rgb(0, 51, 83)",
      infoContainer: "rgb(0, 74, 117)",
      onInfoContainer: "rgb(206, 229, 255)"
    }
  }
};
