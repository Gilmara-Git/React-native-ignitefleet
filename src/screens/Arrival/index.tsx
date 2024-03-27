import React, { useState , useEffect } from "react";
import { Alert } from "react-native";
import {
  Container,
  Content,
  Label,
  LicensePlate,
  Footer,
  Description,
  AsyncMessage,
} from "./styles";
import { X } from "phosphor-react-native";

import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { CheckOutInHeader } from "../../components/CheckOutInHeader";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { BSON } from "realm";

import { getLastSyncTimestamp } from "../../libs/storage/sync";
import { stopLocationTask } from "../../tasks/backgroundLocationTask";

import { getStorageLocationCoords }  from '../../libs/storage/locationCoordsStorage';
import { LatLng  } from "react-native-maps";
import { Map } from "../../components/Map";

type ArrivalRouteParams = {
  historic_id: string;
};

export const Arrival = () => {
  const routes = useRoute();
  const { historic_id } = routes.params as ArrivalRouteParams;
  const realm = useRealm();
  const { goBack } = useNavigation();
  const [ dataNotSynced, setDataNotSynced ] = useState(false);
  const [ coordinates, setCoordinates  ] = useState<LatLng[]>([]);



  // const id = new BSON.UUID(historic_id)
  // console.log(Object.prototype.toString.call(id), 'linha25') // object Object

  const vehicleHistory = useObject(Historic, new BSON.UUID(historic_id));

  const headerTitle =
    vehicleHistory?.status === "departure" ? "Arrival" : "Details";

  const handleCancelCarPickup = () => {
    Alert.alert("Cancel", "Do you want to cancel this pick up?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          handleRemoveRecordFromDataBase();
        },
      },
    ]);
  };

  const handleRemoveRecordFromDataBase = async() => {
    // client is cancelling the pick up, remove record from database
    realm.write(() => {
      realm.delete(vehicleHistory);
    });

    await stopLocationTask()

    goBack();
  };

  const handleArrivalRegistration = async() => {
    try {
      if (!vehicleHistory) {
        return Alert.alert(
          "Error",
          "Could not retrieve the vehicle information from the database. Please try again"
        );
      }
      
      const locationsFromAsyncStorage = await getStorageLocationCoords();


      realm.write(() => {
        vehicleHistory.status = "arrival";
        vehicleHistory.updated_at = new Date();
        vehicleHistory.coords.push(...locationsFromAsyncStorage)    
      });
      
      await stopLocationTask();
    

      Alert.alert(
        "Arrival",
        "Your vehicle arrival was successfully registered."
      );


      goBack();
    } catch (error) {
  
      console.log(error);
      Alert.alert(
        "Error",
        "It was not possible to register the vehicle arrival."
      );
    }
  };

  const getInfoLocation = async()=>{
    
    // this prevents to get to an error to retrieve the updated_at
    
    if(!vehicleHistory){
      return;
    }


    const lastSync = await getLastSyncTimestamp();
    const updated_at =  vehicleHistory!.updated_at.getTime();
    setDataNotSynced(updated_at > lastSync!);

      if(vehicleHistory?.status === 'departure'){
        const coords =  await getStorageLocationCoords();
        setCoordinates(coords);

      }else{
        const coordsFromDB =  vehicleHistory?.coords.map((coord)=>{
          return {
            latitude: coord.latitude,
            longitude: coord.longitude,
            timestamp: coord.timestamp
          }
        })

        setCoordinates(coordsFromDB ?? [])
      }
  };

  useEffect(()=>{
    getInfoLocation ();
 
  },[vehicleHistory])

  return (
    <Container>
      <CheckOutInHeader title={headerTitle} />

        { coordinates.length > 0  && 
          <Map coordinates={coordinates}/> 
        }

      <Content>


        <Label>License Plate</Label>

        <LicensePlate>{vehicleHistory?.license_plate}</LicensePlate>

        <Label>Purpose</Label>

        <Description>{vehicleHistory?.description}</Description>
      </Content>
      {vehicleHistory?.status === "departure" && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleCancelCarPickup} />
          <Button
            title="Register Arrival"
            onPress={handleArrivalRegistration}
          />
        </Footer>
      )}
    { dataNotSynced &&
      <AsyncMessage>
        Synchronization of {vehicleHistory?.status === "departure" ? "departure": "Arrival"} pending.
      </AsyncMessage>
    
    }
    </Container>
  );
};
