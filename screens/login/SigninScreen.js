import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { signInEmail, signInFacebook, verifyCode, verifyCodeCancel } from '../../redux/actions'
import { Spinner, Toast } from '../../components';

import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Prompt from 'react-native-prompt';

import { onSignIn } from '../../lib/Auth/AWS_Auth';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';


class SigninScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerLeft = (
      <TouchableOpacity onPress={() => navigation.goBack(null) }>
        <MaterialIcons
          name={"close"}
          size={25}
          style={{ paddingLeft: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      headerTintColor: 'black',
      headerLeft: headerLeft,
      headerStyle: {
        // backgroundColor: '#fff'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false,
    }
  }

  _handleSubmit = (email, password) => {
    Keyboard.dismiss()
    this.setState({isLoading: true}, () => {
      this.timer = setTimeout(() => {
        this.props.signInEmail(email, password)
      }, 0);
    })
  }

  validateInput() {
    const { email, password } = this.state;
    if (!email) {
      Alert.alert('email is empty!')
    } else if (!password) {
      Alert.alert('password is empty!')
    } else {
      // submit to server
      this._handleSubmit(email, password);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    // if login success, go to main page
    if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
      this.props.navigation.goBack(null)
    }

    if (!nextProps.isLoading && this.props.isLoading) {
      this.setState({isLoading: false})
    }

    // if login fail, show message 
    if (nextProps.fetchErrorLastUpdate instanceof Date) {
      if (!(this.props.fetchErrorLastUpdate instanceof Date) ||
        nextProps.fetchErrorLastUpdate.getTime() !== this.props.fetchErrorLastUpdate.getTime()
      ) {
        console.log("this.Toast.show");
        this.Toast.show();

        // If error == not confirmed
        if (nextProps.showMFAPrompt && !this.props.showMFAPrompt) {
          this.props.navigation.navigate('VerifyCode', {username: this.state.email, password: this.state.password});
        }
      }
    }
  }

  render() {
    let { locale, signInFacebook, fetchErrorMsg } = this.props
    const { email, password } = this.state;

    var errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    let isLoading = this.state.isLoading || this.props.isLoading

    return (
      <View style={styles.container}>

        <Text style= {{marginTop: 20, fontSize: 20}}>{locale.signin.text.signIn.label}</Text>

        <SocialButton
          name={'facebook'}
          text={'Sign in with Facebook'}
          color={'#516BA2'}
          onPress={() => {signInFacebook()}}
        />
        <View style={{width: '80%', paddingVertical: 15}}>
          <Hr text="Or" marginLeft={0} marginRight={0}/>
        </View>
        
        <TextInput
          style={styles.textInput}
          placeholder={locale.signin.textInput.email.placeholder}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          returnKeyType={"next"}
          autoCapitalize = 'none'
        />

        <TextInput
          style={styles.textInput}
          placeholder={locale.signin.textInput.password.placeholder}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
          returnKeyType={"done"}
          onSubmitEditing={(email, password) => this.validateInput(this.state.email, this.state.password)}
        />

        <TouchableOpacity 
          style={[styles.button, {marginTop: 20}]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {locale.signin.text.signIn.label} </Text>
        </TouchableOpacity>

        <Text>{locale.forgotPassword.text.forgotPassword.label}</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#ececec'}]} onPress={() => this.props.navigation.navigate('PreSignUp')}>
          <Text style={{color: '#a4a5a7'}}>
            {locale.profile.text.signUp} 
          </Text>
        </TouchableOpacity>
        { isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    );
  }
}

const SocialButton = props => {
  const { name, text, color, onPress } = props;
  return (
    <TouchableOpacity 
      style={[styles.button, {backgroundColor: color, marginBottom: 10, marginTop: 10, flexDirection: 'row'}]}
      onPress={onPress}
    >
      <FontAwesome
        name={name}
        size={20}
        color='#fff'
      />
      <Text style={[styles.boldText, {color: 'white', paddingLeft: 5}]}>{text}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold'
  },
  button: {
    height: 40, 
    width: '80%',
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  textInput: {
    height: 50,
    width: '80%',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#c1cfd4',
    marginTop: 20,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    isLoggedIn: state.socialLogin.isLoggedIn,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
    verfiedErrorMsg: state.socialLogin.verfiedErrorMsg,
    showMFAPrompt: state.socialLogin.showMFAPrompt,
  }
}

export default connect(mapStateToProps, {
  signInEmail,
  signInFacebook,
  verifyCode,
  verifyCodeCancel,
})(SigninScreen);

