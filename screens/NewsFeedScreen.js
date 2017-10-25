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

export default class NewsFeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> News Feed</Text>
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
