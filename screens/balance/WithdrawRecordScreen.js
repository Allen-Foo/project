import React from 'react';
import { 
  Dimensions,
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Image,
  FlatList,
  TextInput, 
  Alert,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { Separator, Spinner, Toast } from '../../components';
import { getWithdrawRecord } from '../../redux/actions';
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

  constructor(props) {
    super(props);
    this.state = {
      withdrawnList: [],
      isLastRecord: false,
    }
  }

  componentWillMount() {
    this.props.getWithdrawRecord(this.props.userId, null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.withdrawnList && nextProps.withdrawnList.length > 0 && nextProps.withdrawnList !== this.state.withdrawnList) {
      this.setState({withdrawnList: nextProps.withdrawnList})
    }
  }

  render() {
    // let {locale, fetchErrorMsg} = this.props;
    let { locale, fetchErrorMsg, withdrawnList } = this.props

    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    if (withdrawnList && withdrawnList.length > 0) {
      return (
        <View style = {styles.container}>
          <FlatList 
              data={withdrawnList}
              keyExtractor={(item) => (item.withdrawnId)}
              renderItem={({item}) => {
                return (
                  <View style={{width: width, height: 80, borderWidth:1}}>
                      <WithdrawnReocrd
                      locale = {locale}
                      icon = 'cash-multiple'
                      status = {item.status}
                      date={item.createdAt}
                      amount={'$' + item.withdrawnAmount}
                      // onPress= {()=>this.props.navigation.navigate('WithdrawDetailScreen', {item: item})}
                       />
                  </View>
                )
              }}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) => {
                this.shouldLoadMore = true
              }}
              ListFooterComponent={this.renderFooter}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false;}}
              onMomentumScrollEnd={() => {
                if (this.shouldLoadMore && this.props.isLastRecord == false) {
                  this.loadMoreItems();
                  this.shouldLoadMore = false
                }
              }}
            >

            <View style={styles.textContainers}>
              
            </View>

          </FlatList>
          <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
        </View>
      );
    }
    else {
      return (<Spinner />)
    }
    
  }
}

const WithdrawnReocrd = props => {
  const { locale, icon, status, date, amount, onPress } = props;

  tDate = new Date (date);
  let dateString = tDate.getDate() + '/' + (tDate.getMonth()+1) + '/' + tDate.getFullYear() + '\n'
                   + tDate.getHours() + ':' + tDate.getMinutes() + ':' + tDate.getSeconds(); 

  let statusIcon, statusColor, statusText;
  if (status === 'approved') {
    statusIcon = require('../../assets/images/tick.png');
    statusColor = '#65B458';
    statusText = locale.withdrawRecord.text.approved;
  }
  else if (status === 'rejected') {
    statusIcon = require('../../assets/images/cross.png');
    statusColor = '#D23731';
    statusText = locale.withdrawRecord.text.rejected;
  }
  else {
    statusIcon = require('../../assets/images/question.png');
    statusColor = '#3B4F9E';
    statusText = locale.withdrawRecord.text.processing;
  }

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPress}
    >

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
            name={icon}
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
          source={statusIcon}
        />
      </View>
    
      <Text style={styles.text}>
        {locale.withdraw.title}
      </Text>
      <Text style={styles.amount}>
        {amount}
      </Text>
      <Text style={styles.date}>
        {dateString}
      </Text>

      <View
        onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout;
        }}
        style={{
          width: 75,
          height: 30,
          backgroundColor: '#fff',
          borderRadius: 12,
          borderColor: statusColor,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 8,
        }}>
        <Text style={{
          justifyContent: 'center',
          fontSize: 12,
          backgroundColor: 'transparent',
          color: statusColor
        }}>
          {statusText}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width:100,
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
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    isLoading: state.tutor.isLoading,
    userId: state.userProfile.user.userId,
    withdrawnList: state.tutor.withdrawnList,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
    fetchErrorLastUpdate: state.socialLogin.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  getWithdrawRecord
})(WithdrawRecordScreen)
