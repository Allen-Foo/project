import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { List, ListItem } from 'react-native-elements';
import { Constants } from 'expo'
import { onSignOut } from '../../lib/Auth/AWS_Auth';


class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.settings.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
          <ListItem
            containerStyle={styles.itemContainer}
            title={this.props.locale.settings.language}
            onPress={() => {this.props.navigation.navigate('Language')}}
          />
          <ListItem
            containerStyle={styles.itemContainer}
            title={this.props.locale.settings.version}
            rightTitle={'0.0.1'}
            rightTitleStyle={{fontSize: 16}}
            hideChevron
            onPress={() => {this.props.navigation.navigate('ApiTest')}}
          />
          <ListItem
            containerStyle={styles.itemContainer}
            title={'Change Password'}
            onPress={() => {this.props.navigation.navigate('Language')}}
          />
        </List>
        <TouchableOpacity 
          style={styles.signOutContainer}
          onPress={() => {
            onSignOut(this.props.user, this.props.signOut)
            this.props.navigation.goBack()
          }}
        >
          <Text style={styles.signOut}>
            {'Sign out'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    width: '100%',
    marginTop: 0,
  },
  itemContainer: {
    height: '20%',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(SettingsScreen)