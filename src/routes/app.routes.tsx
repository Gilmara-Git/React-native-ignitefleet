import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Departure } from '../screens/Departure'


// animation: 'fade_from_bottom' to prevent white flash screen to appear when navigation to other pages/screens
export const AppRoutes = ()=>{
    const { Navigator, Screen} = createNativeStackNavigator();

    return (
        <Navigator screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
        }}  
        >
           
            <Screen 
                name='home'
                component={Home}   
                />

            <Screen 
                name='departure'
                component={Departure}    
                />


        </Navigator>
    )
};