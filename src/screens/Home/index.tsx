import { useEffect, useState } from "react";
import { Alert , FlatList } from "react-native";
import { Container, Content, Title, Label } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useRealm } from "../../libs/realm";
import { useUser } from "@realm/react";
import { Historic } from "../../libs/realm/schemas/Historic";

import { Header } from "../../components/Header";
import { CarStatus } from "../../components/CarStatus";
import { HistoricCard , HistoricCardProps } from "../../components/HistoricCard";


import dayjs from "dayjs";

export const Home = () => {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const  [ vehiclesReturned, setVehiclesReturned ] = useState<HistoricCardProps[]>([]);


  const { navigate } = useNavigation();

  const realm = useRealm();
  const user = useUser();
  const historic = useQuery(Historic);

  const fetchHistoricOfCarInUse = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "It was not possible to load up vehicle in use.");
    }
  };

  const handleMovement = () => {
    if (vehicleInUse?._id) {
      navigate("arrival", { historic_id: vehicleInUse._id.toString() });
    } else {
      navigate("departure");
    }
  };

  const fetchVehicleUsageHistoric = () => {

    try{

      const historicList = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)"
      );
  
      const formattedUsedVehicles = historicList.map((item)=>{
          return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          created: dayjs(item.created_at).format('[Departured on] MM-DD-YYYY [at] hh:mm A'),
          isSynced: false
        }
  
      });
      setVehiclesReturned(formattedUsedVehicles);
    
    }catch(error){
      
      console.log(error);
      Alert.alert('Error','There was an error to load the Vehicle Usage history.')
    }
    };
  
  const handleHistoricDetails = (id: string)=>{
    navigate('arrival', { historic_id: id})
  };

  useEffect(() => {
    fetchVehicleUsageHistoric();
  }, [historic]);

  useEffect(() => {
    fetchHistoricOfCarInUse();
  }, [historic]);

  useEffect(() => {
    try {
      realm.addListener("change", () => fetchHistoricOfCarInUse());
    } catch (error) {
      `An exception was throw within the change listener: ${error}.`;
    }

    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener("change", fetchHistoricOfCarInUse);
      }
    };
  }, []);

// adding subscription to use Flexible synchronization with MongoDB, informing the user.id
useEffect(()=>{
  realm.subscriptions.update((mutableSubs, realm)=>{
    const historicByUserQuery = realm.objects('Historic').filtered(`user_id =  '${user!.id}'`);

    mutableSubs.add(historicByUserQuery, {name: 'historic_by_user'});
  })

},[realm])

  return (
    <Container>
      <Header />
      <Content>
        <CarStatus
          onPress={handleMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <Title>History</Title>

        <FlatList 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100}}
            data={vehiclesReturned}
            keyExtractor={item => item.id}
            renderItem={({item})=> (
              <HistoricCard 
                  data={item}
                  onPress={()=>handleHistoricDetails(item.id)}
              />
            )}

            ListEmptyComponent={()=>(
              <Label>There are no vehicles utilized yet.</Label>
            )}
            />
      </Content>
    </Container>
  );
};
