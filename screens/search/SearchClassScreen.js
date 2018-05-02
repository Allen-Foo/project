import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  PixelRatio,
} from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { Slideshow, Spinner} from '../../components';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList, setKeyword, setAddress, setFilter } from '../../redux/actions';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Qs from 'qs';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyBqwQcXoFKOxK0cx3qfuwhH_ryqsI-HlMI';

class SearchClassScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      keyword: props.keyword,
      isCurrentLocationSelected: false,
      latitude: 22.2965866,
      longitude: 114.1748086,
      error: null,
      dataSource: [],
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }

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
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      handleSearch: this.handleSearch,
    });
  }

  handleSearch = () => {
    let {address, keyword} = this.state;
    this.props.setKeyword(keyword.toLowerCase())
    // this.props.setAddress(address)
    this.props.switchToNormalMode()
    this.props.searchClassList()
    this.props.navigation.navigate('Search')
  }

  handleCurrentLocationPress = () => {
    this.setState({
      isCurrentLocationSelected: true,
      address: this.props.locale.searchResult.placeholder.currentLocation,
    })
    // get current location, and go to search
    this.props.setFilter({
      location: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      }
    })
    this.props.searchClassList()
    this.props.navigation.navigate('Search')
  }

  handleInputFocus = () => {
    if (this.state.isCurrentLocationSelected) {
      this.setState({
        isCurrentLocationSelected: false,
        address: null
      })
      setFilter({location: null})
    }
  }

  handleChangeText(text) {
    this.setState({address: text})
    let query = {
      key: GOOGLE_API_KEY,
      language: this.props.languageKey,
    }

    if (text.length >= 2) {
      axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' 
              + encodeURIComponent(text) + '&' + Qs.stringify(query)
      }).then(res => {
        // console.warn('res', res)
        this.setState({
          dataSource: res.data.predictions,
        });
      })
    } else {
      this.setState({
        dataSource: [],
      });
    }
  }

  handlePressAddress(address) {
    let query = {
      key: GOOGLE_API_KEY,
      language: this.props.languageKey,
      placeid: address.place_id
    }

    axios({
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify(query)
    }).then(res => {
      this.setState({address: res.data.result.formatted_address})
        console.warn('res', res.data)

      this.props.setFilter({location: res.data.result.geometry.location})
    })
  } 

  render() {
    let { address, keyword, isCurrentLocationSelected, error } = this.state;
    let inputStyle = styles.searchBarInput;
    if (isCurrentLocationSelected) {
      inputStyle = [inputStyle, {color: 'purple'}]
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchBarRowContainer}>
          <SearchBar
            lightTheme
            autoFocus
            icon={{color: '#DDDDDD'}}
            clearIcon={{ color: '#DDDDDD', name: 'clear' }}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={(keyword) => this.setState({keyword})}
            placeholder={this.props.locale.searchClass.classSearch}
            placeholderTextColor={'#DDDDDD'}
            returnKeyType={ "search" }
            autoCapitalize={'none'}
            onSubmitEditing={() => this.handleSearch()}
            value={keyword}
          />
          <SearchBar
            lightTheme
            icon={{color: '#DDDDDD'}}
            clearIcon={{ color: '#DDDDDD', name: 'clear' }}
            containerStyle={styles.searchBarContainer}
            inputStyle={inputStyle}
            onFocus={this.handleInputFocus}
            onChangeText={(address) => this.handleChangeText(address)}
            onSubmitEditing={() => this.handleSearch()}
            placeholder={this.props.locale.searchClass.districtSearch}
            placeholderTextColor={'#DDDDDD'}
            value={address}
          />
        </View>
        {
          !isCurrentLocationSelected && !error &&
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => this.handleCurrentLocationPress()}
          >
            <FontAwesome
              name={'location-arrow'}
              size={15}
              color={'purple'}
              style={styles.locationArrow}
            />
            <Text style={{color: 'purple'}}>
              {this.props.locale.searchResult.placeholder.currentLocation}
            </Text>
          </TouchableOpacity>
        }
        {
          this.state.dataSource.map((data, index) => (
            <TouchableOpacity
              key={index}
              style={styles.addressRow}
              onPress={() => this.handlePressAddress(data)}
            >
              <Text numberOfLines={1} style={{fontWeight: '600', fontSize: 13}}>{data.description}</Text>
            </TouchableOpacity>
          ))
        }
        { this.props.isLoading && <Spinner intensity={30}/> }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  searchBarRowContainer: {
    width: '100%',
    backgroundColor: Colors.tintColor,
  },
  searchBarContainer: {
    backgroundColor: Colors.tintColor,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    color: '#333',
    fontSize: 14,
    backgroundColor: '#fff'
  },
  locationButton: {
    flexDirection: 'row',
    paddingTop: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingBottom: 10,
  },
  locationArrow: {
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 5
  },
  addressRow: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    flexWrap: 'nowrap',
    padding: 10,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
  }
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    address: state.filter.address,
    keyword: state.filter.keyword,
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    filteredClassList: state.classes.filteredClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  searchClassList,
  setKeyword,
  // setAddress,
  setFilter,
})(SearchClassScreen)
