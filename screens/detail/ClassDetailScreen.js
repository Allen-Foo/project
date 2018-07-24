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
import Comment from '../comments/Comment';
import { getClassDetail } from '../../redux/actions';
import { Hr, Slideshow, Spinner, Separator, EditButton, Avatar } from '../../components';

let {width, height} = Dimensions.get('window');
const RATING = ['punctualityRating', 'environmentRating', 'attitudeRating', 'professionRating']

class ClassDetailScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;

    let headerRight = (
      <EditButton onPress={()=>navigation.navigate('EditClass', {classId: params.classId})} />
    )

    if (screenProps.appType == 'tutor') {
      return {
        headerTitle: screenProps.locale.classDetail.title,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: Colors.greyColor,
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
      collapsed: true,
      appliedClassList: null,
      classDetail: null,
      didMount: false,

    }
  }

  componentWillMount() {
    this.props.getClassDetail(this.props.navigation.state.params.classId)
    this.state.appliedClassList = this.props.appliedClassList
  }

  componentDidMount () {
    this.state.didMount = true
  }

  handleCommentButtonPress() {
    if (this.props.user) {
      this.props.navigation.navigate('GiveComment', {classId: this.state.classDetail.classId})
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

  shouldShowCommentButton() {
    // only show comment in learner mode
    let classId = this.props.navigation.state.params.classId;
    
    if (this.props.mode != 'learner') {
      return false
    } else if (this.props.user) {
      if (this.state.appliedClassList.some(list => list.classId === classId)) {
        if (this.props.classDetail.comments.some(x => x.user.userId == this.props.user.userId)) {
          return false
        }
        return true
      }
      return false
    } else {
      return false
    }
  }

  renderClassDetail() {
    let { locale, languageKey } = this.props;
    let { classDetail } = this.state;
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
              <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.classDetail.text.comment} </Text>
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
              <Text style={styles.tutorName}> {`${classDetail.fee} HKD`}</Text>
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
    let classInfo = this.state.classDetail;
    let classId = classInfo.classId;
    let userId = this.state.classDetail.user.userId

    if (this.state.appliedClassList && this.state.appliedClassList.some(list => list.classId === classId)) {
      return (
        <View style={styles.appliedButton} onPress={() => this.props.navigation.navigate('Payment', {classInfo})}>
          <Text style={{color: 'white', }}> 
            { this.props.locale.classDetail.text.applied.label }
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
            { this.props.locale.classDetail.text.applyNow.label }
          </Text>
        </TouchableOpacity>
      )
    }
  }

  renderContact() {
    let classId = this.props.navigation.state.params.classId;
    let userId = this.state.classDetail.user.userId

    if (this.state.appliedClassList && this.state.appliedClassList.some(list => list.classId == classId)
      || this.state.classDetail.userId === this.props.user.userId) {
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
            <Text style={styles.tutorName}> {this.state.classDetail.phone} </Text>
          </View>
        </View>
      )
    } 
  }
  
  renderAddress() {
    if (this.state.classDetail.address.formatted_address === 'On site') {
      return (
        <View style={styles.rowContainer}>
          <View style={styles.innerContainer}>
            <MaterialIcons
              name={'location-on'} 
              size={20}
              color={'#ff0000'}
            />
          </View>
          <View style={[styles.innerTextContainer, {width: '70%'}]}>
            <Text style={styles.address}> {this.state.classDetail.address.formatted_address} </Text>
          </View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('ClassMap', this.state.classDetail.address)}}>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <MaterialIcons
                name={'location-on'} 
                size={20}
                color={'#ff0000'}
              />
            </View>
            <View style={[styles.innerTextContainer, {width: '70%'}]}>
              <Text style={styles.address}> {this.state.classDetail.address.formatted_address} </Text>
            </View>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              color={'#555'}
              style={styles.chevronContainer}
            />
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
          <Text style={[styles.tutorName, {paddingVertical: 5}]}> {classDetail.user.name} </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.comment}> {`${classDetail.comments.length} reviews`} </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <MaterialIcons 
                name={'people'} 
                size={20}
                color={'#5ECC3F'}
              />
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.tutorName}> {locale.maxNumberOfStudent.text.maxNum + classDetail.maxNumberOfStudent + ' ' + locale.maxNumberOfStudent.text.ppl}</Text>
            </View>
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
              <Text style={styles.tutorName}> {`${classDetail.fee} HKD`}</Text>
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
            {
              this.shouldShowCommentButton() && 
              <TouchableOpacity style={styles.commentButton} onPress={() => this.handleCommentButtonPress()} >
                <Text style={{color: 'green', }}> 
                  { locale.classDetail.text.giveComment.label }
                </Text>
                <Entypo
                  name={"chevron-thin-right"}
                  size={15}
                  style={styles.chevronContainer}
                  color={'#555'}
                />
              </TouchableOpacity>
            }
        </View>
        { 
          classDetail.tutorList && classDetail.tutorList.length > 0 ? this.renderTutorList(classDetail, locale) : this.renderTutorInfo(classDetail, locale)
        }
        { 
          this.props.mode != 'learner' && this.renderLearnerInfo(classDetail) 
        }
        {
          this.props.mode == 'learner' && classDetail.user.userRole == 'company' &&
          this.renderCompanyInfo(classDetail, locale)
        }

        { classDetail.description != 'null' && 
          <View>
            <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.classDetail.text.classDescription} </Text>
            <View style={styles.classDetailContainer}>
              <View style={{marginTop: -20}}>
                { 
                  classDetail.description != 'null' && <Text>{classDetail.description}</Text>
                }
              </View>
            </View>
          </View>
        }
        

      </View>
    )
  }

  // for tutor account, render self profile info
  renderTutorInfo(classDetail, locale) {
    return (
      <View>
        <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.classDetail.text.tutor} </Text>
        <View style={styles.tutorDetailContainer}>
          <TouchableOpacity style={styles.innerClassDetailContainer} onPress={() => this.props.navigation.navigate('TutorInfoScreen')}>

            <View style={styles.tutorAvatarContainer}>
              <Avatar
                large
                uri={classDetail.user && classDetail.user.avatarUrl}
              />
              <View style={styles.usernameText}>
                <Text style={{fontSize: 20}}>{classDetail.user.name}</Text>
                <Text style={{fontSize: 14, color: '#bebebe'}}>{`${locale.classDetail.text.rating + parseFloat(classDetail.totalRatings).toFixed(1)}/5`}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <FontAwesome
                    name={"check-square-o"}
                    size={20}
                    color={'#f72470'}
                  />
                  <Text style={{marginLeft: 5, color: '#f72470'}}>{this.props.locale.classDetail.text.verifiedBy}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderCompanyInfo(classDetail, locale) {
    return (
      <View>
        <Text style={{paddingVertical: 15, paddingLeft: 10}}> {locale.classDetail.text.organization} </Text>
        <TouchableOpacity style={styles.tutorDetailContainer} onPress={() => this.props.navigation.navigate('CompanyInfo')}>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Avatar large uri={classDetail.user && classDetail.user.avatarUrl}/>
            <View style={styles.usernameText}>
              <Text style={{fontSize: 20}}>{classDetail.user.name}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <FontAwesome
                  name={"check-square-o"}
                  size={20}
                  color={'#f72470'}
                />
                <Text style={{marginLeft: 5, color: '#f72470'}}>{locale.classDetail.text.verifiedBy}</Text>
              </View>
              <Text style={{fontSize: 14, color: '#bebebe'}}>{`${locale.classDetail.text.rating + parseFloat(classDetail.totalRatings).toFixed(1)}/5`}</Text>
            </View>
          </View>
          <Text>{classDetail.user.introduction}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // for company account, render tutor list and company info
  renderTutorList(classDetail, locale) {
    let { tutorList } = classDetail;
    return (
      <View>
        <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.classDetail.text.tutor} </Text>
        <View style={styles.tutorDetailContainer}>
          { 
            tutorList.map((tutor, index) => (
              <View key={index} style={styles.innerClassDetailContainer} onPress={() => this.props.navigation.navigate('TutorInfoScreen')}>
                <View style={styles.tutorAvatarContainer}>
                  <Avatar
                    large
                    uri={tutor.avatarUrl}
                  />
                  <View style={styles.usernameText}>
                    <Text style={{fontSize: 20}}>{tutor.name}</Text>
                    <Text style={{fontSize: 14, color: '#bebebe'}}>{`${locale.classDetail.text.rating + parseFloat(classDetail.totalRatings).toFixed(1)}/5`}</Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <FontAwesome
                        name={"check-square-o"}
                        size={20}
                        color={'#f72470'}
                      />
                      <Text style={{marginLeft: 5, color: '#f72470'}}>{this.props.locale.classDetail.text.verifiedBy}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }

  // when switch to tutor mode, display the learner information 
  renderLearnerInfo(classDetail) {
    let { locale } = this.props;
    let studentInfo = this.state.collapsed ? classDetail.studentInfo.filter((x, i) => i < 2) : classDetail.studentInfo
    return (
      classDetail.studentInfo.length > 0 &&
        <View>
          <Text style={{paddingVertical: 15, paddingLeft: 10}}> {this.props.locale.classDetail.text.allStudent} </Text>
          { 
            studentInfo.map((userId, index) => 
              <View style={styles.studentDetailContainer} key={index}>
                <View style={styles.studentAvatarContainer}>
                  <Avatar
                    large
                    uri={userId && userId.avatarUrl}
                  />
                  <View style={styles.usernameText}>
                    <Text style={{fontSize: 20}}>{userId.name}</Text>
                    <View style={styles.rowContainer}>
                      <View >
                        <MaterialIcons
                          name={'call'} 
                          size={20}
                          color={'#ff0000'}
                        />
                      </View>
                      <View style={styles.innerTextContainer}>
                        <Text style={styles.tutorName}> {userId.phone} </Text>
                      </View>
                    </View>
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
                    <Text style={{marginRight: 10}}>{locale.classDetail.text.viewAllStudent}</Text>
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

    if (!this.state.classDetail && this.state.didMount) {
      this.state.classDetail = this.props.classDetail
    }

    if (this.props.isLoading || !this.state.classDetail) {
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
      <Text style={styles.textStyle}> {locale.classDetail.text[type]} </Text>
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
  classDetailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: 10
  },
  tutorDetailContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: 10
  },
  innerClassDetailContainer: {
    borderWidth: 1,
    borderColor: '#bebebe',
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  tutorAvatarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // position: 'absolute',
    paddingVertical: 10,
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
    alignItems: 'center',
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
    position: 'absolute',
    right: '5%',
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
    fontSize: 18,
    color: '#555',
    fontWeight: '700',
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
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
  }
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    mode: state.appType.mode,
    appliedClassList: state.userProfile.appliedClassList,
    user: state.userProfile.user,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    classDetail: state.classes.classDetail,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassDetail,
})(ClassDetailScreen)
