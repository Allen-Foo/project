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
import { Hr, HideoTextInput } from '../../components';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import Prompt from 'react-native-prompt';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';
import { NavigationActions } from 'react-navigation';

import { Spinner, Toast } from '../../components';
import { signUp, signInFacebook, signInGoogle, setTutorProfile, validateNewUserInfo } from '../../redux/actions'


class SignUpScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.signUp.title[state.params.userRole],
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@genkontech.com',
      password: 'asd123',
      username: '',
      callingCode: '+852',
      phoneNumber: '84657862',
      cca2: 'HK',
      skill: '',
      userRole: props.navigation.state.params.userRole,
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

    if (nextProps.showMFAPrompt && !this.props.showMFAPrompt) {
      // console.warn('verify success!')
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Signin' }),
          NavigationActions.navigate({ routeName: 'VerifyCode', params: {username: this.state.username, password: this.state.password}})
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }

    if (nextProps.hasValidateNewUserInfo && !this.props.hasValidateNewUserInfo) {
      let { ...profile } = this.state;

      this.props.setTutorProfile(profile);
      // Next step
      this.props.navigation.navigate('SignUpTutorSelfIntroScreen');
    }
  }

  handleSignUp() {
    let { cca2, phoneNumber, callingCode, ...profile } = this.state;
    profile.phone = callingCode + phoneNumber;

    this.props.signUp(profile, "", "", "", "")
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
      if (this.props.navigation.state.params.userRole == 'tutor') {
      
        this.props.validateNewUserInfo (this.state.email, this.state.username);
        
      }
      else {
        // submit to server
        this.handleSignUp();
      }
    }
  }

  render() {
    let userRole = this.props.navigation.state.params.userRole;

    let { locale, fetchErrorMsg } = this.props

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    return (
      <View style={styles.container}>
        <TextInput 
          autoCapitalize={'none'}
          style={styles.textInput}
          placeholder={locale.signUp.textInput.username.placeholder}
          onChangeText={username => {
            // console.warn('text', text);
            this.setState({username})
          }}
          value={this.state.username}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.signUp.textInput.email.placeholder}
          onChangeText={email => {
            // console.warn('text', text);
            this.setState({email})
          }}
          value={this.state.email}
        />
        <TextInput 
          secureTextEntry={true}
          style={styles.textInput}
          placeholder={locale.signUp.textInput.password.placeholder}
          onChangeText={password => {
            // console.warn('text', text);
            this.setState({password})
          }}
          value={this.state.password}
        />
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
          <TextInput 
            style={styles.phoneNumber}
            placeholder={locale.signUp.textInput.phoneNumber.placeholder}
            onChangeText={phoneNumber => {
              // console.warn('text', text);
              this.setState({phoneNumber})
            }}
            value={this.state.phoneNumber}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableOpacity 
          style={[styles.button, {marginTop: 20} ]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {userRole == 'tutor' ? locale.signin.text.next.label : locale.signin.text.signUp.label} </Text>
        </TouchableOpacity>

        <Text style={styles.agreement}>
          {locale.signUp.text.agreement.label}
        </Text>

        { 
          userRole == 'learner' &&
          <View style={styles.socialLogins}>
            <SocialButton
              name={'facebook'}
              text={'Sign in with Facebook'}
              color={'#516BA2'}
              style={{marginBottom: 10}}
              onPress={() => this.props.signInFacebook()}
            />
            <SocialButton
              name={'google-plus'}
              text={'Sign in with Google'}
              color={'#CF563C'}
              onPress={() => this.props.signInGoogle()}
            />
          </View>
        }

        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    );
  }
}

const SocialButton = props => {
  const { name, text, color, style, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.SocialButtonStyle, {backgroundColor: color}, {...style}]}
    >
      <FontAwesome
        name={name}
        size={20}
        color='#fff'
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>

  )
}

const countryPickerStyle = {
  itemCountryFlag: {
    justifyContent: 'center',
    alignItems: 'center',
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
  countryPickerContainer: {
    borderBottomWidth: 1,
    borderColor: 'grey', 
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'
  },
  agreement: {
    fontSize: 14,
    marginTop: 20,
    width: '80%',
  },
  textInput: {
    paddingVertical: 15, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 20,
  },
  phoneNumber: {
    fontSize: 14,
    paddingVertical: 6,
    backgroundColor: '#fff',
    paddingLeft: 20,
    width: '70%'
  },
  button: {
    height: 40, 
    width: '80%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  socialLogins: {
    position: 'absolute',
    left: '12%',
    right: '12%',
    bottom: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
  SocialButtonStyle: {
    height: 40, 
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    flexDirection: 'row'
  },
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
    hasValidateNewUserInfo: state.socialLogin.hasValidateNewUserInfo,
  }
}

export default connect(mapStateToProps, {
  signUp,
  signInFacebook,
  signInGoogle,
  setTutorProfile,
  validateNewUserInfo,
})(SignUpScreen)

