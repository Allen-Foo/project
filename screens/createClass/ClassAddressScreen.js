import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class ClassAddressScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      tabBarLabel: screenProps.locale.classAddress.title,
      headerTitle: screenProps.locale.classAddress.title,
      headerTintColor: 'black',
      headerStyle: {
        // backgroundColor: '#555',
      },
    }
  };
 render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Enter your address'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} 
            renderDescription={(row) => row.description} // custom description render
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBqwQcXoFKOxK0cx3qfuwhH_ryqsI-HlMI',
              language: 'en', // language of the results
               // default: 'geocode'
            }}
          />
        </View>
      </View>
    );
  }
}

const searchInputStyle={
  container: {
    backgroundColor: '#fff',
    //width: 300,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 0,
    opacity: 0.9,
    borderRadius: 8,
  },
  description: {
    fontWeight: 'bold',
    color: "#007",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    opacity: 0.9,
  },
  predefinedPlacesDescription: {
    color: '#355',
  },
  textInputContainer: {
    height: 50,
  },
  textInput: {
    height: 33,
    fontSize: 16
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
  },
  searchBox: {
    top: 0,
    position: "absolute",
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
  }
 });



export default ClassAddressScreen
