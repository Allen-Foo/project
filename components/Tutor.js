// Tutor.js
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../constants/Colors';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import { addToBookmark, removeFromBookmark } from '../redux/actions';

import StarRating from 'react-native-star-rating';


class Tutor extends React.Component {

  constructor(props) {
    super(props);

    let bookmark = this.props.bookmark || []
    this.state={
      liked: bookmark.includes(props.data.classId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookmark !== this.props.bookmark) {
      this.setState({
        liked: nextProps.bookmark.includes(this.props.data.classId)
      })
    }
  }

  handleLike(classId) {
    if (this.props.user) {
      this.setState({liked: !this.state.liked})
      this.props.addToBookmark(classId)
    } else {
      this.props.handleUnauthorizedCall && this.props.handleUnauthorizedCall()
    }
  }

  handleUnlike(classId) {
    this.setState({liked: !this.state.liked})
    this.props.removeFromBookmark(classId)
  }

  render() {
    const { data, onPress, locale } = this.props;
    let rating = Object.values(data.rating).reduce((a, b) => a + b, 0) / Object.values(data.rating).length

    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
          <View style={styles.avatarContainer}>
            <Image
              source={{uri: data.photoList && data.photoList[0].location}}
              style={{width: '100%', height: 150}}
              resizeMode={'cover'}
              onPress={onPress}
            />
            {
              data.distance &&
              <View style={styles.distance}>
                <Text style={styles.distanceText}>
                  {
                    data.distance == 'On site'
                    ? locale.classAddress.label.onSite
                    : data.distance < 1
                      ? `${parseFloat(data.distance * 1000).toFixed(1)} m`
                      : `${parseFloat(data.distance).toFixed(1)} km`
                  }
                </Text>
              </View>
            }
          </View>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.className}> {data.title} </Text>
            <View style={styles.ratingRow}>
              <StarRating
                disabled
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                starSize={15}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={rating}
                starColor={Colors.tintColor}
                emptyStarColor={Colors.tintColor}
              />
              <Text style={styles.comment}> {`${data.comments.length} ${this.props.locale.newsfeed.text.comment}`} </Text>
            </View>
            <Text>
              <FontAwesome 
                name={'dollar'}
                size={14}
                style={{marginLeft: '5%'}}
                color={'#E8DA3A'}
              />
              <Text> {`${data.fee} HKD`}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        {
          !this.state.liked &&
          <TouchableOpacity
            style={styles.whiteHeart} 
            onPress={() => this.handleLike(data.classId)}
          >
            <Ionicons
              name={'ios-heart-outline'}
              size={24}
              style={{ padding: '3%', backgroundColor: 'transparent'}}
              color={'red'}
            />
          </TouchableOpacity>
        }
        {
          this.state.liked &&
          <TouchableOpacity
            style={styles.redHeart} 
            onPress={() => this.handleUnlike(data.classId)}
          >
            <Ionicons
              name={ 'ios-heart'}
              size={24}
              style={{padding: '3%',backgroundColor: 'transparent'}}
              color={'red'}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 10,
    marginTop: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginTop: '5%',
    width: 75,
    height: 75,
    marginHorizontal: '5%'
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 2,
    // paddingLeft: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  rating: { 
    paddingVertical: '2%',
    paddingRight: '2%',
  },
  className: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  tutorName: {
    color: '#555',
    fontSize: 14,
    marginLeft: '8%'
  },
  comment: {
    alignItems: 'flex-end',
    fontSize: 10,
    fontWeight: '500'
  },
  whiteHeart: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    padding: 10,
  },
  redHeart: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    padding: 10,
  },
  distance: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'transparent',
  },
  distanceText: {
    color: '#fff',
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    user: state.userProfile.user,
    bookmark: state.userProfile.user && state.userProfile.user.bookmark,
  }
}

export default connect(mapStateToProps, {
  addToBookmark,
  removeFromBookmark,
})(Tutor)
