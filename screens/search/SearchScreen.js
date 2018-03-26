import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, PixelRatio } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { MapView, Constants } from 'expo';
import { Tutor, IndexMarker } from '../../components';
import { mockData } from '../../constants/mockData';
import { getAllClassList, searchClassList } from '../../redux/actions';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';

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
        <SearchBar />
        {
          this.state.selectedMarkerIndex !== null &&
          <View style={styles.bottomViewClassDetail}>
            <Tutor 
              data={allClassList[this.state.selectedMarkerIndex]}
              onPress={() => this.props.navigation.navigate('TutorDetail', {
                classId: allClassList[this.state.selectedMarkerIndex].classId
              })} 
              handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
            />
          </View>
        }
      </View>
    );
  }
}

const SearchBar = props => {
  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons
        name={"search"}
        size={24}
        color={'#555'}
        style={styles.icon}
      />
      <TextInput
        style={styles.inputStyle}
        autoCorrect={false}
        placeholder='Type Here...'
      />
      <TouchableOpacity onPress={()=> console.warn('pressed')}>
        <FontAwesome
          name={"filter"}
          size={22}
          color={'#555'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> console.warn('pressed')}>
        <MaterialIcons
          name={"format-list-numbered"}
          size={24}
          color={'#555'}
          style={styles.icon}
          onPress={()=> console.warn('pressed')}
        />
      </TouchableOpacity>
    </View>
  )
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
  bottomViewClassDetail: {
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '2%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: '3%',
    right: '3%',
    top: Constants.statusBarHeight,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 8,
  },
  icon: {
    paddingHorizontal: 8,
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
