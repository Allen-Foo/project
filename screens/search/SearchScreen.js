import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import { MapView, Constants } from 'expo';
import { SearchBar } from 'react-native-elements';


class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.rowContainer}>
          <SearchBar
            round
            lightTheme
            icon={{color: '#DDDDDD'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={() => {}}
            placeholder='Type Here...'
            placeholderTextColor={'#DDDDDD'}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.filter}>{'Filter'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: Constants.statusBarHeight,
    width: '100%',
    backgroundColor: Colors.tintColor,
  },
  rowContainer: {
    backgroundColor: Colors.tintColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    backgroundColor: Colors.tintColor,
    width: '80%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    color: '#fff',
    backgroundColor: '#336633'
  },
  filter: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
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

export default connect(mapStateToProps)(SearchScreen)