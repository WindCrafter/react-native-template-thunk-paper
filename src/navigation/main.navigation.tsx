import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {
    NAVIGATION_DETAIL_LOGS_BUG_SCREEN,
    NAVIGATION_HOME_SCREEN,
    NAVIGATION_LOGS_BUG_SCREEN, NAVIGATION_RELEASE_LOGS_SCREEN
} from "constants/system/navigation.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import HomeScreen from "screens/home/home.screen";
import LogsBugScreen from "screens/logsBugFileStorage/logsBug.screen";
import DetailLogsBugScreen from "screens/logsBugFileStorage/detail.LogsBug.screen";
import languages from "constants/system/languages";
import ReleaseLogsScreen from "screens/releaseLogs/releaseLogs.screen";


const StackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
    const {styles} = useSystemTheme();


    return (
        <StackNavigator.Navigator
            initialRouteName={NAVIGATION_HOME_SCREEN}
        >
            <StackNavigator.Screen name={NAVIGATION_HOME_SCREEN} options={{title: languages.home.home}}
                                   component={HomeScreen}/>
            <StackNavigator.Screen name={NAVIGATION_LOGS_BUG_SCREEN} options={{title: languages.logsBug.logs}}
                                   component={LogsBugScreen}/>
            <StackNavigator.Screen name={NAVIGATION_DETAIL_LOGS_BUG_SCREEN}
                                   options={{title: languages.detailLogsBug.detail}} component={DetailLogsBugScreen}/>
            <StackNavigator.Screen name={NAVIGATION_RELEASE_LOGS_SCREEN}
                                   options={{title: languages.releaseLogs.logs}} component={ReleaseLogsScreen}/>

        </StackNavigator.Navigator>
    );
};

export default MainNavigator;
