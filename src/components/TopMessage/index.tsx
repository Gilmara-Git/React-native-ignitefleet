import React from 'react';
import { Container, Title } from './styles';
import { IconBoxProps } from '../ButtonIcon';
import { useTheme } from 'styled-components/native';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';


type TopMessageProps = {
    icon?: IconBoxProps;
    title: string
}

export const  TopMessage = ({title, icon:Icon }: TopMessageProps)=> {
    const { COLORS } = useTheme();
    
    const insets = useSafeAreaInsets()
    const paddingTop = insets.top + 5;
 
    return (
    <Container style={{paddingTop}}>
    
     { Icon && 

    <Icon 
    size={18}
    color={COLORS.GRAY_100}
    />
    }
     <Title>
        {title}
     </Title>
    </Container>
  );
}