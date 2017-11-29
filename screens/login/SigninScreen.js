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

import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Hr, HideoTextInput} from '../../components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SigninScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome Back',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  validateInput() {
    if (!this.state.email) {
      Alert.alert('email is empty!')
    } else if (!this.state.password) {
      Alert.alert('password is empty!')
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
        
        <Text style= {{marginTop:20, fontSize:20}}>{locale.signin.text.signIn.label}</Text>

        <SocialButton
          name={'facebook'}
          text={'Sign in with Facebook'}
          color={'#516BA2'}
        />
        <SocialButton
          name={'google-plus'}
          text={'Sign in with Google'}
          color={'#CF563C'}
        />
        <View style={{width: '80%'}}>
          <Hr text="Or" marginLeft={0} marginRight={0}/>
        </View>
        
        <HideoTextInput
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
      </View>
    );
  }
}

const SocialButton = props => {
  const { name, text, color} = props;
  return (
    <TouchableOpacity 
      style={[styles.button,{backgroundColor:color, marginBottom:10, marginTop:10, flexDirection:'row'}]}
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
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(SigninScreen)

