import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, PixelRatio, Platform } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { MapView, Constants, Location, Permissions } from 'expo';
import { Tutor, IndexMarker, HeaderButton} from '../../components';
import { searchClassList } from '../../redux/actions';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import SearchClassScreen from '../search/SearchClassScreen';
import SearchClassResultScreen from '../search/SearchClassResultScreen';

const MAP_MODE = 'MAP_MODE';
const LIST_MODE = 'LIST_MODE';

class SearchScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <HeaderButton
        onPress={()=>{params.handleSearch ? params.handleSearch() : () => console.warn('not define')}}
        text={screenProps.locale.common.search}
      />
    )

    let headerLeft = (
      <HeaderButton
        onPress={()=>{params.switchToNormalMode ? params.switchToNormalMode() : () => console.warn('not define')}}
        text={screenProps.locale.common.cancel}
      />
    )

    if (params.searchMode) {
      return {
        headerTitle: params.searchMode ? null : screenProps.locale.search.title,
        tabBarLabel: screenProps.locale.search.title,
        headerLeft: params.searchMode ? headerLeft : null,
        headerRight: params.searchMode ? headerRight : null,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: Colors.tintColor,
        },
      }
    } else {
      return {
        header: null,
        tabBarLabel: screenProps.locale.search.title,
      }
    }
  };

  constructor(props) {
    super(props);
    this.mounted = false;

    this.state = {
      mode: LIST_MODE,
      selectedMarkerIndex: null,
      latitude: null,
      longitude: null,
      region: null,
    }
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

  toggleMode = () => {
    if (this.state.mode == MAP_MODE) {
      this.setState({mode: LIST_MODE})
    } else {
      this.setState({mode: MAP_MODE})
    }
  }

  renderMap = () => {
    let { filteredClassList, locale, keyword, address } = this.props;

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
              filteredClassList && filteredClassList.map((cls, index) => (
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
        <SearchBar
          handleTextInputPress={this.switchToSearchMode}
          handleFilterPress={() => this.props.navigation.navigate('AdvancedSearch')}
          handleToggleMode={() => this.toggleMode()}
          locale={locale}
          keyword={keyword}
          address={address}
        />
        {
          this.state.selectedMarkerIndex !== null && filteredClassList[this.state.selectedMarkerIndex] &&
          <View style={styles.bottomViewClassDetail}>
            <Tutor 
              data={filteredClassList[this.state.selectedMarkerIndex]}
              onPress={() => this.props.navigation.navigate('ClassDetailScreen', {
                classId: filteredClassList[this.state.selectedMarkerIndex].classId
              })} 
              handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
            />
          </View>
        }
      </View>
    )
  }

  render() {
    if (this.state.searchMode) {
      return <SearchClassScreen navigation={this.props.navigation} switchToNormalMode={this.switchToNormalMode}/>
    }

    if (this.state.mode == MAP_MODE) {
      return this.renderMap()
    } else {
      return (
        <SearchClassResultScreen
          navigation={this.props.navigation}
          handleToggleMode={() => this.toggleMode()}
          handleFilterPress={() => this.props.navigation.navigate('AdvancedSearch')}
          handleTextInputPress={this.switchToSearchMode}
        />
      )
    }
  }
}

const SearchBar = props => {
  let placeholder = (
    <Text style={{color: '#999'}}>
     {props.locale.searchResult.placeholder.typeHere}
    </Text>
  )
  if (props.keyword || props.address) {
    placeholder = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#333'}}>
          {props.keyword}
        </Text>
        <Text style={{color: '#999', fontSize: 12, paddingLeft: 10,}}>
          {props.address}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons
        name={"search"}
        size={24}
        color={'#555'}
        style={styles.icon}
      />
      <TouchableOpacity style={styles.inputStyle} onPress={() => props.handleTextInputPress()}>
        { placeholder }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.handleFilterPress()}>
        <FontAwesome
          name={"filter"}
          size={22}
          color={'#555'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.handleToggleMode()}>
        <MaterialIcons
          name={"format-list-numbered"}
          size={24}
          color={'#555'}
          style={styles.icon}
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
});

const mapStateToProps = (state) => {
  return {
    keyword: state.filter.keyword,
    address: state.filter.address,
    locale: state.language.locale,
    filteredClassList: state.filter.filteredClassList,
  }
}

export default connect(mapStateToProps, {
  searchClassList,
})(SearchScreen)
