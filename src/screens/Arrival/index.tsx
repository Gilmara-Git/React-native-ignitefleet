
import React from 'react';
import { Alert } from 'react-native';
import { Container , Content, Label, LicensePlate, Footer, Description } from './styles';
import { CheckOutInHeader } from '../../components/CheckOutInHeader';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';
import { useRoute , useNavigation } from '@react-navigation/native';

import { useObject, useRealm  } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';


type ArrivalRouteParams = {
  historic_id: string
}

export const Arrival= ()=> {

    const routes  = useRoute();
    const { historic_id } = routes.params as ArrivalRouteParams;
    const realm = useRealm();
    const { goBack } = useNavigation();
   

    // const id = new BSON.UUID(historic_id)
    // console.log(Object.prototype.toString.call(id), 'linha25') // object Object
    
    const currentRegisteredCar = useObject(Historic, new BSON.UUID(historic_id));
    
    const handleCancelCarPickup = ()=>{
      Alert.alert('Cancel','Do you want to cancel this pick up?', [
        {
          text: 'No', 
          style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: ()=>{handleRemoveRecordFromDataBase()}

        }
      ])
    };

      const handleRemoveRecordFromDataBase = ()=>{
       
        // client is cancelling the pick up, remove record from database
          realm.write(()=>{
          realm.delete(currentRegisteredCar);
          
        })
     
        goBack();
    }

    const handleArrivalRegistration = ()=>{
      try{
        if(!currentRegisteredCar){
          return Alert.alert('Error','Could not retrieve the vehicle information from the database. Please try again')
        }
          realm.write(()=>{
            currentRegisteredCar.status = 'arrival';
            currentRegisteredCar.updated_at = new Date();
  
          });

          Alert.alert('Arrival','Your vehicle arrival was successfully registered.')
          goBack();

      }catch(error){
        console.log(error);
        Alert.alert('Error','It was not possible to register the vehicle arrival.')

      }

    };

  return (
    <Container>
      <CheckOutInHeader title="Arrival"/>
      <Content>
        <Label>
         License Plate
        </Label>

        <LicensePlate>
        { currentRegisteredCar?.license_plate}
        </LicensePlate>

        <Label>
          Purpose
        </Label>

        <Description>
          { currentRegisteredCar?.description}
        </Description>

        <Footer>
          <ButtonIcon 
            icon={X} 
            onPress={handleCancelCarPickup}
            />
          <Button 
          title='Register Arrival'
          onPress={handleArrivalRegistration}
          />
        </Footer>
      </Content>
     

    </Container>
  );
}