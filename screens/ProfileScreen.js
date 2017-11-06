import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { setLanguage } from '../redux/actions';
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
            containerStyle={{marginTop: '10%', marginBottom: '5%', backgroundColor: '#eee'}}
          />
          <Text style={{color: '#fff'}}> 
            {this.props.locale.profile.text.login}
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: '5%'}}>
            <SocialIcon onPress={() => {}} name={'facebook'} />
            <SocialIcon onPress={() => {}} name={'google-plus'} />
            <SocialIcon onPress={() => {}} name={'wechat'} />
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <Text onPress={()=>{
            this.props.changeLanguage('en')
            Alert.alert('You have successfully change the language')
          }}>
            {'English     '}  
          </Text>
          <Text onPress={()=>{
            this.props.changeLanguage('zh_hans')
            Alert.alert('语言设置已更改')
          }}>
            {'简体中文     '}
          </Text>
          <Text onPress={()=>{
            this.props.changeLanguage('zh_hant')
            Alert.alert('語言設置已更改')
          }}>
            繁體中文
          </Text>
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (lang) => dispatch(setLanguage(lang))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
  },
  socialContainer: {

  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(ProfileScreen)
