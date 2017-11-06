import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import Tutor from '../../components/Tutor';


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
      <View style={styles.container}>
        {
          mockData.map((data, index) => (
            <Tutor key={index} data={data} />
          ))
        }
      </View>
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

export default connect(mapStateToProps)(FavouriteScreen)