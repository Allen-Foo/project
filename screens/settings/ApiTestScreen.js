import React from 'react';
import { Button, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';


class ApiTestScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    headerLeft: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Button color={'blue'} title={'GET'} onPress={() => {}} />
        <Button color={'yellow'} title={'POST'} onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ApiTestScreen)