import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";

export const getAddressLocation = async ({
  latitude,
  longitude,
}: LocationObjectCoords) => {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });
    

    return `${addressResponse[0]?.street} , ${addressResponse[0].city}`;
  } catch (error) {
    console.log(error);
  }
};
