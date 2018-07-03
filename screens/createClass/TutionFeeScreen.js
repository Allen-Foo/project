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
import Colors from '../../constants/Colors';

const CHARGE_TYPES = ['perLesson', 'perSemester']

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
      fee: params.fee && String(params.fee),
      chargeType: params.chargeType || 'perLesson',
      showPicker: false,
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
  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({chargeType: v})
    this.hidePicker()
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
            <TouchableOpacity 
              style={styles.chargeTypeButton} 
              onPress={() => this.showPicker()}
            >
              <Text>
                {locale.advancedSearch.text[this.state.chargeType] || locale.advancedSearch.text.selectChargeType}
              </Text>
              <View style={styles.chargeTypeChevron}>
                <Entypo
                  name={"chevron-thin-down"}
                  size={15}
                  color={'#555'}
                />
              </View>
            </TouchableOpacity>
            <Text style={{color: '#FF5A5F', marginLeft: 30}}>＄</Text>
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
          { 
            this.state.showPicker &&
            <ChargeTypePicker
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              locale={locale}
              chargeType={this.state.chargeType}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class ChargeTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chargeType: props.chargeType || 'perLesson'
    }
  }

  render() {
    const { chargeType, locale, onCancel, onConfirm } = this.props;
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.chargeType)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>  
          }
        </View>
        <Picker
          selectedValue={this.state.chargeType}
          onValueChange={(itemValue) => this.setState({chargeType: itemValue})}>
          <Picker.Item label={locale.advancedSearch.text.perLesson} value='perLesson' />
          <Picker.Item label={locale.advancedSearch.text.perSemester} value='perSemester' />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
    width: '20%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 5,
  },
  chargeTypeButton: {
    borderBottomWidth: 1,
    borderColor: '#ABB1BA',
    width: 99,
    paddingHorizontal: 5,
  },
  chargeTypeChevron: {
    position: 'absolute',
    right: -15,
    borderBottomWidth: 1,
    borderColor: '#ABB1BA',
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
