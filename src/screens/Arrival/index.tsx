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
import { CheckOutInHeader } from "../../components/CheckOutInHeader";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { X } from "phosphor-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { BSON } from "realm";

import { getLastSyncTimestamp } from "../../libs/storage/sync";
import { stopLocationTask } from "../../tasks/backgroundLocationTask";

type ArrivalRouteParams = {
  historic_id: string;
};

export const Arrival = () => {
  const routes = useRoute();
  const { historic_id } = routes.params as ArrivalRouteParams;
  const realm = useRealm();
  const { goBack } = useNavigation();
  const [ dataNotSynced, setDataNotSynced ] = useState(false);

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

  const handleRemoveRecordFromDataBase = () => {
    // client is cancelling the pick up, remove record from database
    realm.write(() => {
      realm.delete(vehicleHistory);
    });

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
      await stopLocationTask();

      
      realm.write(() => {
        vehicleHistory.status = "arrival";
        vehicleHistory.updated_at = new Date();
      });

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

  useEffect(()=>{
    getLastSyncTimestamp()
    .then(lastSync => setDataNotSynced(lastSync! < vehicleHistory!.updated_at.getTime()))
 
  },[])

  return (
    <Container>
      <CheckOutInHeader title={headerTitle} />
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
