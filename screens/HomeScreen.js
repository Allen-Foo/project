import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'history'
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text> {'Home page'} </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Main')}
        >
          <Text> Login </Text>
        </TouchableOpacity>
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
    locale: state.language
  }
}

export default connect(mapStateToProps)(HomeScreen)