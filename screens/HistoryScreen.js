import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {global.locale.history.title} </Text>
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
