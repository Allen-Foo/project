import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../constants/Colors';

import { List, ListItem } from 'react-native-elements';
import { Constants } from 'expo'


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{width: '100%', marginTop: 0}}>
          <ListItem
            containerStyle={{height: '20%', justifyContent: 'center'}}
            title={this.props.locale.settings.language}
            onPress={() => {this.props.navigation.navigate('Settings')}}
          />
          <ListItem
            containerStyle={{height: '20%', justifyContent: 'center'}}
            title={this.props.locale.settings.version}
            rightTitle={'0.0.1'}
            rightTitleStyle={{fontSize: 16}}
            hideChevron
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language
  }
}

export default connect(mapStateToProps)(SettingsScreen)