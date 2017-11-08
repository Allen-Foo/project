import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Tutor from '../../components/Tutor';

const data = {
  avatar: 'DF',
  className: '1.The Darts Factory',
  tutorName: 'Chan Tai Man',
  rating: 3.5,
  comment: '30',
  fee: '150',
  address: 'Address1',
  liked: true,
};

class TutorDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Tutor Detail',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginContainer}>
          {/*
          <Avatar
            large
            rounded
            icon={{name: 'account-box'}}
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainer}
          />
          */}
          <Text style={{color: '#fff'}}> 
          </Text>
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
        </View>
        </View>
      </ScrollView>
    );
  }
}




const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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

export default connect(mapStateToPorps)(TutorDetailScreen)
