import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, View, Text } from 'react-native';
import { setLanguage } from '../redux/actions';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          large
          rounded
          title='AF'
          onPress={() => console.warn("Works!")}
          activeOpacity={0.7}
          containerStyle={{ marginVertical: 115}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(null, mapDispatchToProps)(ProfileScreen)
