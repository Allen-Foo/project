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
import { addToBookmark } from '../redux/actions';

import StarRating from 'react-native-star-rating';


class Tutor extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      liked: false
    }
  }

  render() {
    const { data, onPress } = this.props;
    return (
      <View style={styles.rowContainer}>
        <View style={styles.avatarContainer}>

          <Image
            source={{uri: data.photoList && data.photoList[0].location}}
            style={{width: '100%', height: 100}}
            resizeMode={'cover'}
          />
        </View>

        <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
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
              rating={data.rating}
              starColor={Colors.tintColor}
              emptyStarColor={Colors.tintColor}
            />
            <Text style={styles.comment}> {`${data.comment || 0} comments`} </Text>
          </View>
          <Text>
            <FontAwesome 
              name={'dollar'}
              size={14}
              style={{marginLeft: '5%'}}
              color={'#E8DA3A'}
            />
            <Text> {`${data.fee} ${locale.classSummary.label[data.chargeType]}`}</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whiteHeart} 
          onPress={() => this.setState({liked: !this.state.liked})}
        >
          <Ionicons
            name={'ios-heart-outline'}
            size={24}
            style={{ padding: '3%', backgroundColor: 'transparent'}}
            color={'white'}
          />
        </TouchableOpacity>
        {
          this.state.liked &&
          <TouchableOpacity
            style={styles.redHeart} 
            onPress={() => this.props.addToBookmark(data.classId)}
          >
            <Ionicons
              name={ 'ios-heart'}
              size={21}
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
    paddingLeft: 10,
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
    right: '0%',
    top: '-1%',
  },
  redHeart: {
    position: 'absolute',
    right: '0.2%',
    top: '-0.1%',
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps, {
  addToBookmark
})(Tutor)
