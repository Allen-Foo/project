import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { Avatar, Rating } from 'react-native-elements';

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { mockData } from '../../constants/mockData';

import { Tutor, Separator } from '../../components';

import StarRating from 'react-native-star-rating';

const { width } = Dimensions.get('window');

const data = {
  avatar: 'DF',
  className: '1.The Darts Factory',
  tutorName: 'Chan Tai Man',
  rating: 3.5,
  comment: '30',
  fee: '150',
  address: 'Address1',
  liked: true,
  openingTime:'10:00',
  closingTime:'22:00',
  phoneNumber:'12345678',
  userComment:'It is a very useful class, Our vision has always been to create an iPhone that is entirely screen. One so immersive the device itself disappears into the experience. And so intelligent it can respond to a tap, your voice, and even a glance. With iPhone X, that vision is now a reality. Say hello to the future.'
};

class Comments extends React.Component {

  render() {
    const {onPress} = this.props;
    return (
      <View>
        <Separator />
        <View style={styles.rowContainer} onPress={() => this.props.navigation.navigate('CommentDetail')}>

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
              <Text style={styles.userComment}> {data.userComment} </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heart} 
            //onPress={() => this.setState({liked: !this.state.liked})}
          >
            
          </TouchableOpacity>
        </View>
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
    fontSize: 14,
    color: '#555',
    fontWeight: '400',
  },
  tutorName: {
    color: '#555',
    fontSize: 14,
    //marginLeft: '8%'
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
  userComment:{
    color: '#555',
    fontSize: 12,
  }
});

export default Comments
