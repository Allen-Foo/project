import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import { List, ListItem } from 'react-native-elements';


class LanguageScreen extends React.Component {
  static navigationOptions = {
    title: 'Language',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      locale: 'en'
    }
  }

  componentDidMount() {
    this.setState({locale: this.props.locale})
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{width: '100%', marginTop: 0}}>
          <ListItem
            containerStyle={{height: '15%', justifyContent: 'center'}}
            title={'English'}
            rightIcon={{
              name: this.state.locale == 'en' ? 'radio-button-checked' : 'radio-button-unchecked', 
              color: Colors.tintColor
            }}
            onPressRightIcon={() => {this.setState({locale: 'en'})}}
          />
          <ListItem
            containerStyle={{height: '15%', justifyContent: 'center'}}
            title={'繁体中文'}
            rightIcon={{
              name: this.state.locale == 'zh_hant' ? 'radio-button-checked' : 'radio-button-unchecked', 
              color: Colors.tintColor
            }}
            onPressRightIcon={() => {this.setState({locale: 'zh_hant'})}}
          />
          <ListItem
            containerStyle={{height: '15%', justifyContent: 'center'}}
            title={'简体中文'}
            rightIcon={{
              name: this.state.locale == 'zh_hans' ? 'radio-button-checked' : 'radio-button-unchecked', 
              color: Colors.tintColor
            }}
            onPressRightIcon={() => {this.setState({locale: 'zh_hans'})}}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  console.warn('state', state)
  return {
    locale: state.language
  }
}

export default connect(mapStateToProps)(LanguageScreen)