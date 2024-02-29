import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.COLORS.BRAND_MID};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme})=> theme.COLORS.WHITE};
  font-size: ${({theme})=> theme.FONT_SIZE.LG}px;
  font-family: ${({theme})=> theme.FONT_FAMILY.BOLD};
`