import AsyncStorage from '@react-native-async-storage/async-storage';
import { SYNC_DATA_KEY } from './storage.config';

export const saveLastSyncTimestamp = async()=>{
    try{
        const timeStamp =  new Date().getTime(); // return a number

        await AsyncStorage.setItem(SYNC_DATA_KEY, timeStamp.toString());

        return timeStamp; 


    }catch(error){
        console.log(error)
    }
};


export const getLastSyncTimestamp = async()=>{
    try{
     
        const lastSyncTime = await AsyncStorage.getItem(SYNC_DATA_KEY);
        return Number(lastSyncTime);


    }catch(error){
        console.log(error)
    }
};