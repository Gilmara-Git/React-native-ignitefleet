import  { Container , Content } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';


export const Home = ()=>{
  const { navigate } = useNavigation();
  
  const handleMovement = ()=>{
    navigate('departure');
  };

    return (
        <Container >
          <Header />
          <Content>
            <CarStatus onPress={handleMovement}/>
          </Content>   
        </Container>
    )
};