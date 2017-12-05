import React from 'react';
import { 
  Dimensions,
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Alert,
  TouchableOpacity
} from 'react-native';

import { WithAuth } from '../../lib/Auth/Components';
import { connect } from 'react-redux';
import { signInEmail, signInEmailSuccess, signInEmailFail } from '../../redux/actions'
import { Spinner, Toast } from '../../components';
import { signInFacebook, signInGoogle } from '../../redux/actions';

import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { onSignIn } from '../../lib/Auth/AWS_Auth';


class SigninScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome Back',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false,
    }

    this.resolver = Promise.resolve();

    this.handleSignIn = this.handleSignIn.bind(this);
    this.doSignIn = this.doSignIn.bind(this);

    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
  }

  validateInput() {
    if (!this.state.email) {
      Alert.alert('email is empty!')
    } else if (!this.state.password) {
      Alert.alert('password is empty!')
    } else {
      // TODO
      // submit to server
      // this.handleSignIn()
      onSignIn(this.state.email, this.state.password, this.props.signInEmailSuccess, this.props.signInEmailFail)
    }
  }

  componentWillReceiveProps(nextProps) {
    // TO DO ALLEN
    // use REDUX or HOC to control the login status
    if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
      this.props.navigation.goBack()
    }
  }

   /**
   * Signs in a user with a email.password combination. If needed, takes care of MFA.
   *
   * @param {string} email 
   * @param {string} password 
   */
  doSignIn(email, password) {
    const { auth } = this.props.screenProps;
    console.warn('SigninScreen', this.props.isLoggedIn);
    let showMFAPrompt = false;

    return new Promise(async (outResolve, reject) => {
      this.resolver = outResolve;

      const session = await new Promise((resolve) => {
        auth.handleSignIn(email, password, auth.loginCallbackFactory({
          onSuccess(session) {
            console.log('loginCallbacks.onSuccess', session);
            this.setState({isLoading: false})
            resolve(session);
          },
          onFailure(err) {
            this.setState({isLoading: false})
            console.log('loginCallbacks.onFailure', err);
            reject(new Error(err.invalidCredentialsMessage || err.message || err));
          },
          newPasswordRequired(data) {
            this.setState({isLoading: false})
            reject(new Error('newPasswordRequired'));
          },
          mfaRequired(challengeName, challengeParameters) {
            this.setState({isLoading: false})
            showMFAPrompt = true;
            resolve();
          },
        }, this));
      });

      this.setState({ showMFAPrompt }, () => {
        if (session) {
          this.resolver(session);
        }
      });
    });
  }

  async handleSignIn() {
    console.warn('clicked')

    this.setState({isLoading: true})

    const { email, password } = this.state;

    try {
      const session = await this.doSignIn(email, password);
      console.warn('handleSignIn session', session)
      this.props.screenProps.onSignIn(session);

      if (session) {
        this.props.signInEmail()
        //this.props.navigation.navigate('Main')
      }
      console.warn('CLIENT', 'Signed In: ' + (session));
      console.log('CLIENT', 'Signed In: ' + (session));
    } catch (err) {
      console.warn('CLIENT', err.message);
      console.log('CLIENT', err.message);
      this.setState({ errorMessage: err.message}, () => this.Toast.show());
    }
  }

  handleMFAValidate(code = '') {
    const { auth } = this.props;

    return new Promise((resolve, reject) => auth.sendMFAVerificationCode(code, { onFailure: reject, onSuccess: resolve }, this));
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false });

    this.resolver(null);
  }

  handleMFASuccess(session) {
    this.resolver(session);

    this.setState({ showMFAPrompt: false });
  }

  render() {
    let { locale, signInFacebook, signInGoogle } = this.props
    return (
      <View style={styles.container}>
        
        <Text style= {{marginTop:20, fontSize:20}}>{locale.signin.text.signIn.label}</Text>

        <SocialButton
          name={'facebook'}
          text={'Sign in with Facebook'}
          color={'#516BA2'}
          onPress={() => {signInFacebook()}}
        />
        <SocialButton
          name={'google-plus'}
          text={'Sign in with Google'}
          color={'#CF563C'}
          onPress={() => {signInGoogle()}}
        />
        <View style={{width: '80%'}}>
          <Hr text="Or" marginLeft={0} marginRight={0}/>
        </View>
        
        <HideoTextInput
          autoCapitalize={'none'}
          iconClass={MaterialIcons}
          iconName={'email'}
          iconColor={'white'}
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#EAB083'}
          style={{width: "80%", marginTop: 20, borderWidth:1, borderColor:'#EAB083'}}
          inputStyle={{ color: '#464949' ,fontSize: 16}}
          onChangeText={email => {
            // console.warn('text', text);
            this.setState({email})
          }}
          value={this.state.email}
        />

        <HideoTextInput
          autoCapitalize={'none'}
          secureTextEntry={true}
          iconClass={MaterialIcons}
          iconName={'vpn-key'}
          iconColor={'white'}
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#EAB083'}
          style={{width: "80%", marginTop:10, borderWidth:1, borderColor:'#EAB083'}}
          inputStyle={{ color: '#464949' ,fontSize: 16}}
          onChangeText={password => {
            // console.warn('text', text);
            this.setState({password})
          }}
          value={this.state.password}
        />
        
        
        <TouchableOpacity 
          style={[styles.button, {marginTop:20} ]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {locale.signin.text.signIn.label} </Text>
        </TouchableOpacity>

        <Text>{locale.forgotpassword.text.forgotPassword.label}</Text>
        <Text>{locale.signin.text.signUp.label}</Text>

        { this.state.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.state.errorMessage} />
      </View>
    );
  }
}

const SocialButton = props => {
  const { name, text, color, onPress } = props;
  return (
    <TouchableOpacity 
      style={[styles.button,{backgroundColor:color, marginBottom:10, marginTop:10, flexDirection:'row'}]}
      onPress={onPress}
    >
      <FontAwesome
      name={name}
      size={20}
      color='#fff'
      />
      <Text style={[styles.boldText,{color: 'white', paddingLeft: 5}]}>{text}</Text>
    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    height: 20, 
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    width: '80%',
    fontSize: 14
  },
  text:{
    alignSelf: 'flex-start', 
    height: 22, 
    width: '80%',
    marginTop: 10, 
    marginLeft: '10%',
  },
  boldText:{
    fontWeight:'bold'
  },
  button:{
    height: 40, 
    width: '80%',
    backgroundColor: '#41B252', 
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
    isLoggedIn: state.socialLogin.isLoggedIn,
  }
}

export default connect(mapStateToProps, {
  signInEmail,
  signInEmailSuccess,
  signInEmailFail,
  signInFacebook,
  signInGoogle
})(SigninScreen);

