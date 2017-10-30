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

const { height, width } = Dimensions.get('window')


class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome Back',
  };

  constructor(props) {
    super(props);
    this.state={
      username: '',
      password: ''
    }
  }

  validateInput() {
    if (!this.state.username) {
      Alert.alert('username is empty!')
    } else if (!this.state.password) {
      Alert.alert('password is empty!')
    } else {
      // TODO
      // submit to server
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.logo}>
          <Text> LOGO </Text>
        </View>
        <Text style={[styles.text, styles.boldText]}>{'Username:'}</Text>
        <TextInput 
          style={styles.textInput}
          placeholder={'User name'}
          onChangeText={username => {
            // console.warn('text', text);
            this.setState({username})
          }}
          value={this.state.username}
        />
        <Text style={styles.text}>{'Password:'}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Password'}
          onChangeText={password => {
            // console.warn('text', text);
            this.setState({password})
          }}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => this.validateInput()}
        >
        <Text style={{color: 'white'}}> Sign in </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {backgroundColor: '#E4E4E4'}]}>
        <Text style={{color: '#606060'}}> Register </Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.4,
    borderWidth: 1,
  },
  textInput:{
    height: 20, 
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    width: width * 0.8,
    fontSize: 14
  },
  text:{
    alignSelf: 'flex-start', 
    height: 22, 
    width: width * 0.8,
    marginTop: 10, 
    marginLeft: width * 0.1,
  },
  boldText:{
    fontWeight:'bold'
  },
  button:{
    height: 40, 
    width: width * 0.8,
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language
  }
}

export default connect(mapStateToProps)(LoginScreen)

