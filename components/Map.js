import { MapView } from 'react-native-maps';

export default class Map extends Component<Props> {
  return (
    <MapView
      style={{flex: 1}}
      region={{          latitude: 42.882004,          longitude: 74.582748,          latitudeDelta: 0.0922,          longitudeDelta: 0.0421        }}
      showsUserLocation={true}
    />
  )
}

export default Map;