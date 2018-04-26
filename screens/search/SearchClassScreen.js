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
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { Slideshow, Spinner} from '../../components';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList, setKeyword, setAddress } from '../../redux/actions';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

class SearchClassScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      keyword: props.keyword,
      isCurrentLocationSelected: false,
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      handleSearch: this.handleSearch,
    });
  }

  handleSearch = () => {
    let {address, keyword} = this.state;
    this.props.setKeyword(keyword.toLowerCase())
    this.props.setAddress(address)
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
  }

  handleInputFocus = () => {
    if (this.state.isCurrentLocationSelected) {
      this.setState({
        isCurrentLocationSelected: false,
        address: null
      })
    }
  }

  render() {
    let { address, keyword, isCurrentLocationSelected } = this.state;
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
            onChangeText={(address) => this.setState({address})}
            onSubmitEditing={() => this.handleSearch()}
            placeholder={this.props.locale.searchClass.districtSearch}
            placeholderTextColor={'#DDDDDD'}
            value={address}
          />
        </View>
        {
          !isCurrentLocationSelected && 
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => this.handleCurrentLocationPress()}
          >
            <FontAwesome
              name={'location-arrow'}
              size={18}
              color={'purple'}
              style={styles.locationArrow}
            />
            <Text style={{color: 'purple'}}>
              {this.props.locale.searchResult.placeholder.currentLocation}
            </Text>
          </TouchableOpacity>
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
  },
  locationArrow: {
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 5
  },
});

const mapStateToProps = (state) => {
  return {
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
  setAddress,
})(SearchClassScreen)
