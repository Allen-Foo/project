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
import { getLocaleErrorMessage } from '../../constants/ServerErrorCode';

import { Spinner, Toast, Slideshow, Avatar, NextButton } from '../../components';
let {width, height} = Dimensions.get('window');

class SignUpCompanyConfirmScreen extends React.Component {

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
      // this.props.clearTutorProfile ();
      // console.warn('verify success!')
      this.props.navigation.navigate('Signin');
    }
  }

  handleSignUp() {
    let { cca2, phoneNumber, callingCode, ...profile } = this.props.profile;
    let { displayName, introduction, logo, slogan, banner } = this.props;
    profile.phone = callingCode + phoneNumber;

    // for company account, assign some data to the profile
    profile.introduction = introduction;
    profile.name = displayName;
    profile.avatarUrl = logo;

    this.props.signUp(profile, {displayName, introduction, logo, slogan, banner});
  }

  render() {

    let { locale, profile, displayName, introduction, logo, slogan, banner, fetchErrorMsg} = this.props

    let errMessage = getLocaleErrorMessage(locale, fetchErrorMsg);

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

          <View style={styles.textContainers}>
            <Text style={styles.title}>
              {locale.signUp.title.displayName}
            </Text>
            <Text style={styles.text}>
              {displayName}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
              {locale.signUp.title.introduction}
            </Text>
            <Text style={styles.text}>
              {introduction}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
             {locale.signUp.title.logo}
            </Text>
            <View style={styles.logoContainer}>
              <Avatar medium uri={logo} />
            </View>
          </View>


          <View style={styles.textContainers}>
            <Text style={styles.title}>
              {locale.signUp.title.slogan}
            </Text>
            <Text style={styles.text}>
              {slogan}
            </Text>
          </View>

          <View style={styles.textContainers}>
            <Text style={styles.title}>
              {locale.signUp.title.banner}
            </Text>
            <Slideshow 
              dataSource={banner}
              containerStyle={sliderContainer}
              scrollEnabled={banner.length > 1}
            />
          </View>
          

        </ScrollView>
        { this.props.isLoading && <Spinner /> }
        <NextButton 
          onPress={() => this.handleSignUp()}
          text={locale.signin.text.signUp.label}
        />
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

const sliderContainer = {
  width: width * 0.7,
  height: width * 0.7 * 3 / 4,
  paddingHorizontal: width * 0.025,
  paddingTop: width * 0.025,
  marginBottom: width * 0.025,
}

const styles = StyleSheet.create({
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
  countryPickerContainer: {
    borderColor: 'grey', 
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: '70%',
    alignItems: 'center'
  },
  title: {
    paddingVertical: 15, 
    width: '30%',
    fontSize: 12,
    backgroundColor: '#FFF',
    paddingLeft: 15,
  },
  logoContainer: {
    paddingVertical: 15, 
    width: '70%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start',
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

    profile: state.company.profile,
    displayName: state.company.displayName,
    introduction: state.company.introduction,
    logo: state.company.logo,
    slogan: state.company.slogan,
    banner: state.company.banner,
  }
}

export default connect(mapStateToProps, {
  signUp,
  verifyCode,
  verifyCodeCancel,
  clearTutorProfile,
})(SignUpCompanyConfirmScreen)

