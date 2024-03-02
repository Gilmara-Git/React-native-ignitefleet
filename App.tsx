
import { StatusBar  } from 'react-native';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold  } from '@expo-google-fonts/roboto';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import { AppProvider , UserProvider } from '@realm/react';

// REALM_APP_ID is Application ID inside MongoDB (App Service > Application > App ID)
import { REALM_APP_ID } from '@env';

export default function App() {

  
  const  [fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });


  if(!fontsLoaded){
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
          />
        <UserProvider fallback={ <SignIn/>}>
          <Routes />
        </UserProvider>
       
      </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
