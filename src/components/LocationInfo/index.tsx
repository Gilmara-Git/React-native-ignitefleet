import React from "react";
import { Container, Info, Label, Description } from "./styles";
import { IconBoxProps } from "../IconBox";
import { IconBox } from '../IconBox';


export type LocationInfoProps = {
  label: string;
  description: string;
 

};

type Props = LocationInfoProps & {
  icon: IconBoxProps;
};

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
