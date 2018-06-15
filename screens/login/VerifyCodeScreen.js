import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Colors from '../../constants/Colors';
import { ConfirmationCodeInput, Spinner, Toast } from '../../components';
import { connect } from 'react-redux';
import { signUp, verifyCode, verifyCodeCancel, resendCode, } from '../../redux/actions'
import { MaterialCommunityIcons } from '@expo/vector-icons';

class VerifyCodeScreen extends Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.verifyCode.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    
    let { params = {} } = this.props.navigation.state;
    this.state = {
      code: '',
      username: params.username,
      delay: 0,
      password: params.password,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVerified && !this.props.isVerified) {
      // console.warn('verify success!')
      this.props.navigation.goBack(null);
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  handleResendPress = () => {
    this.props.resendCode(this.state.username)
    
    // reset state
    this.setState({delay: 60})
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.state.delay > 0) {
          this.setState({delay: this.state.delay - 1});
        }
      }, 1000);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{this.props.verfiedErrorMsg || this.props.locale.verifyCode.label}</Text>
            <ConfirmationCodeInput
              ref="codeInputRef"
              keyboardType="numeric"
              codeLength={6}
              className={'border-circle'}
              autoFocus={true}
              cellBorderWidth={2}
              size={45}
              codeInputStyle={{ fontWeight: '800', fontSize: 18 }}
              activeColor={'rgba(94, 204, 63, 1)'}
              inactiveColor={'rgba(94, 204, 63, 0.2)'}
              onFulfill={(code) => this.props.verifyCode(this.state.username, this.state.password, code)}
            />
          </View>
          
          <TouchableOpacity
            onPress={() => this.props.verifyCode(this.state.username, this.state.password, code)}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>
              {this.props.locale.common.submit}
            </Text>
          </TouchableOpacity>
        </View> 
        <KeyboardAvoidingView style={styles.avoidView} behavior="position" >
          <ResendButton
            handleResendPress={() => this.handleResendPress()}
            delay={this.state.delay}
            style={styles.resendButton}
            locale={this.props.locale}
            isEnabled={this.state.delay === 0}
          />
        </KeyboardAvoidingView>

        { this.props.isLoading && <Spinner /> }
      </View>
    );
  }
}

const ResendButton = props => {
  let { isEnabled, delay, handleResendPress, locale } = props;

  return (
    isEnabled ?
      <TouchableOpacity
        onPress={() => handleResendPress()}
        style={styles.resendButton}
      >
        <Text style={styles.resendText}>
          {locale.verifyCode.resend}
        </Text>
      </TouchableOpacity>
    :
      <View style={styles.resendButtonDisable}>
        <Text style={styles.resendTextDisable}>
          {
            eval('`'+ locale.verifyCode.delayResend +'`')
          }
        </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    marginTop: 30,
  },
  submitText: {
    paddingVertical: 10,
    // paddingHorizontal: 30,
    color: '#fff',
  },
  avoidView: {
    // position: 'absolute',
    // bottom: 360,
    // width: '100%',
    // flex: 1,
  },
  resendButton: {
    backgroundColor: '#FEF6F9',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    marginBottom: 100,
  },
  resendButtonDisable: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    marginBottom: 100,
  },
  resendText: {
    color: '#F078A3',
    fontWeight: '600',
    fontSize: 16,
  },
  resendTextDisable: {
    color: '#999',
    fontWeight: '600',
    fontSize: 16,
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
  resendCode,
})(VerifyCodeScreen)
