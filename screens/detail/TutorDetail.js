import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Tutor from '../../components/Tutor';

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
  phoneNumber:'12345678'
};

class TutorDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Tutor Detail',
  };

  render() {
    let { locale } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
        <View style={styles.loginContainer}>
          
          <Avatar
            large
            rounded
            icon={{name: 'account-box'}}
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainer}
          />
        </View>
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
              name={'alarm'}
              size={14}
              color={'#ff0000'}
            />
            <Text style={styles.tutorName}> {`${data.openingTime} - ${data.closingTime} `}</Text>
            </Text>
          <Text>
            <MaterialIcons
              name={'call'} 
              size={14}
              color={'#ff0000'}
            />
            <Text style={styles.tutorName}> {data.phoneNumber}</Text>
            
          </Text>
        </View>
        <View style={styles.map}>

        </View>
          <Text>
            <MaterialIcons
              name={'location-on'} 
              size={14}
              color={'#ff0000'}
            />
            <Text style={styles.tutorName}> {data.address} </Text>
          </Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={{color: 'white', }}> 
            {
              locale.tutorDetail.text.register.label
            }
            </Text>
          </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
    marginTop: '10%',
    marginBottom: '5%',
    backgroundColor: '#eee'
  },
  loginContainer: {
    //width: '100%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5%'
  },
  avatar: {
    marginTop: '5%',
    width: 75,
    height: 75,
    marginHorizontal: '5%'
  },
  contentContainer: {
    justifyContent: 'center',
    
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
  },
  map:{
    width:'100%',
    height:200,
    backgroundColor:'#555'
  },
  registerButton:{
    height: 40, 
    width: width,
    backgroundColor: Colors.tintColor,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  }
});

export default connect(mapStateToPorps)(TutorDetailScreen)
