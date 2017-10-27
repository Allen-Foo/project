import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, View, Text } from 'react-native';
import { setLanguage } from '../redux/actions'

import { connect } from 'react-redux';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
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
            中文 
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
