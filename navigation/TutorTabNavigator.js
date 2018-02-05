import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import ClassListScreen from '../screens/class/ClassListScreen';


export default MainTab = TabNavigator(
  {
    ClassList: {
      screen: ClassListScreen,
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
          case 'ClassList':
            iconName = Platform.OS === 'ios'
              ? `ios-paper${focused ? '' : '-outline'}`
              : 'md-paper';
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
      showLabel: true, // this will control whether show the tab icon label or not
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.tabIconDefault,
      style: {
        backgroundColor: '#555',
      },
    },
  }
);
