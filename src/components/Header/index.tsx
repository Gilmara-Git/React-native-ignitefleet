import React from 'react';
import { Container , GreetingBox, Greeting, UserName, UserImage, PowerButton } from './styles';
import { useSafeAreaInsets }  from 'react-native-safe-area-context'
import { Platform } from 'react-native';

import { Power } from 'phosphor-react-native';
import  theme  from '../../theme';

import { useUser , useApp } from '@realm/react';

export function Header() {
    const blurHash = 'L184iAoffQof00ayfQay~qj[fQj[';
    const user  = useUser();
    const app = useApp();


    const insets = useSafeAreaInsets();
    const paddingTop = Platform.OS === 'android' ? insets.top + 16 : insets.top + 32
    
    const handleLogout = async()=>{ 
      app.currentUser?.logOut()

    };

  return (
    <Container style={{ paddingTop }}>
        <UserImage 
            source={{ uri: user?.profile.pictureUrl}}
            placeholder={blurHash}
            transition={1000}
            />

        <GreetingBox>
            <Greeting>
                Hi
            </Greeting>

            <UserName>
               {user?.profile.name}
            </UserName>

        </GreetingBox>
        
            <PowerButton 
                activeOpacity={0.7}
                onPress={handleLogout}
                >
                <Power 
                    color={theme.COLORS.GRAY_400}
                    size={32}
                    />
            </PowerButton>

    </Container>
  );
}