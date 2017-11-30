import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import NewsFeedScreen from '../screens/newsFeed/NewsFeedScreen';
import HistoryScene from '../screens/history/HistoryScene';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';

const MainTab = TabNavigator(
  {
    NewsFeed: {
      screen: (props) => {
        const { screenProps, ...otherProps } = props;
        return <NewsFeedScreen {...props.screenProps} {...otherProps} />
      }
    },
    History: {
      screen: HistoryScene,
    },
    Search: {
      screen: SearchScreen,
    },
    Schedule: {
      screen: ScheduleScreen,
    },
    Profile: {
      screen: (props) => {
        const { screenProps, ...otherProps } = props;
        return <ProfileScreen {...props.screenProps} {...otherProps} />
      }
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
    tabBarOptions: {
      showLabel: false, // this will control whether show the tab icon label or not
      // labelStyle: {
      //   fontSize: 12,
      //   color: '#fff'
      // },
      // style: {
      //   backgroundColor: '#555',
      // },
    },
  }
);

export default (props) => {
  const { screenProps, rootNavigator, ...otherProps } = props;

  return <MainTab screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
};
