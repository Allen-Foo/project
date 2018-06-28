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
import { Separator, Toast } from '../../components';
import { setCompanySlogan } from '../../redux/actions';
import { ProgressBar, NextButton } from '../../components';

class SignUpCompanySloganScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.locale.signUp.title.slogan,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      slogan: props.slogan || ''
    }
  }

  render() {
    let { locale } = this.props
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ProgressBar step = {4} total={6}/>

          <Text style={styles.question}>{locale.signUp.text.slogan.label}</Text>

          <TextInput 
            style={styles.textInput}
            onChangeText={slogan => {
              // console.warn('text', text);
              this.setState({slogan})
            }}
            value={this.state.slogan}
          />
          <NextButton 
            onPress={
              () => {
                if (!this.state.slogan) {
                  this.Toast.show();
                }
                else {
                  this.props.setCompanySlogan (this.state.slogan);
                  // Next step
                  this.props.navigation.navigate('SignUpCompanyBanner')
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
    slogan: state.tutor.slogan,
  }
}

export default connect(mapStateToProps,{
  setCompanySlogan,
})(SignUpCompanySloganScreen)
