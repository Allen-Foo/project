import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Tutor, Separator, Slideshow, HeaderButton } from '../../components';
import icons from '../../assets/icon';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { getAllClassList, searchClassList, setKeyword } from '../../redux/actions';
import SearchClassScreen from '../search/SearchClassScreen';

let {width, height} = Dimensions.get('window');

class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <HeaderButton
        onPress={()=>{
          params.switchToNormalMode()
          params.handleSearch()
        }}
        text={screenProps.locale.common.search}
      />
    )

    let headerLeft = (
      <HeaderButton
        onPress={()=>{params.switchToNormalMode ? params.switchToNormalMode() : () => console.warn('not define')}}
        text={screenProps.locale.common.cancel}
      />
    )
    
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
  };

  loadMoreItems = () => {
    this.props.getAllClassList(this.props.allClassList[this.props.allClassList.length - 1].classId)
  }

  constructor(props) {
    super(props);
    this.state = {
      searchMode: false,
      allClassList: [],
      liked: false,
      position: 0,
      interval: null,
      dataSource: [
        {
          uri: "https://s3.amazonaws.com/aws-test-dev-uploads/Banner+1-01.jpg"
        },
        {
          uri: "https://s3.amazonaws.com/aws-test-dev-uploads/Banner+3-01.jpg"
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

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      switchToNormalMode: this.switchToNormalMode, 
    });
  }

  handlePressIcon = (key) => {
    this.props.setKeyword(key)
    this.props.searchClassList()
    this.props.navigation.navigate('Search')
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  _onRefresh() {
    this.props.getAllClassList()
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

  render() {
    if (this.state.searchMode) {
      return (
        <SearchClassScreen 
          navigation={this.props.navigation}
          switchToNormalMode={this.switchToNormalMode}
        />
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.searchBarRowContainer}>
          <SearchBar
            lightTheme
            ref={searchBar => this.searchBar = searchBar}
            icon={{color: '#DDDDDD'}}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            onFocus={() => this.switchToSearchMode()}
            placeholder={this.props.locale.searchResult.placeholder.typeHere}
            placeholderTextColor={'#DDDDDD'}
          />
          
        </View>
        <ScrollView 
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          onScroll={(e) => {
            let paddingToBottom = 10;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom
              && !this.props.isLastAllClassList) {
              this.loadMoreItems()
            }
          }}
        >
          <Slideshow 
            dataSource={ this.state.dataSource }
            containerStyle={ sliderContainer }
            scrollEnabled={true}
            position={ this.state.position }
            onPositionChanged={position => this.setState({ position })}
          />
          <Swiper style={styles.swiperContainer} showsButtons={false} paginationStyle={{bottom: 10}} loop={false}>
            <View style={styles.swiperPage}>
              {
                Object.keys(icons).filter((k, i) => i < 8).map((key, index) => 
                  <IconBox
                    key={index}
                    uri={icons[key]}
                    iconName={this.props.locale.icon[key]}
                    onPress={() => this.handlePressIcon(key)}
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
                    onPress={() => this.handlePressIcon(key)}
                  />
                )
              }
            </View>
          </Swiper>
          {
            this.props.allClassList &&
            this.props.allClassList.map((cls, index) => (
              <View key={index} style={{width: '100%'}}>
                <Tutor 
                  data={cls} 
                  onPress={() => this.props.navigation.navigate('TutorDetail', {classId: cls.classId})}
                  handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
                />
                <Separator style={{backgroundColor: '#aaa'}}/>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const IconBox = props => {
  let { uri, iconName, onPress } = props
  return (
    <TouchableOpacity 
      style={styles.iconContainer}
      onPress={() => onPress()}
    >
      <Image
        ImageResizeMode={'cover'}
        source={uri}
        style={{ width: '50%', height: '50%' }} 
      />
      <Text style={styles.iconName}>{iconName}</Text>
    </TouchableOpacity>
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
  searchBarRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.tintColor,
  },
  swiperContainer: {
    height: (width * 0.25 + 5 * 2) * 2,
    backgroundColor: '#fff',
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
    width: '100%',
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
    isLastAllClassList: state.classes.isLastAllClassList,
    allClassList: state.classes.allClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getAllClassList,
  searchClassList,
  setKeyword,
})(NewsFeedScreen)
