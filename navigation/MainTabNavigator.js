import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import NewsFeedScreen from '../screens/newsFeed/NewsFeedScreen';
import HistoryScene from '../screens/history/HistoryScene';
import FavouriteScreen from '../screens/history/FavouriteScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';

export default MainTab = TabNavigator(
  {
    NewsFeed: {
      screen: NewsFeedScreen
    },
    History: {
      screen: FavouriteScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Schedule: {
      screen: ScheduleScreen,
    },
    Profile: {
      screen: ProfileScreen
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
    tabBarComponent: ({ jumpToIndex, ...props }) => {
      return (
        <TabBarBottom
          {...props}
          jumpToIndex={index => {
            if ( index && (index === 1 || index === 3) && !props.screenProps.user) {
              props.navigation.navigate('Signin');
            } else {
              jumpToIndex(index);
            }
          }}
        />
      )
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: true, // this will control whether show the tab icon label or not
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.tabIconDefault,
      
      // style: {
        // backgroundColor: '#555',
      // },
    },
  }
);
