import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, View, Text } from 'react-native';
import { setLanguage } from '../redux/actions';
import { Avatar, SocialIcon } from 'react-native-elements';
import Colors from '../constants/Colors';

import { connect } from 'react-redux';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerLeft: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          large
          rounded
          icon={{name: 'account-box'}}
          onPress={() => this.props.navigation.navigate('Login')}
          activeOpacity={0.7}
          containerStyle={{ marginTop: 25, marginBottom: 10}}
        />
        <Text> 
          {this.props.locale.profile.text.login}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <SocialIcon
            type='facebook'
            light
            raised={false}
          />
          <SocialIcon
            type='google-plus-official'
            light
            raised={false}
          />
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
      </ScrollView>
    );
  }
}


const mapStateToPorps = (state) => {
  return {
    locale: state.language
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
});

export default connect(mapStateToPorps, mapDispatchToProps)(ProfileScreen)
