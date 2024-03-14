import React, { forwardRef  }  from 'react';
import { Container , Label, PlateNumber } from './styles';
import { TextInputProps, TextInput  } from 'react-native';
import { useTheme } from 'styled-components/native';

type LicensePlateInputProps = TextInputProps & {
  label: string
};


export const LicensePlateInput = forwardRef<TextInput,LicensePlateInputProps >(({ label, ...rest }, ref) => {
 
    const { COLORS } = useTheme();
    

  return (
    <Container>
        <Label>
            {label}
        </Label>

        <PlateNumber 
            ref={ref}
            maxLength={7}
            autoCapitalize='characters'
            placeholderTextColor={COLORS.GRAY_400}
            {...rest}
        />

    </Container>
  );
})