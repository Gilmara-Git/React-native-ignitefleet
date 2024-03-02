import { useState } from 'react';
import { Alert } from 'react-native';

import { Container, Title, Slogan  } from './styles';
import backgroundImg from '../../assets/background.png';

import { Button } from '../../components/Button';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID }  from '@env';

import { Realm, useApp } from '@realm/react'; 

GoogleSignin.configure({
    scopes:['email','profile'],
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID  
});


export const SignIn = ()=>{
    const [isAuthenticating, setIsAuthenticating ] = useState(false);
    const app = useApp();

    const handleGoogleSignIn = async()=>{
       
        try{
            setIsAuthenticating(true);

            const { idToken } =  await GoogleSignin.signIn();
        
            if(idToken){

                const credentials = Realm.Credentials.jwt(idToken);
                
                app.logIn(credentials)

            }else{
                Alert.alert(
                    'Login?',
                    'Sorry, we could not connect with your Google account at the moment. Please try again'
                    );
            }
    
    
        }catch(error){
            console.log(error)
            setIsAuthenticating(false);

            Alert.alert('Something went wrong', 'It was not possible to login with your Google account at the moment. Please try again')
        }

    };

    return (
        <Container source={backgroundImg}>
            <Title>
                Ignite Fleet
            </Title>
            <Slogan>
                Vehicles usage management
            </Slogan>

            <Button 
                title='Login with Google' 
                isLoading={isAuthenticating}
                onPress={handleGoogleSignIn} 
               
                />
          

        </Container>
    )
       
};