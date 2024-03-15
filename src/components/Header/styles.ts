import styled from 'styled-components/native';
import { Image } from 'expo-image';


export const Container = styled.View`
  flex-direction: row;
  background-color: ${({theme})=>theme.COLORS.GRAY_700};
  padding: 32px;
  width: 100%;
  align-items: center;

`;

export const UserImage = styled(Image)`
  height: 54px;
  width: 54px;
  border-radius: 7px;

`;

export const GreetingBox = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const Greeting = styled.Text`
  color: ${({theme})=>theme.COLORS.GRAY_100};
  font-size: ${({theme})=>theme.FONT_SIZE.MD}px;
  font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
`

export const UserName = styled.Text`
  color: ${({theme})=>theme.COLORS.GRAY_100};
  font-size: ${({theme})=>theme.FONT_SIZE.LG}px;
  font-family: ${({theme})=>theme.FONT_FAMILY.BOLD};
`

export const PowerButton =  styled.TouchableOpacity``