import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, PixelRatio } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { MapView, Constants } from 'expo';
import { Tutor, IndexMarker } from '../../components';
import { mockData } from '../../constants/mockData';
import { getAllClassList, searchClassList } from '../../redux/actions';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import SearchClassScreen from '../search/SearchClassScreen';

class SearchScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <TouchableOpacity 
        style={styles.headerButtonContainer} 
        onPress={()=>{params.handleSearch ? params.handleSearch() : () => console.warn('not define')}}>
        <Text style={styles.headerButtonText}>Search</Text>
      </TouchableOpacity>
    )

    let headerLeft = (
      <TouchableOpacity 
        style={styles.headerButtonContainer} 
        onPress={()=>{params.switchToNormalMode ? params.switchToNormalMode() : () => console.warn('not define')}}>
        <Text style={styles.headerButtonText}>Cancel</Text>
      </TouchableOpacity>
    )

    if (params.searchMode) {
      return {
        headerTitle: params.searchMode ? null : screenProps.locale.newsfeed.title,
        tabBarLabel: screenProps.locale.newsfeed.title,
        headerLeft: params.searchMode ? headerLeft : null,
        headerRight: params.searchMode ? headerRight : null,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: Colors.tintColor,
        },
      }
    } else {
      return {header: null}
    }
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

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      switchToNormalMode: this.switchToNormalMode, 
    });
  }

  switchToNormalMode = () => {
    this.setState({searchMode: false})
    this.props.navigation.setParams({ searchMode: false });
  }

  switchToSearchMode = () => {
    this.setState({searchMode: true}, () => {
      this.props.navigation.setParams({ searchMode: true });
    })
  }

  handleRegionChange = (region, lastLat, lastLong) => {
    this.setState({ region });
  }

  render() {
    if (this.state.searchMode) {
      return <SearchClassScreen navigation={this.props.navigation}/>
    }

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
        <SearchBar handleFocus={this.switchToSearchMode}/>
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
      <TouchableOpacity style={styles.inputStyle} onPress={() => props.handleFocus()}>
        <Text style={{color: '#999'}}>
         {'Type Here...'}
        </Text>
      </TouchableOpacity>
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
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  headerButtonContainer: {
    paddingHorizontal: 10,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
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
