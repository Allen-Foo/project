import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { Slideshow, Spinner} from '../../components';
import Colors from '../../constants/Colors';

import { mockData } from '../../constants/mockData';
import { connect } from 'react-redux';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { applyClass } from '../../redux/actions';

class PaymentScreen extends React.Component {

handleSubmit = () => {
    // console.warn('rest', rest)
    this.props.applyClass(
      this.props.navigation.state.params.classId,
      this.props.navigation.state.params.userId
    )
    this.props.navigation.navigate('AppliedClassNoti')
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    // console.warn('classId', this.props.navigation.state.params.classId)
    // console.warn('userId', this.props.navigation.state.params.userId)

    let { locale } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: 18 }}>{locale.payment.text.paymentMethod}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{this.handleSubmit()}}>
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
          { this.props.isLoading && <Spinner intensity={30}/> }
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
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    searchClassSuccess: state.classes.searchClassSuccess,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  applyClass,
})(PaymentScreen)
