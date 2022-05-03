import MapView, {Marker} from "react-native-maps"
import { StyleSheet, Text, View } from "react-native";
import { getAll  } from "../firebase";
import { useEffect, useState } from "react";

const Map = () => {
  const [cities, setCities] = useState(null)
  const [loading, setLoading] = useState(true)

  async function populate() {
    const cities = await getAll("cities")
    return setCities(cities)
  }

  useEffect(() => {
    if(!cities) {
      populate();
    }
    if(cities) {
      setLoading(false);
    }
  }, [cities])

  return (
    loading ? (
      <View style={styles.loading}>
        <Text>Chargement des villes</Text>
      </View>

      ) :
    (<View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
      >
        {cities.map((city, index)=> (
          <Marker
            key={index}
            coordinate={{ latitude: city.lat, longitude: city.lng }}
            title={city.name}
          />
        ) )}
      </MapView>
    </View>)
  )
}

const styles = StyleSheet.create(
  {
    loading: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  },
);

export default Map;
