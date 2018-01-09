import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { List, ListItem } from 'react-native-elements';

import { signOut } from '../../redux/actions'
import { onSignOut } from '../../lib/Auth/AWS_Auth';


class ProfileSettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
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
    backgroundColor: '#eee',
  },
  listContainer: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 50,
    justifyContent: 'center',
  },
  signOutContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOut: {
    color: 'red',
    fontSize: 18
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    user: state.socialLogin.user,
  }
}

export default connect(mapStateToProps, {
  signOut,
})(ProfileSettingScreen)