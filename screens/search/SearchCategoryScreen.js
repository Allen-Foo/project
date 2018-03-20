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
  'talent'
  ]

class SearchCategoryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      headerTitle: screenProps.locale.category.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props)
    this.props.navigation.state.key = 'SearchCategory'
  }

  handleSelect = (category) => {
    let { returnData } = this.props.navigation.state.params;

    returnData(category)
  
    this.props.navigation.goBack();
  }

  render() {
    // let { returnData } = this.props.navigation.state.params;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          categoryList.map((x, i) => 
            <CategoryButton
              key={i}
              text={this.props.locale.category.types[x]}
              onPress={() => this.handleSelect(x)}
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

export default connect(mapStateToProps)(SearchCategoryScreen)
