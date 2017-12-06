import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window')

import Colors from '../../constants/Colors';

import { signInFacebook, signInGoogle } from '../../redux/actions';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
        onPress={() => this.props.rootNavigator.navigate('ProfileSetting')}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
    if (this.props.avatarUrl) {
      avatar = 
        <Avatar
          large
          rounded
          source={{url: this.props.avatarUrl}}
          onPress={() => this.props.rootNavigator.navigate('ProfileSetting')}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
    }

    if (isLoggedIn) {
      return (
        <View style={styles.loginContainer}>
          { avatar }

          <View style={styles.socialContainer}>
            <SocialIcon onPress={() => {signInFacebook()}} name={'facebook'} />
            <SocialIcon onPress={() => {signInGoogle()}} name={'google-plus'} />
            <SocialIcon onPress={() => {}} name={'wechat'} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.loginContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#E4E4E4'}]} onPress={() => this.props.rootNavigator.navigate('Signin')}>
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
            title={'Comments'}
            leftIcon={{name: 'comment'}}
            onPress={() => {this.props.rootNavigator.navigate('Comments')}}
          />
          <ListItem
            title={'Notifications'}
            leftIcon={{name: 'notifications'}}
            onPress={() => {this.props.rootNavigator.navigate('Notifications')}}
          />
          <ListItem
            title={'Apply to be a tutor'}
            leftIcon={{name: 'people'}}
            onPress={() => {this.props.rootNavigator.navigate('Apply to be a tutor')}}
          />
          <ListItem
            title={'Settings'}
            leftIcon={{name: 'settings'}}
            onPress={() => {this.props.rootNavigator.navigate('Settings')}}
          />        
        </List>
      </ScrollView>
    );
  }
}

const SocialIcon = props => {
  const { name, onPress } = props;
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


const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    avatarUrl: state.socialLogin.avatarUrl,
    userName: state.socialLogin.userName,
  }
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
    paddingVertical: '20%',
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
  button:{
    height: 40, 
    width: width * 0.8,
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20
  },
  text: {
    marginTop:10,
    color: '#fff'
  }

});

export default connect(mapStateToPorps, {
  signInFacebook,
  signInGoogle
})(ProfileScreen)
