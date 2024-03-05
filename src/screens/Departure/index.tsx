import React , { useState } from 'react';
import { Container, Content  } from './styles';
import { CheckOutInHeader } from '../../components/CheckOutInHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';


export function Departure() {

    const [ inputValue, setInputValue ] = useState('');

  return (
    <Container>
        <CheckOutInHeader title='Pick Up'/>

        <Content>

        <LicensePlateInput 
            value={inputValue}
            onChangeText={setInputValue}
            label='License Plate'
            placeholder='USYi897'
            />

        </Content>
    </Container>
  );
}