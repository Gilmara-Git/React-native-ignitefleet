import styled from 'styled-components/native';

export const Container = styled.View`
   background-color: ${({theme})=>theme.COLORS.GRAY_700};
   padding: 0 32px 24px;

   flex-direction: row;
   align-items: center;
   justify-content: space-between;

`;




export const Title = styled.Text`
  color: ${({theme})=>theme.COLORS.GRAY_100};
  font-size: ${({theme})=>theme.FONT_SIZE.MD}px;
  font-family:${({theme})=>theme.FONT_FAMILY.BOLD}
`;