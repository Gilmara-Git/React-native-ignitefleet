import React from 'react';
import { Container } from './styles';
import { SizeProps } from './styles';
import { IconProps } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

export type IconBoxProps = (props: IconProps )=> JSX.Element;

type Props =  {
    size?: SizeProps;
    icon: IconBoxProps
}

export const IconBox = ({ size= 'NORMAL', icon:Icon }: Props)=> {
    const iconSize =  'NORMAL'? 24 : 16;
    const { COLORS }  = useTheme();

  return (
    <Container size={size}>
        <Icon size={iconSize} color={COLORS.BRAND_LIGHT}/>
    </Container>
  );
}