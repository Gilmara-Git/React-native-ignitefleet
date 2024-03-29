import { Platform, Linking  } from "react-native";

export const openSettings = ()=>{
    if(Platform.OS === 'ios'){
        Linking.openURL('app-settings:')
    }

    if(Platform.OS === 'android'){
        Linking.openSettings();
    }
};