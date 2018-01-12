import React from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import Prompt from 'react-native-prompt';

import { Spinner, Toast } from '../../components';
import { signUp, verifyCode, verifyCodeCancel} from '../../redux/actions'


class TutorSignUpScreen extends React.Component {

  static navigationOptions = {
    title: 'Register as tutor',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      callingCode: '+852',
      phoneNumber: '',
      cca2: 'HK',
      skill: '',
      isTutor: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    // if sign up fail, show message 
    if (nextProps.fetchErrorLastUpdate instanceof Date) {
      if (!(this.props.fetchErrorLastUpdate instanceof Date) ||
        nextProps.fetchErrorLastUpdate.getTime() !== this.props.fetchErrorLastUpdate.getTime()
      ) {
        this.Toast.show();
      }
    }

    if (nextProps.isVerified && !this.props.isVerified) {
      // console.warn('verify success!')
      this.props.navigation.navigate('Signin');
    }
  }

  handleSignUp() {
    let { cca2, phoneNumber, callingCode, ...profile } = this.state;
    profile.phone = callingCode + phoneNumber;

    this.props.signUp(profile)
  }

  validateInput() {
    if (!this.state.username) {
      Alert.alert('Username cannot be empty!')
    } else if (!this.state.email) {
      Alert.alert('Email cannot be empty!')
    } else if (!this.state.password) {
      Alert.alert('Password cannot be empty!')
    } else if (!this.state.phoneNumber) {
      Alert.alert('Phone Number cannot be empty!')
    } else {
      // submit to server
      this.handleSignUp();
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        {
          <Prompt
            title={this.props.verfiedErrorMsg || this.props.locale.commonSignUp.text.verifyCode.label}
            placeholder={this.props.locale.commonSignUp.text.verifyCodePlaceholder.label}
            submitText={this.props.locale.common.ok}
            cancelText={this.props.locale.common.cancel}
            textInputProps={{keyboardType: 'numeric'}}
            visible={this.props.showMFAPrompt}
            onCancel={() => this.props.verifyCodeCancel()}
            onSubmit={(code) => this.props.verifyCode(this.state.username, code)}
          />
        }
        <TextInput 
          autoCapitalize={'none'}
          style={styles.textInput}
          placeholder={locale.commonSignUp.textInput.username.placeholder}
          onChangeText={username => {
            // console.warn('text', text);
            this.setState({username})
          }}
          value={this.state.username}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.commonSignUp.textInput.email.placeholder}
          onChangeText={email => {
            // console.warn('text', text);
            this.setState({email})
          }}
          value={this.state.email}
        />
        <TextInput 
          secureTextEntry={true}
          style={styles.textInput}
          placeholder={locale.commonSignUp.textInput.password.placeholder}
          onChangeText={password => {
            // console.warn('text', text);
            this.setState({password})
          }}
          value={this.state.password}
        />
        <View style={styles.contact}>
          <View style={styles.countryPickerContainer}>
            <CountryPicker
              styles={countryPickerStyle}
              onChange={(value)=> {
                // console.warn('cca2', value)
                this.setState({cca2: value.cca2, callingCode: value.callingCode});
              }}
              cca2={this.state.cca2}
              translation='eng'
            />
          </View>
          <TextInput 
            style={[styles.textInput, {width: '85%', marginLeft: 0}]}
            placeholder={locale.commonSignUp.textInput.phoneNumber.placeholder}
            onChangeText={phoneNumber => {
              // console.warn('text', text);
              this.setState({phoneNumber})
            }}
            value={this.state.phoneNumber}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TextInput
          style={[styles.textInput, {height: 100}]}
          multiline= {true}
          numberOfLines={5}
          placeholder={locale.commonSignUp.textInput.skill.placeholder}
          onChangeText={skill => {
            // console.warn('text', text);
            this.setState({skill})
          }}
          value={this.state.skill}
        />
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => {}}
        >
          <Text style={{color: 'black'}}> {locale.commonSignUp.text.upload.label} </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {marginTop: 20} ]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {locale.signin.text.signUp.label} </Text>
        </TouchableOpacity>

        <Text style={styles.agreement}>
          {locale.commonSignUp.text.agreement.label}
        </Text>

        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </View>
    );
  }
}

const countryPickerStyle = {
  itemCountryFlag: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#fff',
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 40,
  },
  uploadButton: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contact: {
    flexDirection: 'row',
  },
  countryPickerContainer: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'grey', 
  },
  agreement: {
    fontSize: 14,
    marginTop: 20,
    width: '80%',
  },
  textInput: {
    height: 40, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 20,
  },
  button: {
    height: 40, 
    width: '60%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    showMFAPrompt: state.socialLogin.showMFAPrompt,
    isVerified: state.socialLogin.isVerified,
    verfiedErrorMsg: state.socialLogin.verfiedErrorMsg,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  signUp,
  verifyCode,
  verifyCodeCancel,
})(TutorSignUpScreen)

