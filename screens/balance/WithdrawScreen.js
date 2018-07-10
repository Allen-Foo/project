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
import { withdrawMoney } from '../../redux/actions';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

const { height, width } = Dimensions.get('window')


class WithdrawScreen extends React.Component {
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
      tabBarLabel: screenProps.locale.withdraw.title,
      headerTitle: screenProps.locale.withdraw.title,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      bankAccountName: '',
      bankName: '',
      bankAccount: '',
      amount: '',
    }
  }

  confirmedWithdraw = () => {
    let {bankAccountName, bankName, bankAccount, amount} = this.state

    this.props.navigation.popToTop()
    this.props.withdrawMoney({bankAccountName, bankName, bankAccount, amount})
  }

  validateInput () {
    if (isNaN(this.state.amount) || !this.state.amount) {
      Alert.alert('Invalid amount')
    }
    else if (parseInt(this.state.amount) < 100) {
      Alert.alert('Amount should greater than $100')
    }
    else if (!this.state.bankAccountName) {
      Alert.alert('Name cannot be empty!')
    }
    else if (!this.state.bankName) {
      Alert.alert('Bank name cannot be empty!')
    }
    else if (!this.state.bankAccount) {
      Alert.alert('Bank account cannot be empty!')
    }
    else {
      let msg = this.props.locale.withdraw.text.bankAccountName + this.state.bankAccountName +'\n'
                + this.props.locale.withdraw.text.bankName + this.state.bankName +'\n'
                + this.props.locale.withdraw.text.bankAccount + this.state.bankAccount +'\n'
                + this.props.locale.withdraw.text.amount + this.state.amount +'\n'


      Alert.alert(
        this.props.locale.withdraw.text.confirm,
        msg,
        [
          {text: this.props.locale.withdraw.text.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: this.props.locale.withdraw.text.confirm, onPress: this.confirmedWithdraw},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    let {locale, fetchErrorMsg} = this.props;

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    let date = new Date ();

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text>{locale.withdraw.text.bankAccountName}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(bankAccountName) => this.setState({bankAccountName})}
            value={this.state.bankAccountName}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>{locale.withdraw.text.bankName}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(bankName) => this.setState({bankName})}
            value={this.state.bankName}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>{locale.withdraw.text.bankAccount}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(bankAccount) => this.setState({bankAccount})}
            value={this.state.bankAccount}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>{locale.withdraw.text.amount}</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={(amount) => this.setState({amount})}
            value={this.state.amount}
          />
        </View>
       <TouchableOpacity 
          style={styles.button}
          onPress={()=>{this.validateInput()}}
        >
          <Text style={styles.buttonText}>
            {locale.withdraw.title}
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
    backgroundColor: '#e4e4e4',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    height: 40, 
    width: '80%',
    backgroundColor: Colors.tintColor, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
  },
  buttonText: {
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 25,
    color: '#fff',
  },
  contentContainer: {
    width: '90%',
    paddingHorizontal: 20,
    paddingTop: 30,
    alignSelf: 'center', 

  },
  textInput: {
    paddingVertical: 10, 
    borderColor: 'grey', 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.tutor.isLoading,
    revenue: state.tutor.revenue,
    userId: state.userProfile.user.userId,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  withdrawMoney
})(WithdrawScreen)
