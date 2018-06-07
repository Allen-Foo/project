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
import { CheckBox } from 'react-native-elements'

class TutorListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false
    }
  }

  handleToggle() {
    const { data, onPress, locale, isCheckMode, handleAddTutor, handleRemoveTutor} = this.props;
    if (this.state.checked) {
      handleRemoveTutor(data)
    } else {
      handleAddTutor(data)
    }
    this.setState({checked: !this.state.checked})
  }

  render() {
    const { data, onPress, locale, isCheckMode } = this.props;
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.avatarContainer} onPress={onPress}>
          <Image source={{uri: data.avatarUrl}} style={styles.avatar}/>
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
        {
          isCheckMode &&
          <TouchableOpacity style={[styles.contentContainer, {flex: 1}]} onPress={onPress}>
            <CheckBox
              checkedColor={Colors.tintColor}
              containerStyle={styles.checkBox}
              iconType='material'
              checkedIcon='check-circle'
              uncheckedIcon='radio-button-unchecked'
              size={28}
              checked={this.state.checked}
              onPress={() => this.handleToggle()}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

TutorListItem.defaultProps = {
  isCheckMode: false
};

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
    flex: 2,
  },
  avatar: {
    marginTop: '5%',
    width: 90,
    height: 90,
    borderRadius: 45
  },
  contentContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  tutorName: {
    textAlign: 'left',
    fontSize: 16,
    paddingVertical: 2,
    fontWeight: '500',
  },
  email: {
    paddingVertical: 2,
    textAlign: 'left',
  },
  phone: {
    textAlign: 'left',
    paddingVertical: 2,
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 0,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps)(TutorListItem)
