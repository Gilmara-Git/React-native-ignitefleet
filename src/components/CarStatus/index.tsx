import React from 'react';
import { Key, Car } from 'phosphor-react-native';
import { Container, IconBox, Message, TextHighlighted  } from './styles';
import { TouchableOpacityProps } from 'react-native';
import  theme from '../../theme';


type CarStatus = TouchableOpacityProps & {
    licensePlate?:  string | null;
}

export function CarStatus({ licensePlate = null, ...rest }: CarStatus) {
    const Icon = licensePlate ? Car : Key;
    const message = licensePlate ?  `Vehicle ${licensePlate} in use. ` : 'There is no vehicle in use. '
    const status = licensePlate ? 'arrival.': 'pick up.'

    return (
    <Container 
    {...rest}
    >
        <IconBox>
            <Icon size={52}
                  color={theme.COLORS.BRAND_LIGHT}  
            />
        </IconBox>
      

        <Message>
            { message}
        
                <TextHighlighted>
                     Click here to register a { status }
                </TextHighlighted>
           
        </Message>


  

    </Container>
  );
}