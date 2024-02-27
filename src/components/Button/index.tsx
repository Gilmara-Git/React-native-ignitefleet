import { Container, ButtonText, LoadingIndicator } from './styles';
import { TouchableOpacityProps} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
}

export const Button = ({ title, isLoading=false }:ButtonProps)=>{
    return (
        <Container
            activeOpacity={0.7}
            disabled={isLoading}
            >
            {isLoading ? 
                <LoadingIndicator /> 
                :
                <ButtonText>
                    {title}
                </ButtonText>

        }
        </Container>
    )
};