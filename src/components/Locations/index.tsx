
import { Container, Line } from './styles';
import { LocationInfo, LocationInfoProps } from '../LocationInfo';
import { Car, FlagCheckered  } from 'phosphor-react-native';



type LocationsProps = {
    departure: LocationInfoProps;
    arrival?: LocationInfoProps | null;

}

export function Locations({ departure, arrival = null }: LocationsProps) {

  return (
    <Container>

      { departure.label && 
        <LocationInfo 
          label={departure.label} 
          description={departure.description} 
          icon={Car}/>
      
      }
      
      { arrival && 
         <>
            <Line/>
            
            <LocationInfo label={arrival.label} description={arrival.description} icon={FlagCheckered}/>
            
        </>
      }

    </Container>
  );
}