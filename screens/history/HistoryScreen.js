import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';


class HistoryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.history.history,
      headerTitle: screenProps.locale.history.title,
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={mockData.class}
        keyExtractor={(item, index) => (item.address)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Text> {item.address} </Text>
              <Separator />
            </View>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(HistoryScreen)