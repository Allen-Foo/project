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


class PreSignUpScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'history'
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>請問你想註冊為…</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LearnerSignUpScreen')}
        >
          <Text style={{color: 'white'}}> Tutor </Text>
        </TouchableOpacity> 

        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate('TutorSignUpScreen')}
        >
          <Text style={{color: 'white'}}> Learner </Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    height: 40, 
    width: '100%',
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    //borderRadius: 10, 
    //marginTop: 20
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(PreSignUpScreen)
