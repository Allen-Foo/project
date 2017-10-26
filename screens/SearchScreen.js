import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {global.locale.search.title} </Text>
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
