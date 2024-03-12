import React from "react";
import { Container, LicensePlate, Departure, Info } from "./styles";
import { Check, ClockClockwise } from "phosphor-react-native";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSynced: boolean;
};

type Props = TouchableOpacityProps & {
  data: HistoricCardProps;
};

export const HistoricCard = ({ data , ...rest}: Props) => {
  const { COLORS } = useTheme();

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>

        <Departure>{data.created}</Departure>
      </Info>

            { 
               data.isSynced ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={COLORS.GRAY_400} />
      )}
    </Container>
  );
};
