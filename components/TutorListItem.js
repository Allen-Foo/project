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


class TutorListItem extends React.Component {

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
            <Text style={styles.tutorName}>{data.tutorName}</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.email}>{`${locale.createTutor.text.email}: `}</Text>
                <Text style={styles.phone}>{`${locale.createTutor.text.phone}: `}</Text>
              </View>
              <View style={{paddingLeft: 5}}>
                <Text style={styles.email}>{data.email}</Text>
                <Text style={styles.phone}>{data.phone}</Text>
              </View>
            </View>
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
    backgroundColor: '#fff',
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
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  tutorInfo: {
    alignItems: 'center'
  },
  tutorName: {
    textAlign: 'left',
    fontSize: 16,
    paddingVertical: 2,
  },
  email: {
    paddingVertical: 2,
    textAlign: 'left',
  },
  phone: {
    textAlign: 'left',
    paddingVertical: 2,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps)(TutorListItem)
