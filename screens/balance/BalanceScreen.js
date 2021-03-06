import React from 'react';
import { 
  Dimensions,
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Alert,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';

import { SocialIcon } from 'react-native-elements';

import { Spinner, Toast } from '../../components';
import { getRevenue } from '../../redux/actions';
import { MaterialIcons} from '@expo/vector-icons';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

const { height, width } = Dimensions.get('window')


class BalanceScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'history'
  // };
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
    if (screenProps.appType == 'tutor') {
      headerTintColor = '#fff';
      backgroundColor = Colors.greyColor;
    }
    return {
      tabBarLabel: screenProps.locale.balance.title,
      headerTitle: screenProps.locale.balance.title,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  componentWillMount() {
    this.props.getRevenue(this.props.user.userId, this.props.user.userRole);
  }

  render() {
    let {locale, fetchErrorMsg} = this.props;

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{marginRight: 15, paddingTop: 10, alignSelf: 'flex-end'}}
          onPress={() => this.props.navigation.navigate('WithdrawRecordScreen')}>
          <MaterialIcons
            name={'event-note'}
            size={25}
            color={'#555'}
          />
        </TouchableOpacity>

        <Text style= {styles.title}> {locale.balance.title} </Text>

        <View
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
          }}
          style={{
            width: '84%',
            height: width*0.84,
            backgroundColor: Colors.tintColor,
            borderRadius: width*0.42,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <Text style= {styles.amount}> {'$' + this.props.revenue} </Text>

        </View>
        <Text style= {styles.upToText}> {locale.balance.pending + '$' + this.props.pendingRevenue} </Text>
         <TouchableOpacity 
            style={styles.button}
            onPress = {() => {this.props.navigation.navigate('WithdrawScreen')}}
          >
            <Text style={styles.buttonText}>
              {locale.balance.withdraw}
            </Text>
        </TouchableOpacity>
        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
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
  title: {
    marginBottom: 30,
    fontSize: 30,
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  buttonText: {
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 25,
    color: Colors.tintColor,
  },
  circle: {
    width: 200,
    height: 200,
    backgroundColor: Colors.tintColor,
    borderRadius: 200/2,
    alignItems: 'center',
  },
  amount: {
    fontSize: 60,
    color: '#fff',
    alignItems: 'center',
  },
  upToText: {
    // marginTop: 30,
    // marginBottom: 30,
    marginRight: 30,
    fontSize: 18,
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.tutor.isLoading,
    revenue: state.tutor.revenue,
    pendingRevenue: state.tutor.pendingRevenue,
    user : state.userProfile.user,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  getRevenue
})(BalanceScreen)
