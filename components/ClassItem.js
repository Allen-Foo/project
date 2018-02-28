// ClassItem.js
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
import { connect } from 'react-redux';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';


class ClassItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  render() {
    const { data, onPress, locale } = this.props;
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.avatarContainer} onPress={onPress}>
          <Image source={{uri: data.uri}} style={styles.avatar}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
          <Text style={styles.className}> {data.title} </Text>
          <Text style={styles.tutorName}> {data.tutorName} </Text>
          <View style={styles.ratingRow}>
            <StarRating
              disabled
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              starSize={25}
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
          <Text>
            <MaterialIcons
              name={'location-on'} 
              size={14}
              color={'#ff0000'}
            />
            <Text style={styles.tutorName}> {data.address.formatted_address} </Text>
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
    // backgroundColor: 'green',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginTop: '5%',
    width: 90,
    height: 90,
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

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps)(ClassItem)
