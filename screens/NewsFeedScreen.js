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
import Colors from '../constants/Colors';


import { connect } from 'react-redux';


class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      headerTitle: state.params && state.params.title ? state.params.title : 'NewsFeed',
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },  
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({title: this.props.locale.newsfeed.title})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.props.navigation.setParams({title: nextProps.locale.newsfeed.title})
    }
  }

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
