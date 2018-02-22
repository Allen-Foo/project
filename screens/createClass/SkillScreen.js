import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window')

import Colors from '../../constants/Colors';
import { classData } from '../../constants/classData';

class Skill extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      headerTitle: screenProps.locale.skill.title,
      headerTintColor: 'black',
      headerStyle: {
        //backgroundColor: '#3A3C3D',
      },
    }
  };

  handleSelect = (category, skill) => {
    let { returnData } = this.props.navigation.state.params;

    returnData({category: category, skill: skill})
  
    this.props.navigation.goBack('Category');
  }
  
  render() {
    let categoryIndex = this.props.navigation.state.params.category;
    let skillList = classData.category[categoryIndex];
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          skillList.map((x, i) => 
            <SkillButton
              key={i}
              text={this.props.locale.skill.types[categoryIndex][x]}
              onPress= {() => this.handleSelect(categoryIndex, x)}
            />
          )
        }
      </ScrollView>
    );
  }
}

const SkillButton = props => {
  const {text, onPress } = props;
  return (
    <TouchableOpacity 
      style={[styles.button,{ marginBottom:10, marginTop:10, flexDirection:'row'}]}
      onPress={onPress}
    >
      <Text style={[styles.text,{paddingLeft: 5}]}>{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    height: 40, 
    width: '100%',
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  text: {
    fontWeight: 'bold',
  },

});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(Skill)
