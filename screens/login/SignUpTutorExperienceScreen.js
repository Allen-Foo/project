import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Separator, Toast } from '../../components';
import { setExperience } from '../../redux/actions';
import { ProgressBar, NextButton } from '../../components';

class SignUpTutorExperienceScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.locale.signUp.title.experience,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      experience: 0
    }
  }

  componentWillMount () {
    this.state.experience = this.props.experience;
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <ProgressBar step = {3} />
        <Text style={styles.question}>{locale.signUp.text.experience.label}</Text>
        <Picker
          selectedValue={this.state.experience}
          style={styles.picker}
          onValueChange={
            (experience, itemIndex) => {
              this.setState({experience});
            }
          }>
          <Picker.Item label="0" value={0} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10+" value={10} />
        </Picker>
        <NextButton 
          onPress={
            () => {
              if (!this.state.experience) {
                this.Toast.show();
              }
              else {
                this.props.setExperience (this.state.experience);
                // Next step
                this.props.navigation.navigate('SignUpTutorAchievementScreen')
              }
            }
          }
          text={locale.signin.text.next.label}
        />
        <Toast timeout={3000} ref={(r) => { this.Toast = r; }} text={locale.alert.pleaseAnswer} />
      </View>
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
  button: {
    height: 40, 
    width: '80%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  picker: {
    // height: 300,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#FFF',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    experience: state.tutorRegistration.experience,
  }
}

export default connect(mapStateToProps,{
  setExperience,
})(SignUpTutorExperienceScreen)
