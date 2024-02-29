import styled from 'styled-components/native';

// this is for flex to be applied only horizontally
export const Container = styled.TouchableOpacity`
    min-height: 56px;
    max-height: 56px;
    flex: 1;
    border-radius: 6px;

    align-items: center;
    justify-content: center;
    background-color: ${({theme})=> theme.COLORS.BRAND_MID};
    
`;

export const ButtonText = styled.Text`
    color: ${({theme})=> theme.COLORS.WHITE};
    font-size: ${({theme})=> theme.FONT_SIZE.MD}px;
    font-family: ${({theme})=> theme.FONT_FAMILY.BOLD}

`


export const LoadingIndicator = styled.ActivityIndicator.attrs(({theme})=>({
    color:theme.COLORS.WHITE
    
}))``