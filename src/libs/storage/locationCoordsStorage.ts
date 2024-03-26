
import { LOCATION_COORDS_LIST } from './storage.config';
import AsyncStorage from '@react-native-async-storage/async-storage';


type LocationProps = {
    latitude: number;
    longitude: number;
    timestamp: number;

}

export const getStorageLocationCoords = async()=>{
    const storage = await AsyncStorage.getItem(LOCATION_COORDS_LIST);
    
    const coordsList = storage ? JSON.parse(storage) :  [];
    return coordsList;

};

export const saveStorageLocationCoords = async(newLocation: LocationProps)=>{
   
    const coordsList  = await getStorageLocationCoords();

    coordsList.push(newLocation);
    await AsyncStorage.setItem(LOCATION_COORDS_LIST, JSON.stringify(coordsList));

};

export const removeStorageLocationCoords = async()=>{
    await AsyncStorage.removeItem(LOCATION_COORDS_LIST);
}