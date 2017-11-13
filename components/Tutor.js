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

import Colors from '../constants/Colors';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';

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
          <Avatar
            large
            rounded
            title={data.avatar}
            onPress={onPress}
            activeOpacity={0.7}
            style= {styles.avatar}
          />
        </View>

        <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
          <Text style={styles.className}> {data.className} </Text>
          <Text style={styles.tutorName}> {data.tutorName} </Text>
          <View style={styles.ratingRow}>
            <StarRating
              disabled
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              starSize={30}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={data.rating}
              starColor={Colors.tintColor}
              emptyStarColor={Colors.tintColor}
            />
            <Text style={styles.comment}> {`${data.comment} comments`} </Text>
          </View>
          <Text>
            <FontAwesome 
              name={'dollar'} 
              size={14}
              style={{marginLeft: '5%'}}
              color={'#E8DA3A'}
            />
            <Text> {`${data.fee}/lesson`}</Text>
          </Text>
          <Text>
            <MaterialIcons
              name={'location-on'} 
              size={14}
              color={'#ff0000'}
            />
            <Text style={styles.tutorName}> {data.address} </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heart} 
          onPress={() => this.setState({liked: !this.state.liked})}
        >
          <Ionicons
            name={this.state.liked ? 'ios-heart' : 'ios-heart-outline'}
            size={28}
            style={{ padding: '3%'}}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '2%',
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
    flex: 2
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
    fontSize: 18,
    color: '#555',
    fontWeight: '400',
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
  heart: {
    position: 'absolute',
    right: '3%',
    top: '10%',
  }
});

export default Tutor
