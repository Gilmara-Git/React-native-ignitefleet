import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const dimensions =  Dimensions.get('window');


export const Container = styled.View`

    width: ${dimensions.width}px;
    padding-bottom: 5px;
    background-color: ${({theme})=> theme.COLORS.GRAY_500};
    
    z-index: 1;
    position: absolute;

    flex-direction: row;
    align-items: center;
    justify-content: center

`;

export const Title = styled.Text`
    color: ${({theme})=> theme.COLORS.GRAY_200};
    font-family: ${({theme})=> theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme})=> theme.FONT_SIZE.SM}px;
    margin-left: 4px;

`
