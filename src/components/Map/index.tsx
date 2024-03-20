import { useRef } from 'react';
import MapView ,{ PROVIDER_GOOGLE,  MapViewProps, LatLng, Marker, Polyline } from 'react-native-maps';
import { IconBox } from '../IconBox';
import { Car, FlagCheckered } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';



type MapProps =  MapViewProps & {
        coordinates: LatLng[], 
    };


export const Map =({coordinates, ...rest}: MapProps)=>{
    const lastCoordinates = coordinates[coordinates.length - 1]; 

    const mapRef = useRef<MapView>(null);
  const { COLORS }  = useTheme();


    const onMapUploaded = async()=>{
      if(coordinates.length > 1){ 
        mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
          edgePadding: {top:50, bottom: 50, left: 50, right: 50},
 
        });
      }
    };


    return (
    
        <MapView 
                ref={mapRef}
                onMapLoaded={onMapUploaded}
                style={{width: '100%', height: 200}}
                provider={PROVIDER_GOOGLE}
                region={{
                latitude: lastCoordinates.latitude,
                longitude: lastCoordinates.longitude,  
                latitudeDelta: 0.009,
                longitudeDelta: 0.004
            } }
            {...rest}
            >
          <Marker identifier='departure' coordinate={coordinates[0]}>
            <IconBox size='SMALL' icon={Car}/>
          </Marker>
            {

                coordinates.length > 1 &&
                <>
                  <Marker identifier='arrival' coordinate={lastCoordinates}>
                      <IconBox size='SMALL' icon={FlagCheckered}/>

                  </Marker>

                  <Polyline 
                    coordinates={[...coordinates]}
                    strokeWidth={4}
                    strokeColor={ COLORS.BRAND_MID}
                    /> 

                </>
            }
             
        </MapView>
    
    )
};