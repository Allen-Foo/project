import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';


class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.locale.search.title} </Text>
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

export default connect(mapStateToProps)(SearchScreen)