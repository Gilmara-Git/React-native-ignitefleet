import styled , { css }  from 'styled-components/native';

export type SizeProps = 'SMALL'|'NORMAL';

type Props = {
  size: SizeProps;
}

const variantSizeStyles = (size: SizeProps)=>{
  return{
    SMALL:  css`
      height: 32px;
      width: 32px;
    `,
    NORMAL: css`
     height: 46px;
     width:  46px;
    `
  }[size];

};

export const Container = styled.View<Props>`

border-radius: 6px;
justify-content: center;
align-items: center;
margin-right: 12px;


  ${({size})=> variantSizeStyles(size)};
  background-color: ${({theme})=>theme.COLORS.GRAY_700};



`;