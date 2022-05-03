import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Swipper from "./components/Swipper";
import Map from "./components/Map";

export default function App() {
  return (
      <View style={style.container}>
      <Map />
    </View>
  );
}

const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }
    }
)
