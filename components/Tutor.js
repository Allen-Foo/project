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
import Ribbon from './Ribbon';

import StarRating from 'react-native-star-rating';

const RIBBON_COLOR = {
  'closed': Colors.closed,
  'new': Colors.tintColor,
  'full': Colors.full,
  'sale': Colors.sales,
}

class Tutor extends React.Component {

  constructor(props) {
    super(props);

    this.mounted = false;

    let bookmark = this.props.bookmark || []

    // calculate the remainSeconds
    const currentSeconds = Date.now();
    let startTime = Object.values(props.data.time)[0][0].startTime
    let interval = new Date(startTime) - currentSeconds
    let showLastMinute = false

    if (interval < 3 * 24 * 60 * 60 * 1000 && interval > 0) {
      showLastMinute = true
    }

    this.state={
      liked: bookmark.includes(props.data.classId),
      ribbonType: this.getRibbonType(props.data),
      secondsRemaining: interval > 0 ? interval : 0,
      timeoutId: null,
      previousSeconds: null,
      showLastMinute: showLastMinute,
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.tick();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookmark !== this.props.bookmark) {
      this.setState({
        liked: nextProps.bookmark.includes(this.props.data.classId)
      })
    }
  }

  componentDidUpdate() {
    if (!this.state.previousSeconds && this.state.secondsRemaining > 0 && this.mounted) {
      console.warn('componentDidUpdate', this.state.previousSeconds)
      this.tick();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.state.timeoutId);
  }

  tick = () => {
    const currentSeconds = Date.now();
    const dt = this.state.previousSeconds ? currentSeconds - this.state.previousSeconds : 0;
    const interval = this.props.interval || 1000;
    const intervalSecondsRemaing = interval - (dt % interval);
    let timeout = intervalSecondsRemaing;
    if (intervalSecondsRemaing < interval / 2.0) {
      timeout += interval;
    }
    const secondsRemaining = Math.max(this.state.secondsRemaining - dt, 0);
    const isComplete = this.state.previousSeconds && secondsRemaining <= 0;

    if (this.mounted) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }
      this.setState({
        timeoutId: isComplete ? null : setTimeout(this.tick, timeout),
        previousSeconds: currentSeconds,
        secondsRemaining
      });
    }
    if (isComplete) {
      // if complete, set flag to 'closed'
      this.setState({ribbonType: 'closed'})
      return;
    }
  };

  getFormattedTime = (milliseconds) => {
    const remainingSec = Math.round(milliseconds / 1000);
    const seconds = parseInt((remainingSec % 60).toString(), 10);
    const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
    const hours = parseInt((remainingSec / 3600).toString(), 10);
    const s = seconds < 10 ? '0' + seconds : seconds;
    const m = minutes < 10 ? '0' + minutes : minutes;
    if (hours > 24) {
      return `${Math.floor(hours / 24)} days`
    }
    let h = hours < 10 ? '0' + hours : hours;
    h = h === '00' ? '' : h + ':';
    return h + m + ':' + s;
  };

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

  getRibbonType(data) {
    let current = new Date ();
    let hasPassed = false;
    Object.values(data.time).forEach(date => {
      let tempTime = new Date (date[0].startTime)
      if (current - tempTime > 0) {
        hasPassed = true;
      }
    })

    let isFull = (data.numberOfStudent >= data.maxNumberOfStudent)

    if (hasPassed) {
      return 'closed'
    }
    else if (isFull) {
      return 'full'
    }
    else {
      return 'new'
    }
  } 

  render() {
    const { data, onPress, locale } = this.props;
    let { ribbonType, showLastMinute } = this.state;
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
            {
              ribbonType &&
              <RibbonComponent
                color={RIBBON_COLOR[ribbonType]}
                text={locale.ribbon[ribbonType]}
              />  
            }
          </View>
          {
            showLastMinute &&
            <View style={{backgroundColor: '#F22029', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10}}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 18, paddingRight: 20}}> {`$ ${data.fee} HKD`}</Text>
              <Text style={{color: '#FFC702', fontSize: 13, fontWeight: '600'}}>{`Only ${this.getFormattedTime(this.state.secondsRemaining)} Left`}</Text>
            </View>
          }
          <View style={{paddingTop: 8}}>
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
            <Text style={{paddingLeft: 10}}>
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
              color={'grey'}
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

const RibbonComponent = props => {
  let { color, text } = props
  return (
    <Ribbon
      cornerRadius={80}
      alignment={'left'}
      style={{backgroundColor: color, height: 24,}}
      textStyle={{color: '#fff', fontSize: 14, fontWeight: '600'}}
    >
      {text}
    </Ribbon>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 10,
    marginTop: 20,
  },
  avatarContainer: {
    overflow: 'hidden',
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
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  rating: { 
    paddingVertical: '2%',
    paddingRight: '2%',
  },
  className: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
    paddingLeft: 10,
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
    bottom: 10,
    padding: 10,
  },
  redHeart: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
