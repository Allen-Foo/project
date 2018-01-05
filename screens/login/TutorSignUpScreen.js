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

import WithAuth from '../../lib/Auth/Components/WithAuth';
import MFAPrompt from '../../lib/Auth/Components/MFAPrompt';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import Prompt from 'react-native-prompt';

import { Spinner, Toast } from '../../components';

import { onVerifyCode } from '../../lib/Auth/AWS_Auth';
import { signUp, signUpFail, verifyCode, verifyCodeSuccess, verifyCodeFail, verifyCodeCancel} from '../../redux/actions'


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
      email: 'allen@letsmail9.com',
      password: '',
      username: '',
      callingCode:'+852',
      phoneNumber:'',
      cca2: 'HK',
    }

    this.handleSignUp = this.handleSignUp.bind(this);

    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
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
    const { username, password, email, phoneNumber, callingCode } = this.state;
    const phone = '+' + callingCode + phoneNumber;

    this.props.signUp({username, password, email, phone})
  }

  handleMFACancel() {
    this.props.verifyCodeCancel()
  }

  handleMFASuccess(session) {
    this.setState({ showMFAPrompt: false }, () => {
      this.props.navigation.navigate('SignIn')
    });
  }

  validateInput() {
    if (!this.state.username) {
      Alert.alert('Username cannot be empty!')
    } else if (!this.state.email) {
      Alert.alert('Email cannot be empty!')
    } else if (!this.state.password) {
      Alert.alert('Password cannot be empty!')
    }else if (!this.state.phoneNumber) {
      Alert.alert('Phone Number cannot be empty!')
    } else {
      // TODO
      // submit to server
      // this.props.navigation.navigate('Main')
      this.handleSignUp();
    }
  }

  handleMFAValidate(code = '') {
    const { username } = this.state;

    const { verifyCode, verifyCodeSuccess, verifyCodeFail } = this.props;

    onVerifyCode(username, code, verifyCode, verifyCodeSuccess, verifyCodeFail)
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
            onCancel={this.handleMFACancel}
            onSubmit={(code) => this.handleMFAValidate(code)}
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
          style={[styles.textInput, {height:100}]}
          multiline= {true}
          numberOfLines={5}
          placeholder={locale.commonSignUp.textInput.skill.placeholder}
        />
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'black'}}> {locale.commonSignUp.text.upload.label} </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {marginTop:20} ]}
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
    //justifyContent: 'center',
    alignItems: 'center',
    paddingTop:40,
  },
  uploadButton: {
    borderWidth:1,
    width:'100%',
    height:40,
    backgroundColor:'#FFF',
    borderColor:'grey',
    alignItems:'center',
    justifyContent:'center'
  },
  contact:{
    flexDirection:'row',
    // backgroundColor: 'red'
  },
  countryPickerContainer: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'grey', 
  },
  agreement:{
    fontSize:14,
    marginTop:20,
    width:'80%',
  },
  textInput: {
    height: 40, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    fontSize: 14,
    backgroundColor:'#FFF',
    paddingLeft:20,
  },
  text:{
    alignSelf: 'flex-start', 
    height: 22, 
    width: '80%',
    marginTop: 10, 
    marginLeft: '10%',
  },
  boldText:{
    fontWeight:'bold',
  },
  SocialButtonStyle:{
    height: 40, 
    width: '80%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    position:'absolute',
    left: '10%',
    right:0,
    bottom: 40,
    flexDirection:'row',
  },
  button:{
    height: 40, 
    width: '60%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    //marginTop: 20
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
  verifyCodeSuccess,
  verifyCodeFail,
  verifyCodeCancel,
})(WithAuth(TutorSignUpScreen))

