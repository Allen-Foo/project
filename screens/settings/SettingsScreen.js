import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';

import { List, ListItem } from 'react-native-elements';
import { Constants } from 'expo'


class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.settings.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
          <ListItem
            containerStyle={styles.itemContainer}
            title={this.props.locale.settings.language}
            onPress={() => {this.props.navigation.navigate('Language')}}
          />
          <ListItem
            containerStyle={styles.itemContainer}
            title={this.props.locale.settings.version}
            rightTitle={'0.0.1'}
            rightTitleStyle={{fontSize: 16}}
            hideChevron
            onPress={() => {this.props.navigation.navigate('ApiTest')}}
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
  listContainer: {
    width: '100%',
    marginTop: 0,
  },
  itemContainer: {
    height: '20%',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(SettingsScreen)