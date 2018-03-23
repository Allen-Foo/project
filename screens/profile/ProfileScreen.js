import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window')

import Colors from '../../constants/Colors';

import { signInFacebook, signInGoogle, setAppType } from '../../redux/actions';

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
    let backgroundColor = Colors.tintColor;
    if (screenProps.appType == 'tutor') {
      headerTintColor = '#000';
      backgroundColor = '#f7f7f7'
    }
    return {
      tabBarLabel: screenProps.locale.profile.title,
      headerLeft: null,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  static defaultProps = {
    isLoggedIn: false
  }

  renderHeader(isLoggedIn) {
    let avatar = 
      <Avatar
        large
        rounded
        icon={{name: 'account-box'}}
        onPress={() => this.props.navigation.navigate('ProfileSetting')}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
    if (this.props.user && this.props.user.avatarUrl) {
      avatar = 
        <Avatar
          large
          rounded
          source={{url: this.props.user.avatarUrl}}
          onPress={() => this.props.navigation.navigate('ProfileSetting')}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
    }

    if (isLoggedIn) {
      return (
        <View style={styles.loginContainer}>
          { avatar }
        </View>
      )
    } else {
      return (
        <View style={styles.loginContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#e4e4e4'}]} onPress={() => this.props.navigation.navigate('Signin')}>
            <Text style={{color: '#5ECC3F'}}> {this.props.locale.profile.text.pleaseSignInToViewYourProfile} </Text>
          </TouchableOpacity>

        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        {this.renderHeader(this.props.isLoggedIn)}

        <List containerStyle={{width: '90%'}}>
          <ListItem
            title={this.props.locale.profile.text.comments}
            leftIcon={{name: 'comment'}}
            onPress={() => {this.props.navigation.navigate('SearchClass')}}
          />
          <ListItem
            title={this.props.locale.profile.text.notifications}
            leftIcon={{name: 'notifications'}}
            onPress={() => {this.props.navigation.navigate('Notifications')}}
          />
          <ListItem
            title={this.props.locale.profile.text.applyToBeTutor}
            leftIcon={{name: 'people'}}
            onPress={() => {this.props.navigation.navigate('Apply to be a tutor')}}
          />
          {
            this.props.appType &&
            <ListItem
              title={this.props.locale.profile.text.switchMode[this.props.appType]}
              leftIcon={{name: 'swap-horiz'}}
              onPress={() => this.props.setAppType(this.props.appType == 'tutor'? 'learner' : 'tutor')}
            />
          }
          <ListItem
            title={this.props.locale.profile.text.settings}
            leftIcon={{name: 'settings'}}
            onPress={() => {this.props.navigation.navigate('Settings')}}
          />        
        </List>
      </ScrollView>
    );
  }
}

const SocialIcon = props => {
  const { name, onPress } = props;
  // it is actually using MaterialIcons
  return (
    <TouchableOpacity onPress={onPress} style={{width: '30%'}}>
      <FontAwesome
        name={name}
        size={22}
        color={'#fff'}
        style={{textAlign: 'center'}}
      />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    marginTop: '10%',
    marginBottom: '5%',
    backgroundColor: '#eee'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5%'
  },
  button: {
    height: 40, 
    width: width * 0.8,
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  },
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    user: state.socialLogin.user,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  signInFacebook,
  signInGoogle,
  setAppType,
})(ProfileScreen)
