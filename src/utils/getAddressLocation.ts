import { reverseGeocodeAsync } from "expo-location";
import { LatLng } from "react-native-maps";
export const getAddressLocation = async ({
  latitude,
  longitude,
}: LatLng) => {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });
    
    return `${addressResponse[0]?.street ?? ''} , ${addressResponse[0].city}`;
  } catch (error) {
    console.log(error);
  }
};
