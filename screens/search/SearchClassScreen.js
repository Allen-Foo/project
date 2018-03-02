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
import { Slideshow } from '../../components';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { getAllClassList } from '../../redux/actions';

class SearchClassScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.searchClass.title,
      headerTitle: screenProps.locale.search.title,
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state={
      districtText: '',
      classNameText: ''
    }
  }

  componentWillMount() {

    // this.setState({
    //   interval: setInterval(() => {
    //     this.setState({
    //       position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
    //     });
    //   }, 3000)
    // });
  }



  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    let {districtText, classNameText} = this.state
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBarRowContainer}>
          <SearchBar
            lightTheme
            icon={{color: '#DDDDDD'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={(districtText) => this.setState({ districtText })}
            placeholder={this.props.locale.searchClass.districtSearch}
            placeholderTextColor={'#DDDDDD'}
          />
          <SearchBar
            lightTheme
            icon={{color: '#DDDDDD'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onChangeText={(classNameText) => this.setState({ classNameText })}
            placeholder={this.props.locale.searchClass.classSearch}
            placeholderTextColor={'#DDDDDD'}
          />
          <TouchableOpacity 
            style={[styles.button,{ marginBottom:10, marginTop:10, flexDirection:'row'}]}
            onPress={
              () => this.props.navigation.navigate(
                  'SearchClassResult', {districtText, classNameText}
            )}
          >
            <Text style={[styles.text,{paddingLeft: 5}]}>search</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  searchText: {
    color: '#919191', 
    paddingVertical: 5
  },

  searchBarRowContainer: {
    width: '100%',
    backgroundColor: Colors.tintColor,
  },

  searchBarContainer: {
    backgroundColor: Colors.tintColor,
    // width: '80%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    color: 'black',
    fontSize: 14,
    backgroundColor: '#fff'
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    allClassList: state.classes.allClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
})(SearchClassScreen)
