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

import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class LearnerSignUpScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome Back',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName:'',
      lastName:'',
      countryCode:'',
      phoneNumber:'',
    }
  }

  validateInput() {
    if (!this.state.email) {
      Alert.alert('email is empty!')
    } else if (!this.state.password) {
      Alert.alert('password is empty!')
    } else if (!this.state.firstName) {
      Alert.alert('firstName is empty!')
    } else if (!this.state.lastName) {
      Alert.alert('lastName is empty!')
    } else if (!this.state.countryCode) {
      Alert.alert('countryCode is empty!')
    } else if (!this.state.phoneNumber) {
      Alert.alert('phoneNumber is empty!')
    } else {
      // TODO
      // submit to server
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.lastName.placeholder}
          onChangeText={lastName => {
            // console.warn('text', text);
            this.setState({lastName})
          }}
          value={this.state.lastName}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.firstName.placeholder}
          onChangeText={firstName => {
            // console.warn('text', text);
            this.setState({firstName})
          }}
          value={this.state.firstName}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.email.placeholder}
          onChangeText={email => {
            // console.warn('text', text);
            this.setState({email})
          }}
          value={this.state.email}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.password.placeholder}
          onChangeText={password => {
            // console.warn('text', text);
            this.setState({password})
          }}
          value={this.state.password}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.countryCode.placeholder}
          onChangeText={countryCode => {
            // console.warn('text', text);
            this.setState({countryCode})
          }}
          value={this.state.countryCode}
        />
        <TextInput 
          style={styles.textInput}
          placeholder={locale.learnerSignUp.textInput.phoneNumber.placeholder}
          onChangeText={phoneNumber => {
            // console.warn('text', text);
            this.setState({phoneNumber})
          }}
          value={this.state.phoneNumber}
        />
        <TouchableOpacity 
          style={[styles.button, {marginTop:20} ]}
          onPress={() => this.validateInput()}
        >
          <Text style={{color: 'white'}}> {locale.signin.text.signIn.label} </Text>
        </TouchableOpacity>
        
        <SocialButton
          name={'facebook'}
          text={'Sign in with Facebook'}
          color={'#516BA2'}
          style={{bottom: 70}}
        />
        <SocialButton
          name={'google-plus'}
          text={'Sign in with Google'}
          color={'#CF563C'}
        />
      </View>
    );
  }
}

const SocialButton = props => {
  const { name, text, color, style} = props;
  return (
    <TouchableOpacity 
      style={[styles.SocialButtonStyle,{backgroundColor:color}, {...style}]}
    >
      <FontAwesome
      name={name}
      size={20}
      color='#fff'
      />
      <Text style={[styles.boldText,{width:'80%', color: 'white', paddingLeft: 5}]}>{text}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  },

  textInput: {
    height: 40, 
    borderColor: 'grey', 
    borderWidth: 1, 
    width: '100%',
    fontSize: 14,
    backgroundColor:'#FFF'
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
    bottom: 20,
    flexDirection:'row'
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
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(LearnerSignUpScreen)

