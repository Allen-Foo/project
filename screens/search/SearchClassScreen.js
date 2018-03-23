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
import { searchClassList } from '../../redux/actions';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

class SearchClassScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    // console.warn('sd', screenProps.locale.searchClass)

    let headerRight = (
      <TouchableOpacity style={styles.advancedSearchContainer} onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <FontAwesome 
          name={'search-plus'}
          size={14}
          style={styles.searchIcon}
          color={'#fff'}
        />
        <Text style={styles.text}> {screenProps.locale.searchClass.advanced} </Text>
      </TouchableOpacity>
    );

    return {
      headerTitle: screenProps.locale.search.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerRight: headerRight,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      keyword: '',
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => { this.props.navigation.navigate('AdvancedSearch')}

  handleSearch() {
    let {address, keyword} = this.state;
    let option = {
      address: address, 
      keyword: keyword.toLowerCase()
    }
    this.props.searchClassList(option)
    this.props.navigation.navigate('SearchClassResult', option)

  }

  render() {
    let {address, keyword} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.searchBarRowContainer}>
          <SearchBar
            lightTheme
            icon={{color: '#DDDDDD'}}
            clearIcon={{ color: '#DDDDDD', name: 'clear' }}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={(address) => this.setState({ address })}
            onSubmitEditing={() => this.handleSearch()}
            placeholder={this.props.locale.searchClass.districtSearch}
            placeholderTextColor={'#DDDDDD'}
          />
          <SearchBar
            lightTheme
            autoFocus
            icon={{color: '#DDDDDD'}}
            clearIcon={{ color: '#DDDDDD', name: 'clear' }}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={(keyword) => this.setState({ keyword })}
            placeholder={this.props.locale.searchClass.classSearch}
            placeholderTextColor={'#DDDDDD'}
            returnKeyType={ "search" }
            onSubmitEditing={() => this.handleSearch()}
          />
        </View>

        { this.props.isLoading && <Spinner intensity={30}/> }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    flex: 1,
  },
  searchText: {
    color: '#919191', 
    paddingVertical: 5
  },
  advancedSearchContainer: {
    flexDirection: 'row',
    paddingRight: 5
  },
  searchIcon: {
    // marginTop : '1%'
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
    color: 'black',
    fontSize: 14,
    backgroundColor: '#fff'
  },
  text: {
    color: '#fff',
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 5,
    height: '10%',
    width: '20%',
    marginLeft: '1%',
    marginTop : '1%'
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'flex-end',
    // marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    filteredClassList: state.classes.filteredClassList,
    searchClassSuccess: state.classes.searchClassSuccess,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
    searchClassList
})(SearchClassScreen)
