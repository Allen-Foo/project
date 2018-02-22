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
import { Dropdown } from 'react-native-material-dropdown';

const CHARGE_TYPES = ['perHour', 'perLesson']

class TutionFee extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.tutionFee.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      tutionFee: null,
      chargeType: 'perHour',
    }
  }

  render() {
    let { params = {} } = this.props.navigation.state;
    params.fee = this.state.tutionFee
    params.chargeType = this.state.chargeType
    let { locale, navigation } = this.props;
    let { tutionFee, chargeType } = this.state;

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
                onChangeText={(type, index) => this.setState({chargeType: CHARGE_TYPES[0]})}
                value={locale.tutionFee.text[chargeType]}
              />
            </View>
            <Text style={{color: '#FF5A5F'}}>＄</Text>
            <TextInput
              autoFocus
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(tutionFee) => this.setState({tutionFee})}
              value={this.state.tutionFee}
            />
          </View>
          {
            this.state.tutionFee && this.state.chargeType &&
            <NextButton 
              onPress={() => navigation.navigate('UploadPhoto', params)}
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
    //justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownStyle: {
    width: '50%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 20,
    marginBottom: 20,
  },
  dropDownList: {
    marginLeft: 15,
    // width: '35%',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50
  },
  textInput: {
    // height: 40, 
    //borderBottomWidth: 1, 
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

export default connect(mapStateToProps)(TutionFee)
