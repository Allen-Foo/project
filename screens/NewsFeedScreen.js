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

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import { connect } from 'react-redux';

import { mockData } from '../constants/mockData';
import StarRating from 'react-native-star-rating';


class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      headerTitle: state.params && state.params.title ? state.params.title : '',
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },  
    }
  };

  constructor(props) {
    super(props);
    this.state={
      liked: false
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({title: this.props.locale.newsfeed.title})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.props.navigation.setParams({title: nextProps.locale.newsfeed.title})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          mockData.map((data, index) => (
            <View key={index} style={styles.rowContainer}>
              <View style={styles.avatarContainer}>
                <Avatar
                  large
                  rounded
                  title={data.avatar}
                  onPress={() => console.warn("Works!")}
                  activeOpacity={0.7}
                  style= {styles.avatar}
                />
              </View>

              <View style={styles.contentContainer}>
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
                    style={{marginLeft: '1%'}}
                    color={'#E8DA3A'}
                  />
                  <Text> {`${data.fee}/lesson`}</Text>
                </Text>
                <Text style={styles.tutorName}> {data.address} </Text>
              </View>

              <TouchableOpacity
                style={styles.heart} 
                onPress={() => this.setState({liked: !this.state.liked})}
              >
                <Ionicons
                  name={this.state.liked ? 'ios-heart-outline' : 'ios-heart'}
                  size={28}
                  style={{ padding: '3%'}}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderColor: 'red',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  avatar: {
    marginTop: '5%',
    width: 75,
    height: 75,
    marginHorizontal: '5%'
  },
  contentContainer: {
    // borderWidth: 1,
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
  // console.warn('state', state)
  return {
    locale: state.language
  }
}

export default connect(mapStateToProps)(NewsFeedScreen)
