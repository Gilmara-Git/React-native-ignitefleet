import 'react-native-get-random-values'; // this to generate id with UUID()
import { StatusBar  } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold  } from '@expo-google-fonts/roboto';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components/native';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';
import { TopMessage } from './src/components/TopMessage'; 

import { AppProvider , UserProvider } from '@realm/react';
import { RealmProvider, syncConfig } from './src/libs/realm';
import { Routes } from './src/routes';
import { WifiSlash } from 'phosphor-react-native';

import { useNetInfo } from "@react-native-community/netinfo";






// REALM_APP_ID is Application ID inside MongoDB (App Service > Application > App ID)
import { REALM_APP_ID } from '@env';

export default function App() {

  const internetInfo = useNetInfo();



  const  [fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });


  if(!fontsLoaded){
    return (
      <Loading />
    )
  };


  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
      <SafeAreaProvider style={{ flex:1, backgroundColor: theme.COLORS.GRAY_800}}>

        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
          />

          { !internetInfo.isConnected && 
              <TopMessage 
                title='You device is Offline' 
                icon={WifiSlash}
                />
          
          }

        <UserProvider fallback={ <SignIn/>}>
          <RealmProvider fallback={Loading} sync={syncConfig}>
            <Routes />
          </RealmProvider>
        </UserProvider>
       
      </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
