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

import { Separator, Spinner, Toast, RecordItem } from '../../components';
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


    if (this.props.isLoading) {
      return (<Spinner />)
    }
    else if (withdrawnList && withdrawnList.length > 0) {
      return (
        <View style = {styles.container}>
          <FlatList 
              data={withdrawnList}
              keyExtractor={(item) => (item.withdrawnId)}
              renderItem={({item}) => {
                return (
                  <View style={{width: width,}}>
                      <RecordItem
                      icon = 'cash-multiple'
                      data = {item}
                      progress = {item.progress}
                      date={item.createdAt}
                      amount={'$' + item.requestAmount}
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
      return (<View />)
    }
    
  }
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
