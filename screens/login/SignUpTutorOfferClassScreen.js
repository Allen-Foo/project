import React from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Separator } from '../../components';

class SignUpTutorOfferClassScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offerClass: ''
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{locale.signUp.text.offerClass.label}</Text>

        <TextInput 
          style={styles.textInput}
          multiline={true}
          placeholder={locale.signUp.textInput.class.placeholder}
          numberOfLines={5}
          onChangeText={offerClass => {
            // console.warn('text', text);
            this.setState({offerClass})
          }}
          value={this.state.offerClass}
        />
        <TouchableOpacity 
          style={[styles.button, {marginTop: 20} ]}
          onPress={
            () => {
              // Next step
              this.props.navigation.navigate('SignUpTutorOfferClassScreen')
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
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    paddingVertical: 15, 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    width: '100%',
    fontSize: 14,
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

export default connect(mapStateToProps)(SignUpTutorOfferClassScreen)
