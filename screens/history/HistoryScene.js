import React from 'react';

import Colors from '../../constants/Colors';
import HistoryScreen from './HistoryScreen';
import FavouriteScreen from './FavouriteScreen';
import { TabNavigator, TabBarTop } from 'react-navigation';


const HistoryScene = TabNavigator({
  History: {
    screen: HistoryScreen,
  },
  Favourite: {
    screen: FavouriteScreen,
  },
}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    activeBackgroundColor: Colors.tintColor,
    inactiveTintColor: 'grey',
    inactiveBackgroundColor: '#fff',
    // upperCaseLabel: false,
    // Style object for the tab label
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    // Style object for the tab
    tabStyle: {
      // width: '50%',
    },
    // Style object for the tab indicator (line at the bottom of the tab).
    indicatorStyle: {
      flex: 0,
      //width: '100%',
      //backgroundColor: 'red',
      borderWidth: 1,
      borderColor: Colors.tintColor,
      borderRadius: 10
    },
    // Style object for the tab bar
    style: {
      backgroundColor: '#fff',
    },
  },
});

export default HistoryScene;