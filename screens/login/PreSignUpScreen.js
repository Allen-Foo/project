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
import { Separator } from '../../components';
import { SocialIcon } from 'react-native-elements';
import { clearTutorProfile } from '../../redux/actions';


const { height, width } = Dimensions.get('window')


class PreSignUpScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'history'
  // };

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.chooseUserType}>{locale.signUp.text.chooseUserType.label}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignUp', {userRole: 'company'})}
        >
          <Text style={styles.textStyle}> {locale.signUp.text.company.label} </Text>
        </TouchableOpacity>
        <Separator style={{backgroundColor: '#eee'}}/>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            this.props.clearTutorProfile ();
            this.props.navigation.navigate('SignUp', {userRole: 'tutor'});
          }}
        >
          <Text style={styles.textStyle}> {locale.signUp.text.tutor.label} </Text>
        </TouchableOpacity>
        <Separator style={{backgroundColor: '#eee'}}/>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignUp', {userRole: 'learner'})}
        >
          <Text style={styles.textStyle}> {locale.signUp.text.learner.label} </Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  chooseUserType: {
    top:100,
    left:20
  },
  textStyle: {
    //top: 100,
    color:'black',
    left:20,
  },
  button:{
    height: 40,
    top:110,
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    //alignItems: 'center', 
    //borderRadius: 10, 
    //marginTop: 20
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps ,{
  clearTutorProfile,
})(PreSignUpScreen)
