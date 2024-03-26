import { Realm } from '@realm/react';
import { ObjectSchema } from 'realm'; 

export type CoordsSchemaProps = {
    latitude: number;
    longitude: number;
    timestamp: number;
}


export class Coords extends Realm.Object<Coords>{
    latitude!: number;
    longitude!: number;
    timestamp!: number;


    static generate({latitude,longitude,timestamp}: CoordsSchemaProps){
        return {
            latitude,
            longitude,
            timestamp
        }
    }


    static schema: ObjectSchema = {
        name: 'Coords',
        embedded: true, // indicating this, Schema will be embedded in another Schema (Historic Schema in our Case)
        properties:{
            latitude:'float',
            longitude: 'float',
            timestamp: 'float'
        }

    }

}