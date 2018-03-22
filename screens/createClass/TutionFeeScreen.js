import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';
import { createClass, editClass } from '../../redux/actions';
import { Dropdown } from 'react-native-material-dropdown';
import { MaterialIcons } from '@expo/vector-icons';

const CHARGE_TYPES = ['perHour', 'perLesson']

class TutionFee extends React.Component {
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
      title: params.isEditMode ? null : screenProps.locale.tutionFee.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.state = {
      fee: params.fee && String(params.fee),
      chargeType: params.chargeType || 'perHour',
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({
      fee: Number(this.state.fee),
      chargeType: this.state.chargeType
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
    params.fee = Number(this.state.fee)
    params.chargeType = this.state.chargeType
    this.props.navigation.navigate('UploadPhoto', params)
  }

  render() {
    let { locale } = this.props;
    let { fee, chargeType } = this.state;
    let { params = {} } = this.props.navigation.state;

    let dropDownData = CHARGE_TYPES.map(x => ({value: locale.tutionFee.text[x]}))

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={{paddingLeft: 10}}>{locale.tutionFee.text.price}</Text>
            <View style={styles.dropDownStyle}>
              <Dropdown 
                label={''}
                data={dropDownData} 
                fontSize={14} 
                labelFontSize={14} 
                itemCount={2} 
                containerStyle={styles.dropDownList}
                onChangeText={(type, index) => this.setState({chargeType: CHARGE_TYPES[index]})}
                value={locale.tutionFee.text[chargeType]}
              />
            </View>
            <Text style={{color: '#FF5A5F'}}>＄</Text>
            <TextInput
              maxLength={4}
              autoFocus
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(fee) => this.setState({fee})}
              value={fee}
            />
          </View>
          {
            !this.isEmpty(fee) && chargeType && !params.isEditMode &&
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
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  dropDownStyle: {
    width: '40%',
    marginBottom: 20,
  },
  dropDownList: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50,
    height: 60,
  },
  textInput: {
    width: '20%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(TutionFee)
