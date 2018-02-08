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
import { Entypo } from '@expo/vector-icons';

class ClassTypeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.classType.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      classType: '',
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
    let { classType } = this.state;
    let { locale } = this.props;

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>{locale.classType.question.typeMsg}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Category')}
          >
            <Text style={styles.text}> {classType} </Text>
            <Entypo
              name={"chevron-thin-right"}
              size={25}
              style={{ paddingRight: 15 }}
              color={'#555'}
            />
          </TouchableOpacity>
          {
            !this.isEmpty(classType) &&
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
  title: {
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    paddingLeft: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassTypeScreen)
