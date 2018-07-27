import React from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { Separator } from '../../components';
import { SocialIcon } from 'react-native-elements';
import { clearTutorProfile } from '../../redux/actions';
import Colors from '../../constants/Colors';

const { height, width } = Dimensions.get('window')


class PreSignUpScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.chooseUserType}>{locale.signUp.text.chooseUserType.label}</Text>

        <Separator style={{backgroundColor: '#eee'}}/>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignUp', {userRole: 'learner'})}
        >
          <Image 
            source={require('../../assets/images/learner.png')}
            style={styles.image}
          />
          <Text style={styles.textStyle}> {locale.signUp.text.learner.label} </Text>
        </TouchableOpacity> 
        <Separator style={{backgroundColor: '#eee'}}/>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            this.props.clearTutorProfile ();
            this.props.navigation.navigate('SignUp', {userRole: 'tutor'});
          }}
        >
          <Image 
            source={require('../../assets/images/tutor.png')}
            style={styles.image}
          />
          <Text style={styles.textStyle}> {locale.signUp.text.tutor.label} </Text>
        </TouchableOpacity>
        <Separator style={{backgroundColor: '#eee'}}/>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignUp', {userRole: 'company'})}
        >
          <Image 
            source={require('../../assets/images/company.png')}
            style={styles.image}
          />
          <Text style={styles.textStyle}> {locale.signUp.text.company.label} </Text>
        </TouchableOpacity>

        <Separator style={{backgroundColor: '#eee'}}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  chooseUserType: {
   paddingTop: 30,
   paddingBottom: 30,
  },
  textStyle: {
    paddingTop: 5,
    color:'black',
  },
  image: {
    width: 100,
    height: 100,
  },
  button:{
    // height: 40,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff', 
    justifyContent: 'center', 
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
