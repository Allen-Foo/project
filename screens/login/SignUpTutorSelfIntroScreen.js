import React from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Separator } from '../../components';
import { setSelfIntro } from '../../redux/actions';

class SignUpTutorSelfIntroScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      // title: screenProps.locale.signUp.title[state.params.userRole],
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selfIntroduction: ''
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{locale.signUp.text.selfIntroduction.label}</Text>

        <TextInput 
          style={styles.textInput}
          multiline={true}
          numberOfLines={10}
          onChangeText={selfIntroduction => {
            // console.warn('text', text);
            this.setState({selfIntroduction})
          }}
          value={this.state.selfIntroduction}
        />
        <TouchableOpacity 
          style={[styles.button, {marginTop: 20} ]}
          onPress={
            () => {
              this.props.setSelfIntro (this.state.selfIntroduction);
              // Next step
              this.props.navigation.navigate('SignUpTutorProfessionScreen')
            }
          }
        >
          <Text style={{color: 'white'}}> {locale.signin.text.next.label} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 40,
  },
  question: {
    fontSize: 22,
    width: '80%',
    marginBottom: 10,
    textAlign: 'center',
  },
  textInput: {
    paddingVertical: 15, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    height: 200,
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
    locale: state.language.locale
  }
}

export default connect(mapStateToProps,{
  setSelfIntro,
})(SignUpTutorSelfIntroScreen)
