/**
 * Created by dungtran on 8/20/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import { ConfirmationCodeInput } from '../../components';
import { connect } from 'react-redux';
import { signUp, verifyCode, verifyCodeCancel } from '../../redux/actions'
import { MaterialCommunityIcons } from '@expo/vector-icons';

class VerifyCodeScreen extends Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    
    this.state = {
      code: ''
    };
  }
  
  _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      this.setState({ code });
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );

      this.refs.codeInputRef2.clear();
    }
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{this.props.verfiedErrorMsg || this.props.locale.signUp.text.verifyCode.label}</Text>
            <ConfirmationCodeInput
              ref="codeInputRef2"
              keyboardType="numeric"
              codeLength={6}
              className={'border-circle'}
              autoFocus={false}
              cellBorderWidth={2}
              size={45}
              codeInputStyle={{ fontWeight: '800' }}
              activeColor={'rgba(94, 204, 63, 1)'}
              inactiveColor={'rgba(94, 204, 63, 0.2)'}
              onFulfill={(code) => this.props.verifyCode(this.state.username, code)}
            />
          </View>
          
          <TouchableOpacity
            onPress={() => this.props.verifyCode(this.state.username, code)}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>
              {this.props.locale.common.submit}
            </Text>
          </TouchableOpacity>
        </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'red',
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 30
  },
  wrapper: {
    marginTop: 30
  },
  inputWrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 20,
  },
  submitButton: {
    backgroundColor: Colors.tintColor,
    borderRadius: 7,
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    paddingVertical: 10,
    // paddingHorizontal: 30,
    color: '#fff',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    
    isVerified: state.socialLogin.isVerified,
    verfiedErrorMsg: state.socialLogin.verfiedErrorMsg,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  verifyCode,
  verifyCodeCancel,
})(VerifyCodeScreen)