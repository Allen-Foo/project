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
import { signUpTutor } from '../../redux/actions';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

import { Toast } from '../../components';


class SignUpTutorConfirmScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.signUp.text.signUp.label,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  handleSignUp() {


    let { cca2, phoneNumber, callingCode, ...profile } = this.props.profile;
    let { selfIntro, profession, exp, achievement } = this.props;
    profile.phone = callingCode + phoneNumber;

    this.props.signUpTutor(profile, selfIntro, profession, exp, achievement);
  }

  render() {

    let { locale, profile, selfIntro, profession, experience, achievement} = this.props
    return (
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
          >
          {
            // <Prompt
            //   title={this.props.verfiedErrorMsg || this.props.locale.signUp.text.verifyCode.label}
            //   placeholder={this.props.locale.signUp.text.verifyCodePlaceholder.label}
            //   submitText={this.props.locale.common.ok}
            //   cancelText={this.props.locale.common.cancel}
            //   textInputProps={{keyboardType: 'numeric'}}
            //   visible={this.props.showMFAPrompt}
            //   onCancel={() => this.props.verifyCodeCancel()}
            //   onSubmit={(code) => this.props.verifyCode(this.state.username, code)}
            // />
          }

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

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.text.selfIntro.label}
            </Text>
            <Text style={styles.text}>
            {selfIntro}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.text.profession.label}
            </Text>
            <Text style={styles.text}>
            {profession}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.text.experience.label}
            </Text>
            <Text style={styles.text}>
            {experience}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
            {locale.signUp.text.achievement.label}
            </Text>
            <Text style={styles.text}>
            {achievement}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, {marginTop:20, marginBottom:30}]}
            onPress={() => this.handleSignUp()}
          >
            <Text style={{color: 'white'}}>
            {locale.signin.text.signUp.label}
            </Text>
          </TouchableOpacity>


          { this.props.isLoading && <Spinner /> }
          <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
        </ScrollView>
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
    borderBottomWidth: 1,
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
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '30%',
    fontSize: 12,
    backgroundColor: '#FFF',
    paddingLeft: 15,
  },
  text: {
    paddingVertical: 15, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
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
    profile: state.tutorRegistration.profile,
    selfIntro: state.tutorRegistration.selfIntro,
    profession: state.tutorRegistration.profession,
    experience: state.tutorRegistration.experience,
    achievement: state.tutorRegistration.achievement,
  }
}

export default connect(mapStateToProps, {
  signUpTutor,
  
})(SignUpTutorConfirmScreen)

