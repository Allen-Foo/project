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

const { height, width } = Dimensions.get('window')


class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'history'
  // };

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{color: 'white'}}> Sign in </Text>
        </TouchableOpacity> 

        <View style={[styles.logo, {marginTop: 40, marginBottom: 50}]}>
          <Text> LOGO </Text>
        </View>

        <SocialIcon
          title='Use Facebook to Log in'
          button
          raised
          type='facebook'
          onPress={() => this.props.navigation.navigate('Main')}
          style={{width: width * 0.8}}
        />
      

        <TouchableOpacity style={[styles.button, {backgroundColor: '#E4E4E4'}]}>
          <Text style={{color: 'black'}}> Register </Text>
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
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.4,
    borderWidth: 1,
  },
  textInput: {
    height: 20, 
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    width: width * 0.8,
    fontSize: 14
  },
  text: {
    alignSelf: 'flex-start', 
    height: 22, 
    width: width * 0.8,
    marginTop: 10, 
    marginLeft: width * 0.1,
  },
  boldText: {
    fontWeight: 'bold'
  },
  button: {
    height: 40, 
    width: width * 0.8,
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: width * 0.1,
    backgroundColor: '#BA2323',
    width: 70, 
    height: 40,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10, 
  },
  fbIcon: {
    width: width * 0.8,
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(HomeScreen)
