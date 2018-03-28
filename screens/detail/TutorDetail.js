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

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import { Entypo, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import Comment from '../comments/Comment';
import { getClassDetail } from '../../redux/actions';
import { Hr, Slideshow, Spinner} from '../../components';

let {width, height} = Dimensions.get('window');
const RATING = ['punctualityRating', 'environmentRating', 'attitudeRating', 'professionRating']

class TutorDetailScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.tutorDetail.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
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

  renderClassDetail() {
    let { locale, classDetail } = this.props;
    let photoList = classDetail.photoList.map(photo => ({uri: photo.location}))

    return (
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
                  locale={locale}
                  key={i}
                  locale={locale}
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
            <Text style={{paddingVertical: 20, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.comment} </Text>
            { classDetail.comments.map((comment, index) => <Comment key={index} comment={comment}/>) }
          </View>
        }
        
      </ScrollView>
    )
  }

  renderLoading() {
    return <Spinner />
  }

  renderClassContent(classDetail) {
    let { locale } = this.props;
    return (
      <View>
        <View style={styles.contentContainer}>
          <Text style={styles.className}> {classDetail.title} </Text>
          <Text style={[styles.tutorName, {paddingVertical: 5}]}> {'Chan Tai Man'} </Text>
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
              <Text style={styles.tutorName}> {`4:30pm - 5:30pm `}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.innerContainer}>
              <MaterialIcons
                name={'call'} 
                size={20}
                color={'#ff0000'}
              />
            </View>
            <View style={styles.innerTextContainer}>
              <Text style={styles.tutorName}> {`2167 2834`} </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('ClassMap', classDetail.address)}}>
            <View style={styles.rowContainer}>
              <View style={styles.innerContainer}>
                <MaterialIcons
                  name={'location-on'} 
                  size={20}
                  color={'#ff0000'}
                />
              </View>
              <View style={[styles.innerTextContainer, {width: '70%'}]}>
                <Text style={styles.address}> {classDetail.address.formatted_address} </Text>
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
          <TouchableOpacity style={styles.commentButton} onPress={() => this.handleCommentButtonPress()} >
            <Text style={{color: 'green', }}> 
              { locale.tutorDetail.text.giveComment.label }
            </Text>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              style={{position: 'absolute', right: 0}}
              color={'#555'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={{color: 'white', }}> 
              { locale.tutorDetail.text.applyNow.label }
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{paddingVertical: 20, paddingLeft: 10}}> {this.props.locale.tutorDetail.text.tutor} </Text>
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
                source={{url: classDetail.user.avatarUrl}}
                activeOpacity={0.7}
                containerStyle={styles.avatarContainer}
              />
              <View style={styles.usernameText}>
                <Text style={{fontSize: 20}}>{classDetail.user.username}</Text>
                <Text style={{fontSize: 14, color: '#bebebe'}}>{`Rating ${classDetail.totalRatings}/5`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
  let { type, value, locale } = props;

  return (
    <View style={styles.innerRatingRow}>
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
    borderWidth :1,
    borderColor: '#bebebe',
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 20,
    // overflow: 'visible',
    // paddingTop: -30,
  },
  tutorAvatarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // marginTop: -20, 
    position: 'absolute',
    top: -20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
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
    paddingLeft: '10%',
    flexDirection: 'row',
    width: '50%',
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
  applyButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '90%',
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
    borderRadius: 5, 
    marginBottom: 5,
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
    user: state.socialLogin.user,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    classDetail: state.classes.classDetail,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassDetail
})(TutorDetailScreen)
