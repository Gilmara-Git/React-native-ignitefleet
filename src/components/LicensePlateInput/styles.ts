import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({theme})=>theme.COLORS.GRAY_700};

`;

export const Label =  styled.Text`
    font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
    color:${({theme})=>theme.COLORS.GRAY_300};
`;


export const PlateNumber = styled.TextInput`
    text-align: center;
    margin-top: 16px;
    font-size: ${({theme})=>theme.FONT_SIZE.XXXL}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.BOLD};
    color:${({theme})=>theme.COLORS.GRAY_200};
`