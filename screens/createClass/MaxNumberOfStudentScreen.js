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

class MaxNumberOfStudentScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}} />
    )

    return {
      title: params.isEditMode ? null : screenProps.locale.maxNumberOfStudent.title,
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
    this.state = {
      maxNumberOfStudent: params.maxNumberOfStudent && String(params.maxNumberOfStudent),
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({
      maxNumberOfStudent: Number(this.state.maxNumberOfStudent),
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
    params.maxNumberOfStudent = Number(this.state.maxNumberOfStudent)
    this.props.navigation.navigate('UploadPhoto', params)
  }

  render() {
    let { locale } = this.props;
    let { maxNumberOfStudent } = this.state;
    let { params = {} } = this.props.navigation.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={{width: 100, textAlign: 'left', paddingLeft: 10}}>{locale.maxNumberOfStudent.text.maxNum}</Text>
            <TextInput
              maxLength={4}
              autoFocus
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(maxNumberOfStudent) => this.setState({maxNumberOfStudent})}
              value={maxNumberOfStudent}
            />
            <Text style={{width: 100, textAlign: 'right', paddingRight: 40}}>{locale.maxNumberOfStudent.text.ppl}</Text>
          </View>
          {
            !this.isEmpty(maxNumberOfStudent) && !params.isEditMode &&
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50,
    paddingVertical: 15,
  },
  textInput: {
    width: '30%',
    fontSize: 14,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(MaxNumberOfStudentScreen)
