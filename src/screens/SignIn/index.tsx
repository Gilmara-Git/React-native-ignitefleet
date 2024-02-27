import { Container, Title, Slogan  } from './styles';
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';


export const SignIn = ()=>{
    return (
        <Container source={backgroundImg}>
            <Title>
                Ignite Fleet
            </Title>
            <Slogan>
                Vehicles usage management
            </Slogan>

            <Button title='Login with Google'/>

        </Container>
    )
       
};