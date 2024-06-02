import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import ChannelListScreen from "screens/channel/channelList.screen";

import {IconBack} from "assets/svgIcons";
import {HIT_SLOP_EXPAND_10} from "constants/system.constant";
import navigationHelper from "helpers/navigation.helper";
import {TouchableOpacity} from "react-native";
import {HS} from "ui/sizes.ui";
import {
    NAVIGATION_DETAIL_LOGS_BUG_SCREEN,
    NAVIGATION_HOME_SCREEN,
    NAVIGATION_LOGS_BUG_SCREEN
} from "constants/system/navigation.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import HomeScreen from "screens/home/home.screen";
import LogsBugScreen from "screens/logsBugFileStorage/logsBug.screen";
import DetailLogsBugScreen from "screens/logsBugFileStorage/detail.LogsBug.screen";
import languages from "constants/system/languages";


const StackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
    const {styles} = useSystemTheme();


    return (
        <StackNavigator.Navigator
            initialRouteName={NAVIGATION_HOME_SCREEN}
            // screenOptions={{
            //     headerStyle: {
            //         backgroundColor: theme.background
            //     },
            //     headerTitleAlign: "center",
            //     headerTintColor: theme.text,
            //     animation: "slide_from_right",
            //     headerBackTitleVisible: false,
            //     headerBackTitle: "",
            //     headerShadowVisible: false,
            //     headerLeft: (props) => {
            //         return (
            //             <TouchableOpacity activeOpacity={0.8} onPress={navigationHelper.goBack}
            //                               hitSlop={HIT_SLOP_EXPAND_10}
            //                               style={{marginRight: HS._10}}>
            //                 <IconBack color={theme.iconDark}/>
            //             </TouchableOpacity>
            //         )
            //     }
            // }}
        >
            <StackNavigator.Screen name={NAVIGATION_HOME_SCREEN} options={{title:languages.home.home}} component={HomeScreen}/>
            <StackNavigator.Screen name={NAVIGATION_LOGS_BUG_SCREEN} options={{title:languages.logsBug.logs}} component={LogsBugScreen}/>
            <StackNavigator.Screen name={NAVIGATION_DETAIL_LOGS_BUG_SCREEN} options={{title:languages.detailLogsBug.detail}} component={DetailLogsBugScreen}/>

        </StackNavigator.Navigator>
    );
};

export default MainNavigator;
