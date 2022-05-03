import Card from "./Card";
import { useRef, useState } from "react";
import { Animated, PanResponder, View, Vibration, StyleSheet } from "react-native";
import { addCity } from "../firebase";
import data from "../Data/Cities.json";
import axios from "axios";

const Swipper = ({navigation}) => {
  const [city, setCity] = useState(data.cities[Math.floor(Math.random()*data.cities.length)])
  const [allowAdding, setAllowAdding] = useState(false)
  const [key] = useState("AIzaSyCIn8M1Rsiq7FliMwo6M1BJVRJRnlbbUfs")

  const onNavigate = () => {
    navigation.navigate("Map");
  };
  let pan = useRef(new Animated.ValueXY()).current;
  let panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {dx: pan.x, dy: pan.y}
                ], { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
              // right move allow city to be add to firebase
              if (pan.x._value < -150) setAllowAdding(true)
              // left move generate new city
              if (pan.x._value > 150) {
                const temp = data.cities[Math.floor(Math.random() * data.cities.length)]
                setCity(temp);
              }
              pan.setValue({
                x: 0,
                y: 0
              })

              pan.flattenOffset();
            }
        })
    ).current;

  if (allowAdding) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city.name}&key=${key}`)
      .then(res => {
        const location = res.data.results[0].geometry.location
        addCity({...city, lat:location.lat, lng:location.lng})

      }).finally(
      setAllowAdding(false),
      setCity(data.cities[Math.floor(Math.random() * data.cities.length)]),
    )

    //Android apps should request the android.permission.VIBRATE permission
    //by adding <uses-permission android:name="android.permission.VIBRATE"/> to AndroidManifest.xml.
    Vibration.vibrate(100,100,50)
  }
    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}]
                }}
                {...panResponder.panHandlers}>
                <Card ville={city.name} pays={city.country}/>
            </Animated.View>
        </View>
)
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  },
);

export default Swipper;
