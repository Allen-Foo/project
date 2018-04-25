import React from 'react';
import { Alert, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { List, ListItem } from 'react-native-elements';
import { setLanguage } from '../../redux/actions';


class LanguageScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      key: 'en'
    }
  }

  componentDidMount() {
    this.setState({key: this.props.languageKey})
  }

  componentWillReceiveProps(nextProps) {
    // if change the language, will show some message to notify user
    // add go back 
    if(nextProps.languageKey !== this.props.languageKey) {
      Alert.alert(
        nextProps.locale.language.message.changeLanguage,
        null,
        [{text: nextProps.locale.common.okMsg, onPress: () => this.props.navigation.goBack()}],
      )
    }
  }

  changeKey = (key) => {
    this.setState({key})
    this.props.changeLanguage(key)
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{width: '100%', marginTop: 0}}>
          <Item currentKey={this.state.key} changeKey={this.changeKey} title={'English'} languageKey={'en'} />
          <Item currentKey={this.state.key} changeKey={this.changeKey} title={'繁体中文'} languageKey={'zh_hant'} />
          <Item currentKey={this.state.key} changeKey={this.changeKey} title={'简体中文'} languageKey={'zh_hans'} />
        </List>
      </View>
    );
  }
}

const Item = props => {
  const { title, languageKey, currentKey, changeKey } = props;
  return (
    <ListItem
      containerStyle={styles.itemContainer}
      title={title}
      rightIcon={{
        name: currentKey == languageKey ? 'radio-button-checked' : 'radio-button-unchecked', 
        color: Colors.tintColor
      }}
      onPress={() => {changeKey(languageKey)}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    languageKey: state.language.key
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (lang) => dispatch(setLanguage(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen)