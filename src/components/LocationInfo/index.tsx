import React from "react";
import { Container, Info, Label, Description } from "./styles";
import { useTheme } from "styled-components/native";
import { IconBoxProps } from "../IconBox";
import { IconBox } from '../IconBox';


export type LocationInfoProps = {
  label: string;
  description: string;
  icon: IconBoxProps;

};

type Props = LocationInfoProps;

export const LocationInfo = ({ icon,  label, description }: Props) => {

  return (
    <Container>
     <IconBox icon={icon}/>
   
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  );
};
