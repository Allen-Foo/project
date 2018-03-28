import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window')
import Colors from '../../constants/Colors';
import { getClassList } from '../../redux/actions';
import { Separator, Tutor } from '../../components';
import StarRating from 'react-native-star-rating';

class TutorInfo extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.props.getClassList(this.props.classDetail.user.userId)
  }

  render() {
    let { classDetail, classList, locale } = this.props
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
              rounded
              source={{url: classDetail.user.avatarUrl}}
              // onPress={() => this.props.navigation.navigate('ProfileSetting')}
              activeOpacity={0.7}
              // containerStyle={styles.avatarContainer}
            />
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{classDetail.user.username}</Text>
            </View>
          </View>
        </View>
          <View style={styles.introContainer}>
            <View style={{flexDirection:'row'}}>
              <Text style={{width: '30%'}}>Introduction: </Text>
              <Text style={{width: '60%'}}>
                Apple Certified Professional certifications are for the creative professional using Final Cut Pro X or Logic Pro X. 
                These certifications distinguish the learner as a skilled user, and provide a competitive edge in today’s ever-changing job market. 
                The Final Cut Pro X and Logic Pro X exams are computer based and offered at AATP locations worldwide.
              </Text>
            </View>
          </View>
          <Text style={{paddingTop: 10}}> {locale.tutorInfo.text.mainCourse} </Text>

            {
              classList.map((cls, index) => (
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
    paddingVertical: '5%',
    marginTop: '15%',
  },
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    classDetail: state.classes.classDetail,
    classList: state.classes.classList,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  getClassList,
})(TutorInfo)
