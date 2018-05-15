import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { connect } from 'react-redux';


class ForgotPasswordScreen extends React.Component {

  static navigationOptions = {
    title: 'Forgot Password',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  validateInput() {
    if (!this.state.email) {
      Alert.alert('Email is empty!')
    }  else {
      // TODO
      // submit to server
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
      	<Text style={styles.forgotPassword}>
      		{locale.forgotPassword.text.forgotPassword}
      	</Text>
      	<Text style={styles.forgotPasswordEmail}>
      		{locale.forgotPassword.text.forgotPasswordEmail}
      	</Text>
        <TextInput 
          style={styles.textInput}
          placeholder={locale.forgotPassword.textInput.email.placeholder}
          onChangeText={email => {
            // console.warn('text', text);
            this.setState({email})
          }}
          value={this.state.email}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#FFF'}}> {locale.forgotPassword.text.confirm.label} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  forgotPasswordEmail: {
    fontSize: 20,
    marginTop: 20,
  },
  textInput: {
    height: 40, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 26,
    marginTop: 60,
  },
  button: {
    height: 40, 
    width: '60%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  },
});

export default connect(mapStateToPorps)(ForgotPasswordScreen)
