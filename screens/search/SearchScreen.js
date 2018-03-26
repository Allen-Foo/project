import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity, PermissionsAndroid, Platform, PixelRatio } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { MapView, Constants } from 'expo';
import { SearchBar } from 'react-native-elements';
import { Tutor, IndexMarker } from '../../components';
import { mockData } from '../../constants/mockData';
import { getAllClassList, searchClassList } from '../../redux/actions';

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      selectedMarkerIndex: null,
      latitude: null,
      longitude: null,
      region: null,
      error: null,
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        this.setState({
          latitude: 22.2965866,
          longitude: 114.1748086,
          error: error.message,
        })
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  handleRegionChange = (region, lastLat, lastLong) => {
    this.setState({ region });
  }

  render() {
    let { allClassList } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            showsPointsOfInterest
            showsScale={false}
            showsCompass={false}
            onRegionChange={this.handleRegionChange}
            initialRegion={{
              latitude: this.state.latitude || 22.2965866,
              longitude: this.state.longitude || 114.1748086,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            {
              allClassList && allClassList.map((cls, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: cls.address.coordinate.lat,
                    longitude: cls.address.coordinate.lng,
                  }}
                  onPress={e => this.setState({selectedMarkerIndex: index})}
                >
                  <IndexMarker
                    index={index + 1}
                    isSelected={this.state.selectedMarkerIndex === index}
                  />
                </MapView.Marker>
              ))
            }
          </MapView>
        </View>
        <View style={styles.rowContainer}>
          <SearchBar
            lightTheme
            icon={{color: '#333'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={() => {}}
            placeholder='Type Here...'
            placeholderTextColor={'#DDDDDD'}
          />
        </View>
        <View style={styles.bottomViewClassDetail}>
        {
          this.state.selectedMarkerIndex !== null &&
          <Tutor 
            data={allClassList[this.state.selectedMarkerIndex]}
            onPress={() => this.props.navigation.navigate('TutorDetail', {
              classId: allClassList[this.state.selectedMarkerIndex].classId
            })} 
            handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
          />
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
  rowContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: Constants.statusBarHeight,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 5,
  },
  searchBarInput: {
    color: '#555',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc'
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
    locale: state.language.locale,
    allClassList: state.classes.allClassList,
  }
}

export default connect(mapStateToProps, {
  getAllClassList,
  searchClassList,
})(SearchScreen)