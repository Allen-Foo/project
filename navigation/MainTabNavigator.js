import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import NewsFeedScreen from '../screens/NewsFeedScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

export default TabNavigator(
  {
    NewsFeed: {
      screen: NewsFeedScreen,
    },
    History: {
      screen: HistoryScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Schedule: {
      screen: ScheduleScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'NewsFeed':
            iconName = Platform.OS === 'ios'
              ? `ios-paper${focused ? '' : '-outline'}`
              : 'md-paper';
            break;
          case 'History':
            iconName = Platform.OS === 'ios'
              ? `ios-heart${focused ? '' : '-outline'}`
              : 'md-heart';
            break;
          case 'Search':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'md-search';
            break;
          case 'Schedule':
            iconName = Platform.OS === 'ios'
              ? `ios-calendar${focused ? '' : '-outline'}`
              : 'md-calendar';
            break;
          case 'Profile':
            iconName = Platform.OS === 'ios'
              ? `ios-contact${focused ? '' : '-outline'}`
              : 'md-contact';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
