import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// import Home from '../screens/home/HomeScreen';
import Signin from '../screens/login/SigninScreen';
import Settings from '../screens/settings/SettingsScreen';
import Comments from '../screens/comments/CommentsScene';
import ApiTest from '../screens/settings/ApiTestScreen';
import Language from '../screens/settings/LanguageScreen';
import ProfileSetting from '../screens/settings/ProfileSettingScreen';
import TutorDetail from '../screens/detail/TutorDetail';
import SignUp from '../screens/login/SignUpScreen';
import PreSignUp from '../screens/login/PreSignUpScreen';
import ForgotPassword from '../screens/login/ForgotPasswordScreen';
import ChangePassword from '../screens/settings/ChangePasswordScreen';

import Category from '../screens/createClass/CategoryScreen';
import Skill from '../screens/createClass/SkillScreen';
import TutionFee from '../screens/createClass/TutionFeeScreen';
import Calendar from '../screens/createClass/CalendarScreen';
import Repeat from '../screens/createClass/RepeatScreen';
import ClassAddressAutocomplete from '../screens/createClass/ClassAddressAutocomplete';
import ClassAddress from '../screens/createClass/ClassAddressScreen';
import ClassSummary from '../screens/createClass/ClassSummaryScreen';
import UploadPhoto from '../screens/createClass/UploadPhotoScreen';
import ClassDescription from '../screens/createClass/ClassDescriptionScreen';
import ClassType from '../screens/createClass/ClassTypeScreen';
import EditClass from '../screens/createClass/EditClassScreen';

import MainTabNavigator from './MainTabNavigator';
import TutorTabNavigator from './TutorTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import { WithAuth } from '../lib/Auth/Components';

const RootStackNavigator = StackNavigator(
  {
    // Home: {
    //   screen: Home,
    // }, 
    Main: {
      screen: MainTabNavigator
    },
    Signin: {
      screen: Signin
    },
    Settings: {
      screen: Settings,
    },
    Language: {
      screen: Language,
    },
    TutorDetail: {
      screen: TutorDetail,
    },
    Comments:{
      screen: Comments,
    },
    ApiTest: {
      screen: ApiTest
    },
    ProfileSetting: {
      screen: ProfileSetting
    },
    SignUp:{
      screen: SignUp,
    },
    PreSignUp: {
      screen: PreSignUp,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
    ChangePassword: {
      screen: ChangePassword,
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

const TutorStackNavigator = StackNavigator(
  {
    TutorMain: {
      screen: TutorTabNavigator
    },
    ProfileSetting: {
      screen: ProfileSetting
    },
    Signin: {
      screen: Signin
    },
    Settings: {
      screen: Settings,
    },
    Language: {
      screen: Language,
    },
    Category: {
      screen: Category,
    },
    Skill: {
      screen: Skill,
    },
    TutionFee: {
      screen: TutionFee,
    },
    Calendar: {
      screen: Calendar,
    },
    Repeat: {
      screen: Repeat,
    },
    ClassDescription: {
      screen: ClassDescription
    },
    ClassType: {
      screen: ClassType
    },
    ClassAddressAutocomplete: {
      screen: ClassAddressAutocomplete
    },
    ClassAddress: {
      screen: ClassAddress,
    },
    ClassSummary: {
      screen: ClassSummary,
    },
    EditClass: {
      screen: EditClass,
    },
    UploadPhoto: {
      screen: UploadPhoto
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    if (this.props.appType === 'tutor') {
      return <TutorStackNavigator screenProps={{ ...this.props }} />;
    } else {
      return <RootStackNavigator screenProps={{ ...this.props }} />;
    }
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToProps, null)(RootNavigator)
