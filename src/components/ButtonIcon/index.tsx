import React from 'react';
import { Container } from './styles';
import { useTheme } from 'styled-components/native';

import { TouchableOpacityProps } from 'react-native';
import { IconProps  } from 'phosphor-react-native';

export type IconBoxProps = (props: IconProps)=> JSX.Element;

type ButtonIconProps = TouchableOpacityProps & {
    icon: IconBoxProps;
};


export const ButtonIcon = ({ icon: Icon, ...rest }: ButtonIconProps)=> {
    const {COLORS } = useTheme();
  return (
    <Container
        activeOpacity={0.7}
        {...rest}
    >
        
        <Icon 
          size={24} 
          color={COLORS.ORANGE_RED}/>
    </Container>
  );
}