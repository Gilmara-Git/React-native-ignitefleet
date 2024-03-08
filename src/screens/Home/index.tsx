import { useEffect , useState } from 'react';
import { Alert } from 'react-native';
import  { Container , Content } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery , useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';


export const Home = ()=>{
  const [vehicleInUse, setVehicleInUse ]  = useState<Historic | null>(null);

  const { navigate } = useNavigation();

  const realm = useRealm();
  const historic = useQuery(Historic);

  const fetchHistoricOfCarInUse =()=>{

    try{

      const vehicle =  historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);

    }catch(error){

      console.log(error);
      Alert.alert('Error' , 'It was not possible to load up vehicle in use.');
    }
   
  };
  
  const handleMovement = ()=>{

    if(vehicleInUse?._id){
      navigate('arrival', { historic_id: vehicleInUse._id.toString()});

    }else{
    navigate('departure');
  }};

  const fetchVehicleUsageHistoric = ()=>{
      const historicList = historic.filtered("status = 'arrival' SORT(created_at DESC)" );
      console.log(historicList);
  }

  useEffect(()=>{
    fetchVehicleUsageHistoric();
  }, [historic])

  useEffect(()=>{
    fetchHistoricOfCarInUse();
  }, [historic]);

  useEffect(()=>{
    try{
      realm.addListener('change', ()=>fetchHistoricOfCarInUse());

    }catch(error){
      `An exception was throw within the change listener: ${error}.`
    }

    return ()=>{
      realm.removeListener('change', fetchHistoricOfCarInUse);
    }
    
  },[])

    return (
        <Container >
          <Header />
          <Content>
            <CarStatus 
                onPress={handleMovement} 
                licensePlate={vehicleInUse?.license_plate}
                />
          </Content>   
        </Container>
    )
}
;