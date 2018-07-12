import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
// import { Avatar } from 'react-native-elements';
import { Avatar } from '../../components';

import { connect } from 'react-redux';
import { FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window')


import Colors from '../../constants/Colors';

import { signInFacebook, signInGoogle, setAppType } from '../../redux/actions';

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
    let backgroundColor = Colors.tintColor;
    if (screenProps.appType == 'tutor') {
      backgroundColor = Colors.greyColor;
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

  renderHeader() {
    let avatar = <Avatar large/>
    if (this.props.user && this.props.user.avatarUrl != 'null') {
      avatar = <Avatar large uri={this.props.user.avatarUrl} />
    }

    if (this.props.user) {
      return (
        <TouchableOpacity style={[styles.loginContainer,{flexDirection: 'row'}]} onPress={() => this.props.navigation.navigate('ProfileSetting')}>
          { avatar }
          <View>
            <Text style={styles.name}>{this.props.user.name}</Text>
            <Text style={styles.username}>{'ID: ' + this.props.user.username}</Text>
          </View>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={18}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.loginContainer,{flexDirection: 'row'}]} onPress={() => this.props.navigation.navigate('Signin')}>
          <Avatar large/>
          <Text style={styles.name}>{this.props.locale.profile.text.signUpOrLogin}</Text>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={18}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderClassList() {
    if (!this.props.user){
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.learner}
          leftIcon={{name: 'class'}}
          iconType = 'MaterialIcons'
          onPress={() => {this.props.navigation.navigate('Signin')}}
        />
      )
    } else if (this.props.appType == 'learner' || this.props.user.userRole == 'learner') {
      // Learner mode
      return (
        <ListItem
          title={this.props.locale.profile.text.viewClasses.learner}
          leftIcon={{name: 'class'}}
          iconType = 'MaterialIcons'
          onPress={() => {this.props.navigation.navigate('AppliedClassList')}}
        />
      )
    } else if (this.props.user.userRole == 'company') {
      // Company mode
      return (
        <View>
          <ListItem
            title={this.props.locale.profile.text.viewClasses.tutor}
            leftIcon={{name: 'class'}}
            iconType = 'MaterialIcons'
            onPress={() => {this.props.navigation.navigate('ClassList')}}
          />
          <ListItem
            title={this.props.locale.profile.text.balance}
            leftIcon={{name: 'cash-multiple'}}
            iconType = 'MaterialCommunityIcons'
            onPress={() => {this.props.navigation.navigate('BalanceScreen')}}
          />  
          <ListItem
            title={this.props.locale.profile.text.manageTutor}
            leftIcon={{name: 'group'}}
            iconType = 'MaterialIcons'
            onPress={() => {this.props.navigation.navigate('ManageTutor')}}
          />
        </View>
      )
    } else {
      // Tutor mode
      return (
        <View>
          <ListItem
            title={this.props.locale.profile.text.checkCoins.tutor}
            leftIcon={{name: 'coin'}}
            iconType = 'MaterialCommunityIcons'
            onPress={() => {this.props.navigation.navigate('Coin')}}
            useCommunityIcon={true}
          />
          <ListItem
            title={this.props.locale.profile.text.viewClasses.tutor}
            leftIcon={{name: 'class'}}
            iconType = 'MaterialIcons'
            onPress={() => {this.props.navigation.navigate('ClassList')}}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        { this.renderHeader() }

        <View style={styles.contentContainer}>
          {
            this.props.user && (this.props.user.userRole == 'company' || this.props.user.userRole == 'tutor') &&
            <ListItem
              title={this.props.locale.profile.text.switchMode[this.props.appType]}
              leftIcon={{name: 'swap-horiz'}}
              iconType = 'MaterialIcons'
              onPress={() => this.props.setAppType(this.props.appType == 'tutor'? 'learner' : 'tutor')}
            />
          }

          { this.renderClassList() }
          <ListItem
            title={this.props.locale.profile.text.settings}
            leftIcon={{name: 'settings'}}
            iconType = 'MaterialIcons'
            onPress={() => {this.props.navigation.navigate('Settings')}}
          />
        </View>
      </ScrollView>
    )
  }
}

const ListItem = props => {
  let { title, leftIcon, onPress, iconType } = props;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress()}
    >
      {
        iconType === 'MaterialIcons' && 
        <MaterialIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%', paddingRight: '7%'}}
        />
      }
      {
        iconType === 'MaterialCommunityIcons' && 
        <MaterialCommunityIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%', paddingRight: '7%'}}
        />
      }

      <Text style={styles.itemText}>{title}</Text>
      <Entypo
        name={"chevron-thin-right"}
        size={18}
        color={'#555'}
        style={styles.chevronRight}
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
  loginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 40,
  },
  contentContainer: {
    width: '100%',
    marginTop: 40,
  },
  chevronContainer: {
    position: 'absolute',
    right: '5%',
    alignSelf: 'center'
  },
  name: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 20,
  },
  username: {
    color: '#999',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 12,
  },
  avatarContainer: {
    backgroundColor: '#eee'
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#555',
    borderBottomColor: '#555',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 17
  },
  chevronRight: {
    position: 'absolute',
    right: '5%'
  }
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    // isLoggedIn: state.socialLogin.isLoggedIn,
    user: state.userProfile.user,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  signInFacebook,
  signInGoogle,
  setAppType,
})(ProfileScreen)
