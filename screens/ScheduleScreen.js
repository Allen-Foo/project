import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'Schedule',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Schedule </Text>
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
