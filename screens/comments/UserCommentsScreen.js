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

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';

import { mockData } from '../../constants/mockData';

import Tutor from '../../components/Tutor';


class UserCommentsScreen extends React.Component {

  static navigationOptions = {
    title: 'Comments',
    tabBarLabel: 'As a User',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        {
          // mockData.map((data, index) => (
          //   <Tutor key={index} data={data} />
          // ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}


export default connect(mapStateToProps)(UserCommentsScreen)
