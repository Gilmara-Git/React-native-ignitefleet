import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { Container, Label, TextBox } from './styles';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

type DescriptionAreaProps = TextInputProps & {
    label: string;
}

export const DescriptionArea = forwardRef<TextInput, DescriptionAreaProps>(({ label, ...rest}, ref)=> {
const { COLORS } = useTheme();

  return (
    <Container>
        <Label>
            {label}
        </Label>

        <TextBox 
            ref={ref}
            multiline  
            placeholderTextColor={COLORS.GRAY_400}
            autoCapitalize='sentences'
            {...rest}/> 

    </Container>
  );
})