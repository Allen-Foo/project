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

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { verifyCode, verifyCodeCancel, signUp, clearTutorProfile } from '../../redux/actions';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import Prompt from 'react-native-prompt';
import { getLocaleErrorMessage } from '../../constants/ServerErrorCode';

import { Spinner, Toast } from '../../components';


class SignUpTutorConfirmScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.common.confirm,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if sign up fail, show message 
    if (this.props.fetchErrorLastUpdate instanceof Date) {

      if (!(prevProps.fetchErrorLastUpdate instanceof Date) ||
        this.props.fetchErrorLastUpdate.getTime() !== prevProps.fetchErrorLastUpdate.getTime()
      ) {
        this.Toast.show();
      }
    }

    if (this.props.isVerified && !prevProps.isVerified) {
      this.props.clearTutorProfile ();
      // console.warn('verify success!')
      this.props.navigation.navigate('Signin');
    }
  }

  handleSignUp() {
    let { cca2, phoneNumber, callingCode, ...profile } = this.props.profile;
    let { selfIntro, profession, experience, achievement } = this.props;
    profile.phone = callingCode + phoneNumber;

    if (selfIntro === '') {
      selfIntro = 'null';
    }

    this.props.signUp(profile, {selfIntro, profession, experience, achievement});
  }

  render() {

    let { locale, profile, selfIntro, profession, experience, achievement, fetchErrorMsg} = this.props

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);
    return (
      <View style = {{flex:1, alignItems:'center'}}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
          >

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.textInput.username.placeholder}
            </Text>
            <Text style={styles.text}>
            {profile.username}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.textInput.email.placeholder}
            </Text>
            <Text style={styles.text}>
            {profile.email}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.textInput.phoneNumber.placeholder}
            </Text>
            <View style={styles.countryPickerContainer}>
              <CountryPicker
                styles={countryPickerStyle}
                onChange={(value)=> {}}
                cca2={profile.cca2}
                disabled={false}
                translation='eng'
              />

              <Text style={styles.phoneNumber}>
              {profile.phoneNumber}
              </Text>
              
            </View>
          </View>

          {
            (selfIntro != '' &&
            <View style={styles.textContainers}>
              <Text style={styles.title}>
                {locale.signUp.title.selfIntro}
              </Text>
              <Text style={styles.text}>
                {selfIntro}
              </Text>
            </View>)
          }

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.title.profession}
            </Text>
            <Text style={styles.text}>
            {profession}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.title.experience}
            </Text>
            <Text style={styles.text}>
            {experience}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.title.achievement}
            </Text>
            <Text style={styles.text}>
            {achievement}
            </Text>
          </View>
        </ScrollView>
        { this.props.isLoading && <Spinner /> }
        <TouchableOpacity 
            style={[styles.button, {marginTop:20, marginBottom:30}]}
            onPress={() => this.handleSignUp()}
          >
            <Text style={{color: 'white'}}>
            {locale.signin.text.signUp.label}
            </Text>
        </TouchableOpacity>
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    );
  }
}

const countryPickerStyle = {
  itemCountryFlag: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textContainers: {
    borderBottomWidth: 1,
    borderColor: 'grey', 
    flexDirection: 'row',
    // paddingLeft: 10,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'
  },
  uploadButton: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryPickerContainer: {
    borderColor: 'grey', 
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: '70%',
    alignItems: 'center'
  },
  agreement: {
    fontSize: 14,
    marginTop: 20,
    width: '80%',
  },
  title: {
    paddingVertical: 15, 
    width: '30%',
    fontSize: 12,
    backgroundColor: '#FFF',
    paddingLeft: 15,
  },
  text: {
    paddingVertical: 15, 
    width: '70%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
  phoneNumber: {
    fontSize: 14,
    paddingVertical: 6,
    backgroundColor: '#fff',
    paddingLeft: 20,
    width: '70%'
  },
  button: {
    height: 40, 
    width: '80%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  socialLogins: {
    position: 'absolute',
    left: '12%',
    right: '12%',
    bottom: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
  SocialButtonStyle: {
    height: 40, 
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    flexDirection: 'row'
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    
    isVerified: state.socialLogin.isVerified,
    verfiedErrorMsg: state.socialLogin.verfiedErrorMsg,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
    showMFAPrompt: state.socialLogin.showMFAPrompt,

    profile: state.tutor.profile,
    selfIntro: state.tutor.selfIntro,
    profession: state.tutor.profession,
    experience: state.tutor.experience,
    achievement: state.tutor.achievement,
  }
}

export default connect(mapStateToProps, {
  signUp,
  verifyCode,
  verifyCodeCancel,
  clearTutorProfile,
})(SignUpTutorConfirmScreen)

