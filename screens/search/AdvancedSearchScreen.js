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
import { Tutor, Separator } from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList } from '../../redux/actions';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { classData } from '../../constants/classData';

const categoryList = [
  'education', 
  'music', 
  'sports', 
  'beauty', 
  'designAndDevelopment', 
  'petTraining', 
  'carDriving', 
  'interestClasses', 
  'personal', 
  'photography', 
  'recover', 
  'talent'
  ]

class AdvancedSearchScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.advancedSearch.title,
      headerTitle: screenProps.locale.advancedSearch.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.props.navigation.state.key = 'AdvancedSearch'

    this.state = {
      categorySearch: params.category && `${params.category}`,
      skillSearch: params.skill && `${params.skill}`,
      category: params.category || '',
      skill: params.skill || '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabButton}>
          <Text style={styles.tabText}>
            {this.props.locale.advancedSearch.text.category}
          </Text>
        </View>
        <TouchableOpacity style={[styles.subTabButton,{borderBottomWidth: 1, borderColor: '#eee'}]}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.subTabText}>
              {this.props.locale.advancedSearch.text.classCategory}
            </Text>
            <View style={styles.chevronContainer}>
              <Entypo
                name={"chevron-thin-right"}
                size={15}
                color={'#555'}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subTabButton}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.subTabText}>
              {this.props.locale.advancedSearch.text.skillCategory}
            </Text>
            <View style={styles.chevronContainer}>
              <Entypo
                name={"chevron-thin-right"}
                size={15}
                color={'#555'}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.tabButton}>
          <Text style={styles.tabText}>
            {this.props.locale.advancedSearch.text.tutionFee}
          </Text>
        </View>
        { this.props.isLoading && <Spinner intensity={30}/> }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  tabText: {
    paddingLeft: 10,
  },
  subTabText: {
    paddingLeft: 10,
  },
  tabButton: {
    width: '100%',
    paddingVertical: 15,

  },
  subTabButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#fff'
  },
  buttonTextContainer: {
    flexDirection: 'row'
  },
  chevronContainer: {
    position: 'absolute',
    right: 10,
  },




  searchText: {
    color: '#919191', 
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  advancedSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  searchIcon: {
    marginTop : '1%'
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
})(AdvancedSearchScreen)
