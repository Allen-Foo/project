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
import { editClass } from '../../redux/actions';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

class ClassTypeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"check"}
          size={30}
          style={{ paddingRight: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      title: params.isEditMode ? null : screenProps.locale.classType.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.props.navigation.state.key = 'ClassType'

    this.state = {
      classType: params.category && params.skill && `${params.category} - ${params.skill}`,
      category: params.category || '',
      skill: params.skill || '',
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    let { category, skill } = this.state;
    this.props.editClass({category, skill})
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

  handleReturnData = (data) => {
    const {locale} = this.props;

    this.setState({
      classType: `${locale.category.types[data.category]} - ${locale.skill.types[data.category][data.skill]}`,
      ...data
    })
  }

  handleNext() {
    let { params = {} } = this.props.navigation.state;
    params.category = this.state.category
    params.skill = this.state.skill
    this.props.navigation.navigate('ClassDescription', params)
  }

  render() {
    let { params = {} } = this.props.navigation.state;
    let { classType } = this.state;
    let { locale } = this.props;

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>{locale.classType.question.typeMsg}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Category', {returnData: this.handleReturnData})}
          >
            <Text style={styles.text}> {classType} </Text>
            <Entypo
              name={"chevron-thin-right"}
              size={20}
              style={{ paddingRight: 15 }}
              color={'#555'}
            />
          </TouchableOpacity>
          {
            !this.isEmpty(classType) && !params.isEditMode &&
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
    fontSize: 15,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 10,
  },
  text: {
    fontSize: 15,
    paddingLeft: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(ClassTypeScreen)
