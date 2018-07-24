import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Picker,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton, CheckButton } from '../../components';
import { createClass, editClass } from '../../redux/actions';
import { Dropdown } from 'react-native-material-dropdown';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CHARGE_TYPES = ['perLesson', 'perSemester']

class Contact extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}} />
    )

    return {
      title: params.isEditMode ? null : screenProps.locale.contact.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    let phone = '';

    if (params.phone) {
      phone = String(params.phone)
    }
    else {
      phone = this.props.user.phone;
      if (phone.includes('+852')) {
        phone = phone.substring(4)
      }
    }

    this.state = {
      phone: phone,
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({
      phone: Number(this.state.phone),
    })
    this.props.navigation.goBack();
  }

  isEmpty(str) {
    if (typeof str == 'undefined' || !str || str.length === 0 ||
       str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === ""
    ) {
      return true;
    }
    return false;
  }

  handleNext = () => {
    let { params = {} } = this.props.navigation.state;
    params.phone = Number(this.state.phone)
    this.props.navigation.navigate('TutionFee', params)
  }

  render() {
    let { locale } = this.props;
    let { phone } = this.state;
    let { params = {} } = this.props.navigation.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={{paddingLeft: 10}}>{locale.contact.text.contactNumber}</Text>
            <TextInput
              maxLength={8}
              autoFocus
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(phone) => this.setState({phone})}
              value={phone}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>
              <Text>{locale.contact.text.notification1}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>{locale.contact.text.notification2}</Text>
              <Text>{locale.contact.text.notification3}</Text>
            </Text>
          </View>
          {
            !this.isEmpty(phone) && !params.isEditMode &&
            <NextButton 
              onPress={() => this.handleNext()}
              text={locale.common.next}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: '10%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50,
    paddingVertical: 15,
  },
  textInput: {
    width: '50%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 5,
    marginLeft: 45,
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    user: state.userProfile.user,
  }
}

export default connect(mapStateToProps, {
  editClass,
})(Contact)
