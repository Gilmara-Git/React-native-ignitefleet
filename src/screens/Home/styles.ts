import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme})=> theme.COLORS.GRAY_800};
  flex: 1;
`;

export const Content = styled.View`
  padding: 0 32px;
  flex: 1;
`;
export const Title = styled.Text`
  font-size: ${({theme})=>theme.FONT_SIZE.MD}px;
  font-family: ${({theme})=>theme.FONT_FAMILY.BOLD};
  color:   ${({theme})=>theme.COLORS.WHITE};
  margin-bottom: 12px;
`;

export const Label =  styled.Text`
  font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
  font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
  color:   ${({theme})=>theme.COLORS.GRAY_400};

  text-align: center;
  margin-top: 32px;
`;