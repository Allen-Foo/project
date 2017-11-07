import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';


class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
    tabBarLabel: 'Favourite',
    headerLeft: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={mockData.tutor}
        keyExtractor={(item, index) => (item.avatar)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Tutor data={item} />
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
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(FavouriteScreen)