import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';

class ClassDescriptionScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.classDescription.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      title: '',
    }
  }

  isEmpty(str) {
    if (typeof str == 'undefined' || !str || str.length === 0 ||
       str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === ""
    ) {
      return true;
    }
    return false;
  }

  handleNext() {
    let { params = {} } = this.props.navigation.state;
    let { title, description } = this.state;
    params.description = description
    params.title = title
    this.props.navigation.navigate('UploadPhoto', params)
  }

  render() {
    let { params = {} } = this.props.navigation.state;
    let { title, description } = this.state;
    let { locale } = this.props;

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={{paddingLeft: 10}}>{"What's the title of this course?"}</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize={'words'}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Text style={{paddingLeft: 10, paddingVertical: 10}}>{"How do you discribe this course? (optional)"}</Text>
          <TextInput
            multiline
            style={styles.textArea}
            keyboardType='numeric'
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
          {
            !this.isEmpty(title) &&
            <NextButton 
              onPress={() => this.handleNext()}
              text={this.props.locale.common.next}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 20,
    paddingLeft: '10%',
  },
  textInput: {
    marginTop: 10,
    height: 40, 
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 5,
    width: '90%',
  },
  textArea: {
    borderRadius: 5,
    fontSize: 14,
    height: '30%',
    backgroundColor: '#FFF',
    width: '90%',
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassDescriptionScreen)
