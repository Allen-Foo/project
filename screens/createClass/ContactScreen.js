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
import { Hr, NextButton} from '../../components';
import { createClass, editClass } from '../../redux/actions';
import { Dropdown } from 'react-native-material-dropdown';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const CHARGE_TYPES = ['perLesson', 'perSemester']

class Contact extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"check"}
          size={30}
          style={{ paddingRight: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      title: params.isEditMode ? null : screenProps.locale.contact.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.state = {
      contactNumber: params.contactNumber && String(params.contactNumber),
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({
      contactNumber: Number(this.state.contactNumber),
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
    params.contactNumber = Number(this.state.contactNumber)
    this.props.navigation.navigate('TutionFee', params)
  }

  render() {
    let { locale } = this.props;
    let { contactNumber } = this.state;
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
              onChangeText={(contactNumber) => this.setState({contactNumber})}
              value={contactNumber}
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
            !this.isEmpty(contactNumber) && !params.isEditMode &&
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
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(Contact)
