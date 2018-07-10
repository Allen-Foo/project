import React from 'react';
import { 
  Dimensions,
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Image,
  TextInput, 
  Alert,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { Spinner, Toast } from '../../components';
import { getRevenue } from '../../redux/actions';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

const { height, width } = Dimensions.get('window')


class WithdrawRecordScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
    if (screenProps.appType == 'tutor') {
      headerTintColor = '#fff';
      backgroundColor = Colors.greyColor;
    }
    return {
      tabBarLabel: screenProps.locale.withdrawRecord.title,
      headerTitle: screenProps.locale.withdrawRecord.title,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  componentWillMount() {
    // this.props.getRevenue(this.props.userId);
  }

  render() {
    // let {locale, fetchErrorMsg} = this.props;
    let { locale, fetchErrorMsg } = this.props

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    return (
      <View style = {styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
          >

          <View style={styles.textContainers}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              <View 
                style= {{
                  width: 60,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: '#000',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'cash-multiple'}
                    size={25}
                    color={'#555'}>

                  </MaterialCommunityIcons>
                </View>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: 'absolute',
                    right: 2,
                    bottom: 2,
                  }}
                  source={require('../../assets/images/question.png')}
                />
              </View>
            
              <Text style={styles.text}>
                {locale.withdraw.title}
              </Text>
              <Text style={styles.amount}>
                {'$99999'}
              </Text>
              <Text style={styles.date}>
                {'2010-00-00\n00:00:00'}
              </Text>

              <View
                onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                }}
                style={styles.statusBackground}>
                <Text style={styles.status}>
                  {locale.withdrawRecord.text.processing}
                </Text>
              </View>
            </View>
            
          </View>

        </ScrollView>
        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textContainers: {
    borderBottomWidth: 1,
    borderColor: 'grey', 
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'
  },
  title: {
    paddingVertical: 15, 
    width: '30%',
    fontSize: 12,
    backgroundColor: '#FFF',
    paddingLeft: 15,
  },
  text: {
    width:75,
    paddingVertical: 15, 
    fontSize: 16,
    backgroundColor: '#FFF',

  },
  date: {
    paddingVertical: 15, 
    fontSize: 12,
    color: '#777',
    paddingLeft: 5,
  },
  amount: {
    width:70,
    paddingVertical: 15, 
    fontSize: 16,
    paddingLeft: 5,
  },
  statusBackground: {
    width: 75,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#3b4f9d',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
  },
  status: {
    justifyContent: 'center',
    fontSize: 12,
    color: '#3b4f9d',
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    // locale: state.language.locale,
    // isLoading: state.tutor.isLoading,
    // revenue: state.tutor.revenue,
    // userId: state.userProfile.user.userId,
    // fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    // fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,

    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    
    isVerified: state.socialLogin.isVerified,
    verfiedErrorMsg: state.socialLogin.verfiedErrorMsg,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
    showMFAPrompt: state.socialLogin.showMFAPrompt,

    profile: state.userProfile.profile,
    selfIntro: state.tutor.selfIntro,
    profession: state.tutor.profession,
    experience: state.tutor.experience,
    achievement: state.tutor.achievement,
  }
}

export default connect(mapStateToProps, {
  getRevenue
})(WithdrawRecordScreen)
