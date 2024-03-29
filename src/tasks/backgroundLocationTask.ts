import * as TaskManager from "expo-task-manager";
import {
  Accuracy,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  hasStartedLocationUpdatesAsync,
} from "expo-location";
import { saveStorageLocationCoords, removeStorageLocationCoords } from "../libs/storage/locationCoordsStorage";

const BACKGROUND_TASK_NAME = "location-tracking";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    if (data) {
      // console.log("DATA => ", data);
      // const { locations } = data;
      // console.log("LOCATION => ", locations);

      const { coords, timestamp } = data.locations[0];
      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: timestamp,
      };

      await saveStorageLocationCoords(currentLocation);
 
    }
  } catch (error) {
    console.log(error);
    await stopLocationTask();
  }
});

export const startLocationTask = async () => {
  const hasTaskStarted = await hasStartedLocationUpdatesAsync(
    BACKGROUND_TASK_NAME
  );
  // if there is a current task location running and we need to start a new one, we just stop de current one and start a new one
  if (hasTaskStarted) {
    await stopLocationTask();
  }

  try {
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

export const stopLocationTask = async () => {

  try {
    const hasTaskStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasTaskStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
      await removeStorageLocationCoords();
    }
  } catch (error) {
    console.log(error);
  }
};
