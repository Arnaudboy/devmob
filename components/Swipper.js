import Card from "./Card";
import { useRef, useState } from "react";
import {Animated, PanResponder, View, Vibration} from "react-native";
import { addCity } from "../firebase";
import data from "../Data/Cities.json"

const Swipper = () => {
  const [city, setCity] = useState(data.cities[Math.floor(Math.random()*data.cities.length)])
  const [allowAdding, setAllowAdding] = useState(false)

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
    addCity(city)
    setAllowAdding(false)
    setCity(data.cities[Math.floor(Math.random() * data.cities.length)])
    //Android apps should request the android.permission.VIBRATE permission
    // by adding <uses-permission android:name="android.permission.VIBRATE"/> to AndroidManifest.xml.
    Vibration.vibrate(100,100,50)
  }
    return (
        <View>
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

export default Swipper;
