import React from 'react';
import { 
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
import { signInEmail, signInFacebook, signInGoogle } from '../../redux/actions'
import { Spinner, Toast } from '../../components';

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
    }
  }

  validateInput() {
    const { email, password } = this.state;
    if (!email) {
      Alert.alert('email is empty!')
    } else if (!password) {
      Alert.alert('password is empty!')
    } else {
      // submit to server
      this.props.signInEmail(email, password);
    }
  }

  componentWillReceiveProps(nextProps) {
    // if login success, go to main page
    if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
      this.props.navigation.goBack()
    }

    // if login fail, show message 
    if (nextProps.fetchErrorLastUpdate instanceof Date) {
      if (!(this.props.fetchErrorLastUpdate instanceof Date) ||
        nextProps.fetchErrorLastUpdate.getTime() !== this.props.fetchErrorLastUpdate.getTime()
      ) {
        this.Toast.show();
      }
    }
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
          onChangeText={email => { this.setState({email}) }}
          value={this.state.email}
        />

        <HideoTextInput
          autoCapitalize={'none'}
          secureTextEntry={true}
          iconClass={MaterialIcons}
          iconName={'vpn-key'}
          iconColor={'white'}
          iconBackgroundColor={'#EAB083'}
          style={{width: "80%", marginTop:10, borderWidth:1, borderColor:'#EAB083'}}
          inputStyle={{ color: '#464949' ,fontSize: 16}}
          onChangeText={password => { this.setState({password}) }}
          value={this.state.password}
        />
        
        
        <TouchableOpacity 
          style={[styles.button, {marginTop:20} ]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {locale.signin.text.signIn.label} </Text>
        </TouchableOpacity>

        <Text>{locale.forgotPassword.text.forgotPassword.label}</Text>
        <Text onPress={() => this.props.navigation.navigate('PreSignUp')}>
          {this.props.locale.profile.text.signUp} 
        </Text>

        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
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
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    isLoggedIn: state.socialLogin.isLoggedIn,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  signInEmail,
  signInFacebook,
  signInGoogle
})(SigninScreen);

