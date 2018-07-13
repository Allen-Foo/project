import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { ListItem } from '../../components';
import { Constants } from 'expo'
import { onSignOut } from '../../lib/Auth/AWS_Auth';
import { signOut } from '../../redux/actions'

class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.settings.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: screenProps.appType == 'tutor' ? Colors.greyColor : Colors.tintColor,
      },
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ListItem
          title={this.props.locale.settings.language}
          onPress={() => {this.props.navigation.navigate('Language')}}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.leftText}> {this.props.locale.settings.version} </Text>
          <Text style={styles.rightText}> {'1.0.0'} </Text>
        </View>
        {
          this.props.user &&
          <TouchableOpacity 
            style={styles.signOutContainer}
            onPress={() => {
              onSignOut(this.props.user, this.props.signOut)
              this.props.navigation.goBack()
            }}
          >
            <Text style={styles.signOut}>
              {this.props.locale.common.signOut}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signOutContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOut: {
    color: 'red',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row', 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    justifyContent: 'space-between'
  },
  leftText: {
    fontSize: 17,
    paddingVertical: 12,
    paddingLeft: '6%',
  },
  rightText: {
    fontSize: 17,
    color: 'grey',
    paddingVertical: 12,
    paddingRight: '6%',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    user: state.userProfile.user,
  }
}

export default connect(mapStateToProps, {
  signOut,
})(SettingsScreen)