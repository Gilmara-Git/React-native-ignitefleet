import React , { useState , useRef } from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView , Platform } from 'react-native';

import { Container, Content  } from './styles';

import { CheckOutInHeader } from '../../components/CheckOutInHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { DescriptionArea } from '../../components/DescriptionArea';
import { Button } from '../../components/Button';


export function Departure() {
    const [ licensePlate, setLicensePlate ] = useState('');
    const [ description, setDescription ] = useState('');
    const descriptionAreaRef = useRef<TextInput>(null);

    const keyboardAvoidBehavior = Platform.OS === 'android' ? 'height': 'position';

    const handleCarPickUp = () =>{
        console.log('ready to pick up car')
    };

  return (
    <Container>
      <CheckOutInHeader title="Pick Up" />
      <KeyboardAvoidingView style={{ flex:1 }} behavior={keyboardAvoidBehavior}>
          <ScrollView>
            <Content>
              <LicensePlateInput
                value={licensePlate}
                onChangeText={setLicensePlate}
                label="License Plate"
                placeholder="USYI897"
                onSubmitEditing={() => descriptionAreaRef.current?.focus()}
                returnKeyType="next"
              />

              <DescriptionArea
                ref={descriptionAreaRef}
                value={description}
                onChangeText={setDescription}
                label="Purpose"
                placeholder="I will use this car for ..."
                onSubmitEditing={handleCarPickUp}
                returnKeyType="next"
                blurOnSubmit={true}
              />
            
          
            
              <Button title="Register Pick up" onPress={handleCarPickUp} />
            </Content>
            </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}