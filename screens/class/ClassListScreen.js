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

import { connect } from 'react-redux';
import { getClassList } from '../../redux/actions';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

class ClassListScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      tabBarLabel: screenProps.locale.classList.title,
      headerTitle: screenProps.locale.classList.title,
      headerTintColor: 'black',
      headerStyle: {
        // backgroundColor: '#555',
      },
    }
  };

  componentWillMount() {
    this.props.getClassList()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Category')}
        >
          <Ionicons
            name={'ios-add-circle-outline'}
            size={30}
            style={{ padding: '2%'}}
            color={'black'}
          />
          <Text style={styles.text}> Add a Class</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5, 
    flexDirection: 'row',
    marginTop: '5%',
    marginHorizontal: '5%',
  },
});


const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    createClassSuccess: state.classes.createClassSuccess,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassList,
})(ClassListScreen)
