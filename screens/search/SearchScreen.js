import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { SignIn } from '../../lib/Auth/Components/Examples'


class SearchScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.search.title,
      headerTitle: screenProps.locale.search.title,
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          initialRegion={{
            latitude: 22.2965866,
            longitude: 114.1748086,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
        >
           <MapView.Marker
            coordinate={{latitude: 22.2965866, longitude: 114.1748086}}
            title={'The Darts Factory'}
            description={'A cool company'}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(SearchScreen)