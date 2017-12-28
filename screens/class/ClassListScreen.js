import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

class ClassList extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      tabBarLabel: screenProps.locale.classList.title,
      headerTitle: screenProps.locale.classList.title,
      headerTintColor: 'black',
      headerStyle: {
        //backgroundColor: '#3A3C3D',
      },
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Category')}
          >
            <Ionicons
              name={'ios-add-circle-outline'}
              size={35}
              style={{ padding: '3%'}}
              color={'black'}
            />
            <Text style={styles.text}> Add a Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    height: 60, 
    width: '100%',
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 15, 
    flexDirection: 'row',
    paddingVertical: '2%',
  },
});

export default ClassList
