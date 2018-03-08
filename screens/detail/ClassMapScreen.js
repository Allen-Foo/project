import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { MapView, Constants } from 'expo';

const LOCATION_ICON_GREEN = require('../../assets/images/location_icon_green.png');
const LOCATION_ICON = require('../../assets/images/location_icon.png');

class ClassMapScreen extends React.Component {
 static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    // console.warn('address', this.props.navigation.state.params)
    let {params = {}} = this.props.navigation.state
    let lat = params.coordinate && params.coordinate.lat || 22.2965866
    let lng = params.coordinate && params.coordinate.lng || 114.1748086

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: lat, longitude: lng}}
              image={LOCATION_ICON}
            />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassMapScreen)
