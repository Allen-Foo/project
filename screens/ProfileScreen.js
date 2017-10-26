import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, View, Text } from 'react-native';
import { languageKeyName } from '../lib/locale';


export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text onPress={()=>{
            setLanguage('en', 'You have successfully change the language')
          }}>
            {'English     '}  
          </Text>
          <Text onPress={()=>{
            setLanguage('zh_hans', '语言设置已更改')
          }}>
            中文 
          </Text>
        </View>
      </View>
    );
  }
}

function setLanguage(language, message) {
    AsyncStorage.setItem(languageKeyName, language, () => {
      Alert.alert(message)
    })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
