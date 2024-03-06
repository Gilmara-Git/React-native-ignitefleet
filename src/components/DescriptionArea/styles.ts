import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
    width: 100%;
    padding: 16px;
    height: 150px;
    border-radius: 6px;
    background-color: ${({theme})=>theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
    font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
    color:${({theme})=>theme.COLORS.GRAY_300};`;

export const TextBox = styled(TextInput)`
    /* text-align: left; */
    margin-top: 16px;
    vertical-align: top;
    font-size: ${({theme})=>theme.FONT_SIZE.MD}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
    color:${({theme})=>theme.COLORS.GRAY_200};
`;

