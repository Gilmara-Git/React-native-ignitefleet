import React  from 'react';
import { Container , Label, PlateNumber } from './styles';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

type LicensePlateInputProps = TextInputProps & {
  label: string
};


export const LicensePlateInput = ({ label, ...rest }: LicensePlateInputProps) => {
 
    const { COLORS } = useTheme();
    

  return (
    <Container>
        <Label>
            {label}
        </Label>

        <PlateNumber 
            maxLength={7}
            autoCapitalize='characters'
            placeholderTextColor={COLORS.GRAY_400}
            {...rest}
        />

    </Container>
  );
}