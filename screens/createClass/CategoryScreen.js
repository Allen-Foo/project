import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window')

import Colors from '../../constants/Colors';
import { classData } from '../../constants/classData';

const categoryList = [
  'education', 
  'music', 
  'sports', 
  'beauty', 
  'designAndDevelopment', 
  'petTraining', 
  'carDriving', 
  'interestClasses', 
  'personal', 
  'photography', 
  'recover', 
  'talent',
  'stem',
  ]
const languages = 'languages'

class CategoryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      headerTitle: screenProps.locale.category.title,
      headerTintColor: 'black',
      headerStyle: {
        //backgroundColor: '#3A3C3D',
      },
    }
  };

  constructor(props) {
    super(props)
    this.props.navigation.state.key = 'Category'
  }

  render() {
    let { returnData } = this.props.navigation.state.params;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          categoryList.map((x, i) => 
            <CategoryButton
              key={i}
              text={this.props.locale.category.types[x]}
              onPress={
                () => this.props.navigation.navigate(
                  'Skill',
                  {category: x, returnData: returnData}
                )
              }
            />
          )
        }
      </ScrollView>
    );
  }
}

const CategoryButton = props => {
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

export default connect(mapStateToProps)(CategoryScreen)
