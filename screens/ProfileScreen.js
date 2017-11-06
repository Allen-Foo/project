import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import Colors from '../constants/Colors';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { List, ListItem } from 'react-native-elements'

const list = [
  {
    title: 'Comments',
    icon: 'comment',
  },
  {
    title: 'Notification',
    icon: 'notifications',
  },
  {
    title: 'Apply to be a tutor',
    icon: 'people',
  },
  {
    title: 'Settings',
    icon: 'settings'
  }
]

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginContainer}>
          <Avatar
            large
            rounded
            icon={{name: 'account-box'}}
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainer}
          />
          <Text style={{color: '#fff'}}> 
            {this.props.locale.profile.text.login}
          </Text>

          <View style={styles.socialContainer}>
            <SocialIcon onPress={() => {}} name={'facebook'} />
            <SocialIcon onPress={() => {}} name={'google-plus'} />
            <SocialIcon onPress={() => {}} name={'wechat'} />
          </View>
        </View>

        <List containerStyle={{width: '90%'}}>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{name: item.icon}}
              onPress={() => {this.props.navigation.navigate('Settings')}}
            />
          ))
        }
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
    locale: state.language.locale
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
});

export default connect(mapStateToPorps)(ProfileScreen)
