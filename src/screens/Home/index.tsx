import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Container, Content, Title, Label } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@realm/react";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useQuery, useRealm } from "../../libs/realm";
import { Realm } from "@realm/react";
// import Realm from 'realm'

import { Header } from "../../components/Header";
import { CarStatus } from "../../components/CarStatus";
import { TopMessage } from "../../components/TopMessage";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import {
  saveLastSyncTimestamp,
  getLastSyncTimestamp,
} from "../../libs/storage/sync";
import Toast from "react-native-toast-message";

import dayjs from "dayjs";
import { CloudArrowUp } from "phosphor-react-native";

export const Home = () => {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

  const { navigate } = useNavigation();

  const realm = useRealm();
  const user = useUser();
  const historic = useQuery(Historic);

  const fetchVehicleInUse = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.log(error);
      Alert.alert("Alert", "No vehicle in use found.");
    }
  };

  const handleRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigate("arrival", { historic_id: vehicleInUse._id.toString() });
    } else {
      navigate("departure");
    }
  };

  const fetchHistoric = async () => {
    try {
      if (!realm.isClosed) {
        const lastTimeDataSynced = await getLastSyncTimestamp();

        const historicList = historic.filtered(
          "status = 'arrival' SORT(created_at DESC)"
        );

        const formattedUsedVehicles = historicList.map((item) => {
          return {
            id: item._id.toString(),
            licensePlate: item.license_plate,
            created: dayjs(item.created_at).format(
              "[Departured on] MM-DD-YYYY [at] hh:mm A"
            ),
            isSynced: item.updated_at.getTime() < lastTimeDataSynced!,
          };
        });
        setVehicleHistoric(formattedUsedVehicles);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Historic",
        "It was not possible to load the Vehicle Usage history."
      );
    }
  };

  const handleHistoricDetails = (id: string) => {
    navigate("arrival", { historic_id: id });
  };

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    try {
      realm.addListener("change", () => fetchVehicleInUse());
    } catch (error) {
      `An exception was throw within the change listener: ${error}.`;
    }

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicleInUse);
      }
    };
  }, []);

  // adding subscription to use Flexible synchronization with MongoDB, informing the user.id
  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id =  '${user!.id}'`);
      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
    });
  }, [realm]);

  const progressNotification = async (
    transferred: number,
    transferable: number
  ) => {
    //doc shows this way
    const percentTransferred =
      parseFloat((transferred / transferable).toFixed(2)) * 100;

    if (percentTransferred === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: "info",
        text1: `All Data has synchronized successfully.`,
      });
    }
    // Rodrigo did this way
    // const percentage = (transferred / transferable) * 100;

    if (percentTransferred < 100) {
      setPercentageToSync(`${percentTransferred}% synchronized.`);
    }
  };

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) {
      return;
    }

    //Listen fro changes to connection state
    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    );

    //Remove connection listener when component unmounts
    return () => {
      syncSession.removeProgressNotification(progressNotification);
    };
  }, []);

  return (
    <Container>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

      <Header />
      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <Title>History</Title>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Label>There are no vehicles utilized yet.</Label>
          )}
        />
      </Content>
    </Container>
  );
};
