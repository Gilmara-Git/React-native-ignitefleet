import React , { useState , useRef, useEffect  } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';

import { Container, Content , Message } from './styles';

import { CheckOutInHeader } from '../../components/CheckOutInHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { DescriptionArea } from '../../components/DescriptionArea';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { LocationInfo } from '../../components/LocationInfo';
import { Map } from '../../components/Map';

import { licensePlateValidation } from '../../utils/licensePlateValidation';
import { getAddressLocation } from '../../utils/getAddressLocation';

import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { Car } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { 
  useForegroundPermissions, 
  watchPositionAsync, 
  LocationAccuracy, 
  LocationSubscription, 
  LocationObjectCoords } 
  from 'expo-location';
  

export const Departure= () =>{
  const [ licensePlate, setLicensePlate ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ isRegistering, setIsRegistering ] = useState(false);
  const [ isLoadingLocation, setIsLoadingLocation ] = useState(true);
  const [ currentAddress, setCurrentAddress ]  =  useState<string|null>(null);
  const [ currentCoords, setCurrentCoords ] = useState<LocationObjectCoords | null>(null);

  const [locationForegroundPermission, requestLocationForegroundPermission ] = useForegroundPermissions();

    const descriptionAreaRef = useRef<TextInput>(null);
    const licensePlateRef = useRef<TextInput>(null);

    const realm = useRealm();
    const user = useUser();
    const { goBack} = useNavigation();
   

    const handleDepartureRegister = () =>{

      try{
        if(!licensePlateValidation(licensePlate)){
          licensePlateRef.current?.focus();
          return Alert.alert('You have entered an invalid license plate format.')
        }
        
        //description.trim().length === 0 is another way to validate the description
        if(!description.trim()){
          return Alert.alert('Inform Purpose','Explain the reason you need this car.')
        }
        

        if(!currentCoords?.latitude && !currentCoords?.longitude){
          return Alert.alert('Location','It was not possible to retrieve current location. Try again.')
        }
        setIsRegistering;(true)
    

        realm.write(()=> {
          realm.create('Historic', Historic.generate({ 
            user_id: user!.id, 
            license_plate: licensePlate, 
            description}) 
            );
        });

        Alert.alert('Congratulations','Car pick up was successfully registered.');
        goBack();
        

       }catch(error){

        console.log(error);
        Alert.alert('Error.','It was not possible to register your car pick up.');

       }finally{
        setIsRegistering(false);
       }
    };

    useEffect(()=>{
      requestLocationForegroundPermission()
    },[]);
    
    useEffect(()=>{

      if(!locationForegroundPermission?.granted){
        return;
      }

      let subscription: LocationSubscription = { remove: ()=>{}} ;
   

      watchPositionAsync({
        accuracy: LocationAccuracy.High,
        timeInterval: 1000
      }, (location)=>{
        setCurrentCoords(location.coords)
        getAddressLocation(location.coords)
        .then((address)=> {
         if(address){

          setCurrentAddress(address);

         }
        })
        .finally(()=> setIsLoadingLocation(false)); 
      })
      .then((response) => subscription = response );
      
      return ()=>{
          if(subscription){
            subscription.remove();

          }
      }; 


    },[locationForegroundPermission]);


    if(!locationForegroundPermission?.granted){
      return (
        <Container>
          <CheckOutInHeader title='Departure'/>
          <Message>
            Please go to settings, Apps, select IgniteFleet, Location, Grant permission and mark Ask every time,
            so the MAP can be displayed on your screen. 
          </Message>
        </Container>
      )
    }

    if(isLoadingLocation){
      return (<Loading />)
    }

  return (
    <Container>
      <CheckOutInHeader title="Pick Up" />
      <KeyboardAwareScrollView extraHeight={100}>
          <ScrollView>

            { currentCoords && 
                  <Map coordinates={[currentCoords]}/>
            
            }

            <Content>
                {
                  currentAddress && 
                  <LocationInfo 
                    icon={Car}
                    label='Current Location' 
                    description={currentAddress}
                  
                    />

                }
                  <LicensePlateInput
                    ref={licensePlateRef}
                    value={licensePlate}
                    onChangeText={setLicensePlate}
                    label="License Plate"
                    placeholder="USY8L97"
                    onSubmitEditing={() => descriptionAreaRef.current?.focus()}
                    returnKeyType="next"
                  />
                  

                  <DescriptionArea
                    ref={descriptionAreaRef}
                    value={description}
                    onChangeText={setDescription}
                    label="Purpose"
                    placeholder="I will use this car for ..."
                    onSubmitEditing={handleDepartureRegister}
                    returnKeyType="next"
                    blurOnSubmit={true}
                  />
                
              
                
                  <Button 
                    title="Register Pick up" 
                    onPress={handleDepartureRegister}
                    isLoading={isRegistering}
                    />
            </Content>
            </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}