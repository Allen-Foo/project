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

class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.newsfeed.title,
      headerTitle: screenProps.locale.newsfeed.title,
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
      allClassList: [],
      liked: false,
      bannerList: [],
      position: 0,
      interval: null,
      dataSource: [
        {
          uri: "https://aws-test-dev-uploads.s3.amazonaws.com/7d3438017ddf62b32844ae6394c7f8836c33b48a.jpg"
        },
        {
          uri: "https://aws-test-dev-uploads.s3.amazonaws.com/763862ac28be4cc9cb82d7bd8be3cf81f93b6056.jpg"
        },
        {
          uri: "https://aws-test-dev-uploads.s3.amazonaws.com/6387d49a361bc1a3f5bda5c77eb8a8a6b9ec0353.jpg"
        },
      ],
    }
  }

  componentWillMount() {
    this.props.getAllClassList()

    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
        });
      }, 3000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    let { bannerList } = this.state
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBarRowContainer}>
          <SearchBar
            lightTheme
            ref={searchBar => this.searchBar = searchBar}
            icon={{color: '#DDDDDD'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onFocus={() => {
              this.searchBar.blur()
              this.props.navigation.navigate('SearchClass')
            }}
            placeholder='Type Here...'
            placeholderTextColor={'#DDDDDD'}
          />
          <TouchableOpacity 
            style={styles.searchButton}
          >
            <Text style={styles.searchText}>{this.props.locale.newsfeed.text.search}</Text>
          </TouchableOpacity>
        </View>
        <Slideshow 
          dataSource={ this.state.dataSource }
          containerStyle={ sliderContainer }
          scrollEnabled={ bannerList.length > 1 }
          position={ this.state.position }
          onPositionChanged={position => this.setState({ position })}
        />
        <Swiper style={{height: (width * 0.25 + 5 * 2) * 2}} showsButtons={false} paginationStyle={{bottom: 10}}>
          <View style={styles.swiperPage}>
            {
              Object.keys(icons).filter((k, i) => i < 8).map((key, index) => 
                <IconBox
                  key={index}
                  uri={icons[key]}
                  iconName={this.props.locale.icon[key]}
                />
              )
            }
          </View>
          <View style={styles.swiperPage}>
            {
              Object.keys(icons).filter((k, i) => i >= 8).map((key, index) =>
                <IconBox
                  key={index}
                  uri={icons[key]}
                  iconName={this.props.locale.icon[key]}
                />
              )
            }
          </View>
        </Swiper>
        {
           this.props.allClassList &&
           this.props.allClassList.map((cls, index) => (
              <View key={index} style={{width: '100%'}}>
                <Tutor data={cls} onPress={() => this.props.navigation.navigate('TutorDetail')} />
                <Separator style={{backgroundColor: '#aaa'}}/>
              </View>
            )
          )
        }
      </ScrollView>
    );
  }
}

const IconBox = props => {
  let { uri, iconName } = props
  return (
    <View style={styles.iconContainer}>
      <Image
        ImageResizeMode={'cover'}
        source={uri}
        style={{ width: '50%', height: '50%' }} 
      />
      <Text style={styles.iconName}>{iconName}</Text>
    </View>
  )  
}

const sliderContainer = {
  width: width,
  height: width * 3 / 4,
  marginBottom: 20,
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  searchText: {
    color: '#919191', 
    paddingVertical: 5
  },
  searchButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#919191',
    width: '20%',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tintColor,
  },
  searchBarRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.tintColor,
  },
  swiperPage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  searchBarContainer: {
    backgroundColor: Colors.tintColor,
    width: '80%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    color: 'black',
    fontSize: 14,
    backgroundColor: '#fff'
  },
  iconContainer: {
    width: width * 0.2,
    height: width * 0.2,
    marginHorizontal: width * 0.025,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
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
  getAllClassList,
})(NewsFeedScreen)
