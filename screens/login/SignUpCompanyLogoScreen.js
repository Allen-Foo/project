import React from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Separator, Toast, Avatar } from '../../components';
import { ImagePicker } from 'expo';
import { setCompanyLogo } from '../../redux/actions';
import { ProgressBar, NextButton } from '../../components';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import appSecrets from '../../appSecrets';

class SignUpCompanyLogoScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.locale.signUp.title.logo,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      logo: props.logo || ''
    }
  }

  render() {
    let { locale } = this.props
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ProgressBar step = {3} total={6}/>

          <Text style={styles.question}>{locale.signUp.text.logo.label}</Text>

          {
            this.state.logo != '' && this.state.logo &&
            <Avatar shape={'square'} large uri={this.state.logo}/>
          }

          <TouchableOpacity
            style={styles.button}
            // onPress={this._pickImage}
            onPress={() => {
              this._pickImage()
            }}
          >
            <Entypo
              name={"camera"}
              size={25}
            />
          </TouchableOpacity>

          <NextButton 
            onPress={
              () => {
                if (!this.state.logo) {
                  this.Toast.show();
                }
                else {
                  this.props.setCompanyLogo (this.state.logo);
                  // Next step
                  this.props.navigation.navigate('SignUpCompanySlogan')
                }
              }
            }
            text={locale.signin.text.next.label}
          />
          <Toast timeout={3000} ref={(r) => { this.Toast = r; }} text={locale.alert.pleaseAnswer} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    // console.warn('photo', result);

    if (!result.cancelled) {
      this.uploadPhoto(result)
    }
  }

  uploadPhoto(data) {
    let baseURL = appSecrets.aws.apiURL;
    axios({
      method: 'post',
      url: baseURL + '/upload',
      data: {
        key: 'testKey',
        file: data.base64,
      }
    }).then(res => {
      this.setState({
        logo: res.data.Location,
      })
    }).catch(err => console.warn(err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 20,
  },
  question: {
    fontSize: 22,
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  textInput: {
    paddingVertical: 15, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    // height: 50,
    fontSize: 18,
    backgroundColor: '#FFF',
    paddingLeft: 20,
  },
  button: {
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
    marginTop: 20,
    paddingVertical: 10,
  },
  addButton: {
    fontSize: 50,
    fontWeight: '500'
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    logo: state.company.logo,
  }
}

export default connect(mapStateToProps,{
  setCompanyLogo,
})(SignUpCompanyLogoScreen)
