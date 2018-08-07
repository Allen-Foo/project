import React from 'react';
import { Alert, Animated, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { getClassList, getTutorDetail, clearTutorProfile } from '../../redux/actions';
import { Separator, Tutor, Avatar, Spinner, AchievementItem } from '../../components';

const { height, width } = Dimensions.get('window')

const HEADER_MAX_HEIGHT = 160;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class TutorInfoScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      didMount: false,
      classDetail: null,
      tutor: null,
      scrollY: new Animated.Value(0),
    }
  }

  componentWillMount() {
    this.props.getClassList(this.props.classDetail.user.userId);
    this.props.getTutorDetail(this.props.classDetail.user.userId);
    this.setState({
      classDetail: this.props.classDetail,
      tutor: {
        profile: null
      }
    })
  }

  componentDidMount() {
    this.state.didMount = true
  }

  componentWillUnmount() {
    this.props.clearTutorProfile()
  }

  renderLoading() {
    return <Spinner />
  }

  renderTutorInfo = () => {
    let { classList, locale } = this.props

    return (
      <View style={styles.introContainer}>
        <View style={styles.tutorInfo}>
          <Text style={{width: '30%', fontWeight: 'bold'}}>{locale.tutorInfo.text.profession}</Text>
          <Text style={{width: '60%'}}>
            {this.state.tutor.profession}
          </Text>
        </View>
        <View style={styles.tutorInfo}>
          <Text style={{width: '30%', fontWeight: 'bold'}}>{locale.tutorInfo.text.experience}</Text>
          <Text style={{width: '60%'}}>
            {this.state.tutor.experience}
          </Text>
        </View>
        <View style={styles.tutorInfo}>
          <Text style={{width: '30%', fontWeight: 'bold'}}>{locale.tutorInfo.text.achievement}</Text>
          <View style={{width:'70%'}}>
            {
              this.state.tutor.achievementList &&
              this.state.tutor.achievementList.length > 0 &&
              this.state.tutor.achievementList.map((item, i) => 
                <AchievementItem 
                  key={i}
                  canEdit={false}
                  data={{...item, index:i}}
                />
              )
            }
          </View>
        </View>
        {
          (this.state.tutor.selfIntro != 'null' &&
          <View style={styles.tutorInfo}>
            <Text style={{width: '30%', fontWeight: 'bold'}}>{locale.tutorInfo.text.introduction}</Text>
            <Text style={{width: '60%'}}>
              {this.state.tutor.selfIntro}
            </Text>
          </View>)
        }
      </View>
    )
  }

  render() {
    let { classList, locale } = this.props
    let { classDetail } = this.state;

    if (!this.state.tutor.profile && this.state.didMount) {
      this.state.tutor = this.props.tutor
    }

    if (!this.state.tutor.profile) {
      return this.renderLoading()
    }

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });


    return (
      <View style={{flex: 1}}>
        <ScrollView 
          contentContainerStyle={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <View style={{marginTop: HEADER_MAX_HEIGHT, paddingBottom: 30}}>
            <View style={styles.tutorAvatarContainer}>
              <Avatar large uri={classDetail.user.avatarUrl}/>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{classDetail.user.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    name={"check-square-o"}
                    size={20}
                    color={'#f72470'}
                  />
                  <Text style={{marginLeft: 5, color: '#f72470'}}>{locale.classDetail.text.verifiedBy}</Text>
                </View>
              </View>
            </View>

            { this.renderTutorInfo() }

            <Text style={{paddingTop: 10}}> {locale.tutorInfo.text.mainCourse} </Text>
            {
              classList.map((cls, index) => (
                <View key={index} style={{width: '100%'}}>
                  <Tutor 
                    data={cls} 
                    onPress={() => this.props.navigation.navigate('ClassDetailScreen', {classId: cls.classId})}
                    handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
                  />
                  <Separator style={{backgroundColor: '#aaa'}}/>
                </View>
              ))
            }
          </View>
        </ScrollView>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
            ]}
            source={require('../../assets/images/tutorinfo_background_image.png')}
          />
          <View style={styles.bar}>
            <Text style={styles.title}>{classDetail.user.name}</Text>
          </View>
          <TouchableOpacity style={styles.chevronContainer} onPress={() => this.props.navigation.goBack()}>
            <Entypo
              name={"chevron-thin-left"}
              size={20}
              color={'#fff'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: '#efeff3',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  tutorInfo: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tutorAvatarContainer: {
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingVertical: 10,
  },
  chevronContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: 'transparent',
  },
  usernameText: {
    fontSize: 20,
  },
  usernameContainer: {
    paddingLeft: '5%',
    paddingVertical: 10,
  },
  introContainer: {
    backgroundColor: '#fff',
    paddingLeft: '5%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.tintColor,
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    classDetail: state.classes.classDetail,
    tutor: state.tutor,
    classList: state.classes.classList,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  getClassList,
  getTutorDetail,
  clearTutorProfile,
})(TutorInfoScreen)
