import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window')

import Colors from '../../constants/Colors';
import { classData } from '../../constants/classData';

const categoryList = ['languages', 'music', 'sports']
const languages = 'languages'

class CategoryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      tabBarLabel: screenProps.locale.category.title,
      headerTitle: screenProps.locale.category.title,
      headerTintColor: 'black',
      headerStyle: {
        //backgroundColor: '#3A3C3D',
      },
    }
  };

  render() {
    return (
      <View>
        {
          categoryList.map((x, i) => 
            <CategoryButton
              key={i}
              text={this.props.locale.category.types[x]}
              onPress={
                () => this.props.navigation.navigate(
                  'Skill',
                  {category: x}
                )
              }
            />
          )
        }
      </View>
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
