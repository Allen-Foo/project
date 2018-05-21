import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { FontAwesome, Entypo } from '@expo/vector-icons';
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
      headerTitle: screenProps.locale.profile.title,
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
        <TouchableOpacity style={[styles.loginContainer,{flexDirection: 'row'}]} onPress={() => this.props.navigation.navigate('ProfileSetting')}>
          { avatar }
          <Text style={styles.username}>{this.props.user.username}</Text>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.loginContainer,{flexDirection: 'row'}]} onPress={() => this.props.navigation.navigate('Signin')}>
          <Avatar
            large
            rounded
            icon={{name: 'account-box'}}
            onPress={() => this.props.navigation.navigate('Signin')}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.username}>{this.props.locale.profile.text.signUpOrLogin}</Text>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderClassList(isLoggedIn) {
    if (!this.props.isLoggedIn){
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.learner}
          leftIcon={{name: 'class'}}
          onPress={() => {this.props.navigation.navigate('Signin')}}
        />  
      )
    } else if (this.props.appType == 'learner' && this.props.isLoggedIn){
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.learner}
          leftIcon={{name: 'class'}}
          onPress={() => {this.props.navigation.navigate('AppliedClassList')}}
        /> 
      )
    } else if (this.props.user.userRole == 'learner' && this.props.isLoggedIn){
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.learner}
          leftIcon={{name: 'class'}}
          onPress={() => {this.props.navigation.navigate('AppliedClassList')}}
        /> 
      )
    } else if (this.props.user.userRole == 'tutor'){
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.tutor}
          leftIcon={{name: 'class'}}
          onPress={() => {this.props.navigation.navigate('ClassList')}}
        />   
      )
    } else if (this.props.user.userRole == 'company') {
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.tutor}
          leftIcon={{name: 'class'}}
          onPress={() => {this.props.navigation.navigate('ClassList')}}
        />   
      )
    }
  }
  render() {
    if (!this.props.isLoggedIn){
      return (
        <ScrollView contentContainerStyle={styles.container}>

          {this.renderHeader(this.props.isLoggedIn)}

          <List containerStyle={styles.contentContainer}>
            {
              this.renderClassList(this.props.isLoggedIn)
            }
            <ListItem
              title={this.props.locale.profile.text.settings}
              leftIcon={{name: 'settings'}}
              onPress={() => {this.props.navigation.navigate('Settings')}}
            />        
          </List>
        </ScrollView>
      )
    } else if ( this.props.isLoggedIn && this.props.user.userRole == 'learner' ) {
      return (
        <ScrollView contentContainerStyle={styles.container}>

          {this.renderHeader(this.props.isLoggedIn)}

          <List containerStyle={styles.contentContainer}>
            {
              this.renderClassList(this.props.isLoggedIn)
            }
            <ListItem
              title={this.props.locale.profile.text.settings}
              leftIcon={{name: 'settings'}}
              onPress={() => {this.props.navigation.navigate('Settings')}}
            />        
          </List>
        </ScrollView>
      )
    } else if (this.props.isLoggedIn && this.props.user.userRole == 'company') {
        return(

          <ScrollView contentContainerStyle={styles.container}>

            {this.renderHeader(this.props.isLoggedIn)}

            <List containerStyle={styles.contentContainer}>
              {
                this.props.user.userRole == 'tutor' || this.props.user.userRole == 'company' &&
                <ListItem
                  title={this.props.locale.profile.text.switchMode[this.props.appType]}
                  leftIcon={{name: 'swap-horiz'}}
                  onPress={() => this.props.setAppType(this.props.appType == 'tutor'? 'learner' : 'tutor')}
                />
              }
              {
                this.renderClassList()
              }
              <ListItem
                title={this.props.locale.profile.text.settings}
                leftIcon={{name: 'person-add'}}
                onPress={() => {this.props.navigation.navigate('Settings')}}
              />
              <ListItem
                title={this.props.locale.profile.text.settings}
                leftIcon={{name: 'settings'}}
                onPress={() => {this.props.navigation.navigate('Settings')}}
              />        
            </List>
          </ScrollView>
        )
    } else if (this.props.isLoggedIn && this.props.user.userRole == 'tutor') {
      return (
        <ScrollView contentContainerStyle={styles.container}>

          {this.renderHeader(this.props.isLoggedIn)}

          <List containerStyle={styles.contentContainer}>
            {
              this.props.user.userRole == 'tutor' &&
              <ListItem
                title={this.props.locale.profile.text.switchMode[this.props.appType]}
                leftIcon={{name: 'swap-horiz'}}
                onPress={() => this.props.setAppType(this.props.appType == 'tutor'? 'learner' : 'tutor')}
              />
            }
            {
              this.renderClassList()
            }
            <ListItem
              title={this.props.locale.profile.text.settings}
              leftIcon={{name: 'settings'}}
              onPress={() => {this.props.navigation.navigate('Settings')}}
            />        
          </List>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container}>

          {this.renderHeader(this.props.isLoggedIn)}

          <List containerStyle={styles.contentContainer}>
            {
              this.props.user.userRole == 'tutor' &&
              <ListItem
                title={this.props.locale.profile.text.switchMode[this.props.appType]}
                leftIcon={{name: 'swap-horiz'}}
                onPress={() => this.props.setAppType(this.props.appType == 'tutor'? 'learner' : 'tutor')}
              />
            }
            {
              this.renderClassList()
            }
            <ListItem
              title={this.props.locale.profile.text.settings}
              leftIcon={{name: 'settings'}}
              onPress={() => {this.props.navigation.navigate('Settings')}}
            />        
          </List>
        </ScrollView>
      )
    }
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
    backgroundColor: '#efeff3',
    alignItems: 'center',
  },
  nonLoginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 40,
    paddingVertical: 20,
    alignItems: 'center'
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    //alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 40,
  },
  contentContainer: {
    width: '100%',
    marginTop: 40,
  },
  chevronContainer: {
    paddingRight: 10,
    position: 'absolute',
    right: 0,
    alignSelf: 'center'
  },
  username: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 20
  },
  avatarContainer: {
    // marginTop: '10%',
    // marginBottom: '5%',
    backgroundColor: '#eee'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  button: {
    paddingVertical: 15,
    width: width * 0.8,
    backgroundColor: '#41B252', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
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
