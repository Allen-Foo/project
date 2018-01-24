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
            textInputProps={{onSubmitEditing: () => console.warn('clicked')}}
            onPress={(data, details) => {
              this.props.navigation.state.params.returnData(data, details);
              this.props.navigation.goBack();
            }}

            renderDescription={(row) => row.description} // custom description render
            query={{
              key: 'AIzaSyBqwQcXoFKOxK0cx3qfuwhH_ryqsI-HlMI',
              language: 'en',
            }}
          />
        </View>
      </View>
    );
  }
}

const searchInputStyle = {
  container: {
    backgroundColor: '#f0f0f0',
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
