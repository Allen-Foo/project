// import RxJS operators
import 'rxjs';

import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor} from './configureStore';
import { Provider } from 'react-redux';
import axios from 'axios';
import appSecrets from './appSecrets';
import moment from 'moment';
import Colors from './constants/Colors';

import PopupDialog, { SlideAnimation, ScaleAnimation, FadeAnimation, DialogButton } from 'react-native-popup-dialog';

import { SafeAreaView } from 'react-navigation';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

const scaleAnimation = new ScaleAnimation({
  toValue: 0, // optional
  useNativeDriver: true, // optional
})

const { width, height } = Dimensions.get('window')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 0,
      isLoadingComplete: false,
      imageUrl: '',
      redirectUrl: null,
    }
  }

  componentDidMount() {
    let baseURL = appSecrets.aws.apiURL;
    axios({
      method: 'post',
      url: baseURL + '/getAdvertisement',
    }).then(res => {
      if (res.data && res.data.startedAt 
          && moment().isAfter(moment(res.data.startedAt))
          && moment().isBefore(moment(res.data.finishedAt))
      ) {
        this.setState({imageUrl: res.data.imgUrl, redirectUrl: res.data.url})
        this.showDialog()
      }
    })
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  showDialog() {
    this.popupDialog.show();
    this.setState({delay: 6})
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.state.delay > 0) {
          this.setState({delay: this.state.delay - 1});
        } else if (this.state.delay == 0) {
          this.popupDialog.dismiss();
        }
      }, 1000);
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
          <PopupDialog
            width={0.9 * width}
            height={1.2 * width}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation={scaleAnimation}
            animationDuration={500}
            actions={[
              <DialogButton
                text={'Close'}
                dismissOnTouchOutside={false}
                onPress={() => {
                  this.popupDialog.dismiss();
                }}
                buttonStyle={buttonStyle}
                textStyle={{fontSize: 15, color: '#fff'}}
                textContainerStyle={{paddingVertical: 15}}
                key="button-1"
              />,
            ]}
          >
            <Image
              source={{uri: this.state.imageUrl}}
              style={{width: width * 0.9, height: width * 1.2}}
            />
            <View style={styles.timeContainer}>
              <Text>
                {this.state.delay}
              </Text>
            </View>
          </PopupDialog>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    if (Platform.OS === 'android') {
      SafeAreaView.setStatusBarHeight(0);
    }

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const buttonStyle = {
  backgroundColor: '#fff',
  width: 0.9 * width,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  backgroundColor: Colors.tintColor,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  timeContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
  }
});
