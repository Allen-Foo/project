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
import { createClass, editClass } from '../../redux/actions';
import { MaterialIcons } from '@expo/vector-icons';
import { Hr, NextButton, CheckButton } from '../../components';
import Colors from '../../constants/Colors';

class ClassDescriptionScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}/>
    );

    return {
      title: params.isEditMode ? null : screenProps.locale.classDescription.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.props.navigation.state.key = 'ClassDescription'
    this.state = {
      description: params.description || '',
      title: params.title || '',
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    let { title, description } = this.state;

    if (description === '') {
      description = 'null'
    }

    this.props.editClass({title, description})
    this.props.navigation.goBack();
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
    this.props.navigation.navigate('Calendar', params)
  }

  render() {
    let { params = {} } = this.props.navigation.state;
    let { title, description } = this.state;
    let { locale } = this.props;

    let classDescription = this.state.description;
    if (classDescription === 'null') {
      classDescription = '';
    }

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={{fontSize: 15}}>{locale.classDescription.question.titleMsg}</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize={'words'}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            underlineColorAndroid={'transparent'}
          />
          <Text style={{fontSize: 15, paddingVertical: 10}}>{locale.classDescription.question.descriptionMsg}</Text>
          <TextInput
            multiline
            style={styles.textArea}
            onChangeText={(description) => this.setState({description})}
            value={classDescription}
            underlineColorAndroid={'transparent'}
          />
          {
            !this.isEmpty(title) && !params.isEditMode &&
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

export default connect(mapStateToProps, {
  editClass
})(ClassDescriptionScreen)
