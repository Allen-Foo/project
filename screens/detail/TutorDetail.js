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
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Comment from '../comments/Comment';
import { getClassDetail } from '../../redux/actions';
import { Hr, Slideshow, Spinner} from '../../components';

let {width, height} = Dimensions.get('window');

const data = {
  avatar: 'DF',
  className: '1.The Darts Factory',
  tutorName: 'Chan Tai Man',
  rating: 3.5,
  comment: '30',
  fee: '150',
  address: 'Address1',
  liked: true,
  openingTime: '10:00',
  closingTime: '22:00',
  phoneNumber: '12345678',
  userComment: 'It is a very useful class, Our vision has always been to create an iPhone that is entirely screen. One so immersive the device itself disappears into the experience. And so intelligent it can respond to a tap, your voice, and even a glance. With iPhone X, that vision is now a reality. Say hello to the future. ',
};

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

  renderClassDetail() {
    let { locale, classDetail } = this.props;
    let photoList = classDetail.photoList.map(photo => ({uri: photo.location}))
    // console.warn('comments', classDetail.comments)
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Slideshow 
            dataSource={photoList}
            containerStyle={sliderContainer}
            scrollEnabled={true}
          />
          <TouchableOpacity style={styles.registerButton}>
            <Text style={{color: 'white', }}> 
              { locale.tutorDetail.text.applyNow.label }
            </Text>

          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={styles.className}> {classDetail.title} </Text>
            <Text style={[styles.tutorName, {paddingVertical: 5}]}> {data.tutorName} </Text>
            <View style={styles.ratingRow}>
              <StarRating
                disabled
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                starSize={30}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={classDetail.rating}
                starColor={Colors.tintColor}
                emptyStarColor={Colors.tintColor}
                rounding={'up'}
              />
              <Text style={styles.comment}> {`${classDetail.comments.length} comments`} </Text>
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
            <TouchableOpacity style={styles.commentButton} onPress={() => this.props.navigation.navigate('GiveComment', {classId: classDetail.classId})} >
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
          </View>
        { classDetail.comments.map((comment, index) => <Comment key={index} comment={comment}/>) }
      </ScrollView>
    )
  }

  renderLoading() {
    return <Spinner />
  }

  render() {
    if (this.props.isLoading || !this.props.classDetail) {
      return this.renderLoading()
    } else {
      return this.renderClassDetail()
    }
  }
}

const sliderContainer = {
  width: width,
  height: width * 3 / 4,
  // marginBottom: 20,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  rowContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
  },
  innerContainer: {
    justifyContent: 'center',
    width: '8%'
  },
  innerTextContainer: {
    justifyContent: 'center',
    paddingLeft: 5,
    // backgroundColor: 'green',
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 45
  },
  address: {
    color: '#555',
    // backgroundColor: 'red',
    // flexWrap: 'wrap',
    // textAlign: 'left',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  ratingRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  rating: { 
    paddingVertical: '2%',
    paddingRight: '2%',
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
  heart: {
    position: 'absolute',
    right: '3%',
    top: '10%',
  },
  map: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderWidth: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    alignSelf: 'center',
  },
  registerButton: {
    flexDirection: 'row',
    paddingVertical:10,
    width: '90%',
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
    borderRadius: 5, 
    marginVertical: 5,
  },
  commentButton: {
    flexDirection: 'row',
    paddingVertical:20,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
    borderRadius: 5, 
    marginVertical: 5,
  }
});

const mapStateToProps = (state) => {
  return {
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
