import React from 'react';
import { 
  Alert, 
  AsyncStorage, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  Dimensions,
} from 'react-native';

import moment from 'moment';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import { Entypo, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import Comment from '../comments/Comment';
import { getClassDetail } from '../../redux/actions';
import { Hr, Slideshow, Spinner, Separator, EditButton } from '../../components';

let {width, height} = Dimensions.get('window');
const RATING = ['punctualityRating', 'environmentRating', 'attitudeRating', 'professionRating']

class TutorDetailScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;

    let headerRight = (
      <EditButton onPress={()=>navigation.navigate('EditClass', {classId: params.classId})} />
    )

    if (screenProps.appType == 'tutor') {
      return {
        headerTitle: screenProps.locale.tutorDetail.title,
        headerTintColor: '#000',
        headerStyle: {
          backgroundColor: '#f7f7f7',
        },
        headerRight
      }
    } else {
      return {
        headerTitle: screenProps.locale.classList.title,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: Colors.tintColor,
        },
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      collapsed: true
    }
  }

  componentWillMount() {
    this.props.getClassDetail(this.props.navigation.state.params.classId)
  }

  handleCommentButtonPress() {
    if (this.props.user) {
      this.props.navigation.navigate('GiveComment', {classId: this.props.classDetail.classId})
    } else {
      this.props.navigation.navigate('Signin')
    }
  }

  formateTime = (time) => {
    let allTimeSlots = []
    Object.values(time).forEach(date => date.forEach(timeSlot => allTimeSlots.push(timeSlot)))

    let formattedTimeSlots = [];

    allTimeSlots.forEach((timeSlot, index) => {
      // only show 5 time slots
      if (index < 5) {
        let str = `${moment(timeSlot.startTime).format('YYYY-MM-DD')} from ${moment(timeSlot.startTime).format('HH:mm')} to ${moment(timeSlot.endTime).format('HH:mm')}`
        formattedTimeSlots.push(str)
      } else if (index == 5) {
        formattedTimeSlots.push('...')
      }
    })

    return formattedTimeSlots.join('\n')
  }

  renderClassDetail() {
    let { locale, classDetail, languageKey } = this.props;
    let photoList = classDetail.photoList.map(photo => ({uri: photo.location}))
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Slideshow 
            dataSource={photoList}
            containerStyle={sliderContainer}
            scrollEnabled={true}
          />
          {
            classDetail.rating != 'null' &&
            <View style={styles.ratingContainer}>
              {
                RATING.map((type, i) => (
                  <OverallRating
                    languageKey={languageKey}
                    locale={locale}
                    key={i}
                    type={type}
                    value={classDetail.rating[type]}
                  />
                ))
              }
            </View>
          }
          {this.renderClassContent(classDetail)}
          {
            classDetail.comments.length > 0 &&
            <View>
              <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.comment} </Text>
              { classDetail.comments.map((comment, index) => <Comment key={index} comment={comment}/>) }
            </View>
          }

          <View style={{height: 100}}/>
        </ScrollView>
        { 
          this.props.mode == 'learner' &&
          <View style={styles.bottomContainer}>
            <View style={styles.bottomPrice}>
              <FontAwesome 
                name={'dollar'} 
                size={14}
                color={'#E8DA3A'}
              />
              <Text style={styles.tutorName}> {`${classDetail.fee} HKD ${locale.classSummary.label[classDetail.chargeType]}`}</Text>
            </View>
            {
              this.renderApplyButton()
            }
          </View>
        }
      </View>
    )
  }

  renderApplyButton() {
    let classInfo = this.props.classDetail;
    let classId = classInfo.classId;
    let userId = this.props.classDetail.user.userId

    if (this.props.appliedClassList && this.props.appliedClassList.some(list => list.classId === classId)) {
      return (
        <View style={styles.appliedButton} onPress={() => this.props.navigation.navigate('Payment', {classInfo})}>
          <Text style={{color: 'white', }}> 
            { this.props.locale.tutorDetail.text.applied.label }
          </Text>
        </View>
      ) 
    } else {
      return (
        <TouchableOpacity 
          style={styles.applyButton} 
          onPress={() => {this.props.user ? this.props.navigation.navigate('Payment', {classInfo}) : this.props.navigation.navigate('Signin')}}
        >
          <Text style={{color: 'white', }}> 
            { this.props.locale.tutorDetail.text.applyNow.label }
          </Text>
        </TouchableOpacity>
      )
    }
  }

  renderContact() {
    let classId = this.props.navigation.state.params.classId;
    let userId = this.props.classDetail.user.userId

    if (this.props.appliedClassList && this.props.appliedClassList.some(list => list.classId == classId)) {
      return (
        <View style={styles.rowContainer}>
          <View style={styles.innerContainer}>
            <MaterialIcons
              name={'call'} 
              size={20}
              color={'#ff0000'}
            />
          </View>
          <View style={styles.innerTextContainer}>
            <Text style={styles.tutorName}> {this.props.classDetail.phone} </Text>
          </View>
        </View>
      )
    } 
  }
  renderAddress() {
    if (this.props.classDetail.address.formatted_address === 'On site') {
      return (
        <View style={styles.rowContainer}>
          <View style={styles.innerContainer}>
            <MaterialIcons
              name={'location-on'} 
              size={20}
              color={'#ff0000'}
              style={{position: 'absolute', right: 0}}
            />
          </View>
          <View style={[styles.innerTextContainer, {width: '70%'}]}>
            <Text style={styles.address}> {this.props.classDetail.address.formatted_address} </Text>
          </View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('ClassMap', this.props.classDetail.address)}}>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <MaterialIcons
                name={'location-on'} 
                size={20}
                color={'#ff0000'}
              />
            </View>
            <View style={[styles.innerTextContainer, {width: '70%'}]}>
              <Text style={styles.address}> {this.props.classDetail.address.formatted_address} </Text>
            </View>
            <View style={styles.chevronContainer}>
              <Entypo
                name={"chevron-thin-right"}
                size={15}
                color={'#555'}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderLoading() {
    return <Spinner />
  }

  renderClassContent(classDetail) {

    let { locale } = this.props;
    // console.warn('123', classDetail.time)
    return (
      <View>
        <View style={styles.contentContainer}>
          <Text style={styles.className}> {classDetail.title} </Text>
          <Text style={[styles.tutorName, {paddingVertical: 5}]}> {classDetail.user.username} </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.comment}> {`${classDetail.comments.length} reviews`} </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <FontAwesome 
                name={'dollar'} 
                size={20}
                color={'#E8DA3A'}
              />
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.tutorName}> {`${classDetail.fee} HKD ${locale.classSummary.label[classDetail.chargeType]}`}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <MaterialIcons
                name={'alarm'}
                size={20}
                color={'#ff0000'}
              />
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.tutorName}>{this.formateTime(classDetail.time)}</Text>
            </View>
          </View>
            { this.renderContact() }
            { this.renderAddress() }
          <TouchableOpacity style={styles.commentButton} onPress={() => this.handleCommentButtonPress()} >
            <Text style={{color: 'green', }}> 
              { locale.tutorDetail.text.giveComment.label }
            </Text>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              style={{position: 'absolute', right: 3}}
              color={'#555'}
            />
          </TouchableOpacity>
        </View>
        { this.props.mode == 'learner' ? this.renderTutorInfo(classDetail, locale) : this.renderLearnerInfo(classDetail) }
        <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.classDescription} </Text>
        <View style={styles.tutorDetailContainer}>
          <View style={{marginTop: -20}}>
            <Text>{classDetail.description}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderTutorInfo(classDetail, locale) {
    return (
      <View>
        <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.tutor} </Text>
        <View style={styles.tutorDetailContainer}>
          <TouchableOpacity style={styles.innerTutorDetailContainer} onPress={() => this.props.navigation.navigate('TutorInfo')}>
            <View style={{paddingTop: 50}}>
              <Text style={{paddingHorizontal: 10}}>Introduction:</Text>
              <Text style={{paddingHorizontal: 10, paddingTop: 5}}>
              Apple Certified Professional certifications are for the creative professional using Final Cut Pro X or Logic Pro X. 
              These certifications distinguish the learner as a skilled user, and provide a competitive edge in today’s ever-changing job market. 
              The Final Cut Pro X and Logic Pro X exams are computer based and offered at AATP locations worldwide.
              </Text>
            </View>
            <View style={styles.tutorAvatarContainer}>
              <Avatar
                large
                rounded
                source={{url: classDetail.user && classDetail.user.avatarUrl}}
                activeOpacity={0.7}
                containerStyle={styles.avatarContainer}
              />
              <View style={styles.usernameText}>
                <Text style={{fontSize: 20}}>{classDetail.user.username}</Text>
                <Text style={{fontSize: 14, color: '#bebebe'}}>{`${locale.tutorDetail.text.rating + parseFloat(classDetail.totalRatings).toFixed(1)}/5`}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <FontAwesome
                    name={"check-square-o"}
                    size={20}
                    color={'#f72470'}
                  />
                  <Text style={{marginLeft: 5, color: '#f72470'}}>{this.props.locale.tutorDetail.text.verifiedBy}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderLearnerInfo(classDetail) {
    let { locale } = this.props;
    let studentInfo = this.state.collapsed ? classDetail.studentInfo.filter((x, i) => i < 2) : classDetail.studentInfo
    return (
      classDetail.studentInfo.length > 0 &&
        <View>
          <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.allStudent} </Text>
          { 
            studentInfo.map((userId, index) => 
              <View style={styles.studentDetailContainer} key={index}>
                <View style={styles.studentAvatarContainer}>
                  <Avatar
                    large
                    rounded
                    source={{url: userId && userId.avatarUrl}}
                    activeOpacity={0.7}
                    containerStyle={styles.avatarContainer}
                  />
                  <View style={styles.usernameText}>
                    <Text style={{fontSize: 20}}>{userId.username}</Text>
                  </View>
                </View>
              </View>
            )
          }
          {
            classDetail.studentInfo.length > 2 &&
            <TouchableOpacity style={styles.displayAllButton} onPress={() => {this.setState({collapsed: false})}}>
              {
                this.state.collapsed ?
                  <View style={styles.studentRowContainer}>
                    <Text style={{marginRight: 10}}>{locale.tutorDetail.text.viewAllStudent}</Text>
                    <Entypo
                      name={"chevron-thin-down"}
                      size={15}
                      color={'#555'}
                    />
                  </View>
                :
                  <View style={styles.studentRowContainer}>
                    <Entypo
                      name={"chevron-thin-up"}
                      size={15}
                      color={'#555'}
                    />
                  </View>
              }
            </TouchableOpacity> 
          }
        </View>
    )
  }

  render() {
    if (this.props.isLoading || !this.props.classDetail) {
      return this.renderLoading()
    } else {
      return this.renderClassDetail()
    }
  }
}

const OverallRating = props => {
  let { type, value, locale, languageKey } = props;

  let innerRatingRow = styles.innerRatingRow
  if (languageKey == 'en') {
    innerRatingRow = [innerRatingRow, {paddingHorizontal: '10%'}]
  }

  return (
    <View style={innerRatingRow}>
      <Text style={styles.textStyle}> {locale.tutorDetail.text[type]} </Text>
      <Text style={styles.ratingStyle}>{parseFloat(value).toFixed(1)}</Text>
    </View>
  )
}

const sliderContainer = {
  width: width,
  height: width * 3 / 4,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  tutorDetailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: 10
  },
  innerTutorDetailContainer: {
    borderWidth: 1,
    borderColor: '#bebebe',
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 20,
  },
  tutorAvatarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    top: -20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  studentDetailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: 10
  },
  studentAvatarContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  studentRowContainer: {
    justifyContent: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efeff3',
  },
  displayAllButton: {

  },
  rowContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  innerContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '8%'
  },
  innerTextContainer: {
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: '#fff',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  innerRatingRow: {
    marginTop: 10,
    paddingHorizontal: '15%',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  bottomPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    backgroundColor: '#fff'
  },
  usernameText: {
    paddingLeft: 10
  },
  ratingStyle: {
    fontSize: 12,
    color: 'red'
  },
  textStyle: {
    color: '#555',
    fontSize: 12,
    fontWeight: 'bold'
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 45
  },
  address: {
    color: '#555',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingLeft: '5%',
    backgroundColor: '#fff',
  },
  ratingRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  className: {
    paddingVertical: 5,
    fontSize: 16,
    color: '#555',
    fontWeight: '400',
  },
  tutorName: {
    color: '#555',
    fontSize: 14,
  },
  comment: {
    alignItems: 'flex-end',
    fontSize: 10,
    fontWeight: '500'
  },
  appliedButton: {
    paddingVertical: 15,
    width: '40%',
    backgroundColor: '#d2d1d3',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  applyButton: {
    paddingVertical: 15,
    width: '40%',
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  commentButton: {
    flexDirection: 'row',
    paddingVertical: 20,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
    borderRadius: 5, 
  }
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    mode: state.appType.mode,
    appliedClassList: state.socialLogin.appliedClassList,
    user: state.socialLogin.user,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    classDetail: state.classes.classDetail,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassDetail,
})(TutorDetailScreen)
