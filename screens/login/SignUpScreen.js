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
import { signUp, verifyCode, verifyCodeCancel, signInFacebook, signInGoogle } from '../../redux/actions'


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
      email: '',
      password: '',
      username: '',
      callingCode: '+852',
      phoneNumber: '',
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
      if (this.props.navigation.state.params.userRole == 'tutor') {
        // Next step
        this.props.navigation.navigate('SignUpTutorOfferClassScreen')
      }
      else {
        // submit to server
        this.handleSignUp();
      }
    }
  }

  render() {
    let userRole = this.props.navigation.state.params.userRole;
    console.warn('userRole', userRole)
    let { locale } = this.props
    return (
      <View style={styles.container}>
        {
          <Prompt
            title={this.props.verfiedErrorMsg || this.props.locale.signUp.text.verifyCode.label}
            placeholder={this.props.locale.signUp.text.verifyCodePlaceholder.label}
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
        { 
           // userRole == 'tutor' &&
          // <TextInput
          //   style={[styles.textInput, {height: 100}]}
          //   multiline= {true}
          //   numberOfLines={5}
          //   placeholder={locale.signUp.textInput.skill.placeholder}
          //   onChangeText={skill => {
          //     // console.warn('text', text);
          //     this.setState({skill})
          //   }}
          //   value={this.state.skill}
          // />
        }
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
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
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
    width: '100%'
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
  }
}

export default connect(mapStateToProps, {
  signUp,
  verifyCode,
  verifyCodeCancel,
  signInFacebook,
  signInGoogle,
})(SignUpScreen)

