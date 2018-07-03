import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window')
import Colors from '../../constants/Colors';
import { getClassList, getTutorDetail } from '../../redux/actions';
import { Separator, Tutor, Avatar, Spinner } from '../../components';
import StarRating from 'react-native-star-rating';

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
    }
  }

  componentWillMount() {
    this.props.getClassList(this.props.classDetail.user.userId);
    this.props.getTutorDetail(this.props.classDetail.user.userId);
    this.state.classDetail = this.props.classDetail;
    this.state.tutor = {profile: null};
  }

  componentDidMount () {
    this.state.didMount = true
  }

  renderLoading() {
    return <Spinner />
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

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tutorinfo_background_image.png')}
            style={{height: '100%', width: '100%'}}
          />
          <TouchableOpacity style={styles.chevronContainer} onPress={() => this.props.navigation.goBack()}>
            <Entypo
              name={"chevron-thin-left"}
              size={20}
              color={'#fff'}
            />
          </TouchableOpacity>
          <View style={styles.tutorAvatarContainer}>
            <Avatar
              large
              uri={classDetail.user.avatarUrl}
            />
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
        </View>
          <View style={styles.introContainer}>
            <View style={styles.tutorInfo}>
              <Text style={{width: '30%', fontWeight: 'bold'}}>{locale.tutorInfo.text.introduction}</Text>
              <Text style={{width: '60%'}}>
                {this.state.tutor.selfIntro}
              </Text>
            </View>
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
              <Text style={{width: '60%'}}>
                {this.state.tutor.achievement}
              </Text>
            </View>
          </View>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: '#efeff3',
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  tutorInfo: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tutorAvatarContainer: {
    position: 'absolute',
    top: '80%',
    flexDirection: 'row',
    paddingLeft: '5%'
  },
  chevronContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'transparent',
  },
  tabText: {
    paddingLeft: '5%',
    paddingVertical: 15,
  },
  usernameText: {
    fontSize: 20,
  },
  usernameContainer: {
    paddingLeft: '5%',
    paddingTop: '18%'
  },
  introContainer: {
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingVertical: 10,
    marginTop: '15%',
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
})(TutorInfoScreen)
