import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { MapView, Constants } from 'expo';
import { SearchBar } from 'react-native-elements';
import { Tutor,} from '../../components';
import { mockData } from '../../constants/mockData';


class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedMarkerIndex: null,
    }
  }

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
            {
              mockData.class.map((cls, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={cls.position}
                  pinColor={this.state.selectedMarkerIndex === index ? Colors.tintColor : 'red'}
                  onPress={e => this.setState({selectedMarkerIndex: index})}
                />
              ))
            }
          </MapView>
        </View>
        <View style={styles.bottomViewClassDetail}>
        {
          this.state.selectedMarkerIndex !== null &&
          <Tutor data={mockData.class[this.state.selectedMarkerIndex]} onPress={() => this.props.navigation.navigate('TutorDetail')} />
        }
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
  bottomViewClassDetail:{
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '2%',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(SearchScreen)