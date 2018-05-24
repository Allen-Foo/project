import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import { applyClass, renewAppliedClass } from '../../redux/actions';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Spinner, Toast } from '../../components';

import appSecrets from '../../appSecrets';

class PaymentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showWebView: false,
      paypalUrl: null,
    }
  }

  handleSubmit = () => {
    // console.warn('rest', rest)
    this.props.applyClass(
      this.props.navigation.state.params.classId,
      this.props.user.userId
    )
    this.props.navigation.navigate('AppliedClassNoti')
  }

  handlePressPaypal = () => {
    let classInfo = this.props.navigation.state.params.classInfo
    let baseURL = appSecrets.aws.apiURL

    this.setState({isLoading: true})
    axios({
      method: 'post',
      url: baseURL + '/payment',
      data: {
        name: classInfo.title,
        sku: classInfo.classId,
        price: classInfo.fee,
        curr: "HKD",
        quan:1, 
        desc: 'null',
        userId: this.props.user.userId
      }
    }).then(res => {
      this.setState({
        isLoading: false,               
        showWebView: true,
        paypalUrl: res.data.redirect_url
      })
      // console.warn('res', res.data)
    }).catch(err => {
      this.setState({isLoading: false})
    })
  }

  handleNavigationStateChange = (navState) => {
    if (navState.url.includes('paymentSuccess') && navState.title =='') {
      // console.warn('success')
      // console.warn('url', navState.url, navState.title, navState.jsEvaluationValue)
      this.setState({
        showWebView: false,
        paypalUrl: null,
      }, () => {
        this.props.renewAppliedClass()
        this.props.navigation.navigate('AppliedClassNoti')
      })
    }
  }

  render() {

    let { locale } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: 18 }}>{locale.payment.text.paymentMethod}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{this.handlePressPaypal()}}>
            <Image
              source={require('../../assets/payment_icon/paypal_logo.png')}
              style={styles.paymentLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{this.handleSubmit()}}>
            <Image
              source={require('../../assets/payment_icon/wechatpay_logo.png')}
              style={styles.paymentLogo}
            />
          </TouchableOpacity>
        </View>
        {
          this.state.showWebView &&
          <View style={styles.webview}>
            <WebView
              source={{uri: this.state.paypalUrl}}
              style={{margin: 20, borderWidth: 1}}
              onNavigationStateChange={this.handleNavigationStateChange}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showWebView: false,
                  paypalUrl: null,
                })
              }}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons
                name={"close-circle"}
                size={25}
                color={Colors.tintColor}
              />
            </TouchableOpacity> 
          </View>
        }
        { this.state.isLoading && <Spinner intensity={30}/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
  },
  paymentLogo: {
    width: '30%',
    height: '25%',
  },
  button: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'grey',
  },
  closeButton: {
    position: 'absolute',
    top: 7.5,
    left: 7.5,
    backgroundColor: 'transparent',
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.socialLogin.user,
    languageKey: state.language.key,
    locale: state.language.locale,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  applyClass,
  renewAppliedClass,
})(PaymentScreen)
