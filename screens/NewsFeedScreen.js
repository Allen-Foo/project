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


class NewsFeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.locale.newsfeed.title}</Text>
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

export default connect(mapStateToProps)(NewsFeedScreen)