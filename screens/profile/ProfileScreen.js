import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { List, ListItem } from 'react-native-elements'


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
          <ListItem
            title={'Comments'}
            leftIcon={{name: 'comment'}}
            onPress={() => {this.props.navigation.navigate('Comments')}}
          />
          <ListItem
            title={'Notifications'}
            leftIcon={{name: 'notifications'}}
            onPress={() => {this.props.navigation.navigate('Notifications')}}
          />
          <ListItem
            title={'Apply to be a tutor'}
            leftIcon={{name: 'people'}}
            onPress={() => {this.props.navigation.navigate('Apply to be a tutor')}}
          />
          <ListItem
            title={'Settings'}
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