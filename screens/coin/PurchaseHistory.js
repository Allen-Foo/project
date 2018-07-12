import React from 'react';
import { Alert, AsyncStorage, FlatList, Picker, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window')
import { Separator, Spinner, Toast, ClassItem} from '../../components';


import Colors from '../../constants/Colors';

import { getCoinHistoryList } from '../../redux/actions';

class PurchaseHistoryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
   
    return {
      headerTitle: screenProps.locale.coin.text.purchasedHistory,
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#fff',
      },
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      showPicker: false
    }
  }

  static defaultProps = {
    isLoggedIn: false
  }

  componentWillMount() {
    this.props.getCoinHistoryList(this.props.user.userId, null)
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({chargeType: v})
    this.hidePicker()
  }

  renderHeader() {
    let { user, locale } = this.props;

    return (
      <View style={styles.header}>
        <View style={{alignItems: 'center', paddingBottom: '2%' }}>
          <View style={styles.timeLabel}>
            <Text> 2018 </Text>
          </View>
        </View>
        <View style={styles.title}>
          <Text> {this.props.locale.coin.text.time} </Text>
          <Text> {this.props.locale.coin.text.action} </Text>
          <Text> {this.props.locale.coin.text.coins} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  render() {
    let { coinHistoryList, locale } = this.props;
    if (coinHistoryList)
    coinHistoryList = coinHistoryList.sort(function(a,b) {
      var dateA = Date.parse(new Date(a.createdAt));
      var dateB = Date.parse(new Date(b.createdAt));
      return parseFloat(dateA) - parseFloat(dateB);
    })
    return (
      <View  style={styles.container}>
        { this.renderHeader() }

        { 
          this.state.showPicker &&
          <ChargeTypePicker
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            locale={locale}
            chargeType={this.state.chargeType}
          />
        }
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={coinHistoryList}
          keyExtractor={(item) => (item.coinHistoryId)}
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.listItem}>
                  <View style = {{width:40 , alignItems: 'flex-start'}}>
                    <Text> {new Date(item.createdAt).getDate() + '/' + (parseInt(new Date(item.createdAt).getMonth()) + 1)} </Text>
                  </View>
                  {this.props.languageKey === 'en' && <Text> {item.enAction} </Text>}
                  {this.props.languageKey === 'zh_hant' && <Text> {item.tcAction} </Text>}
                  {this.props.languageKey === 'zh_hans' && <Text> {item.scAction} </Text>}
                  <View style = {{width:40 , alignItems: 'flex-end'}}>
                    <Text> {item.gold} </Text>
                  </View>
                </View>
                <Separator />
              </View>
            )
          }}
        />
        { this.props.isLoading && <Spinner /> }
      </View>
    )
  }
}

class ChargeTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chargeType: props.chargeType || 'perLesson'
    }
  }

  render() {
    const { chargeType, locale, onCancel, onConfirm } = this.props;
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.chargeType)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>  
          }
        </View>
        <Picker
          selectedValue={this.state.chargeType}
          onValueChange={(itemValue) => this.setState({chargeType: itemValue})}>
          <Picker.Item label={locale.advancedSearch.text.perLesson} value='perLesson' />
          <Picker.Item label={locale.advancedSearch.text.perSemester} value='perSemester' />
        </Picker>
      </View>
    )
  }
}

const ListItem = props => {
  let { title, leftIcon, onPress, useCommunityIcon } = props;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress()}
    >
      {
        !useCommunityIcon &&
        <MaterialIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%', paddingRight: '7%'}}
        />
      }
      {
        useCommunityIcon &&
        <MaterialCommunityIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%', paddingRight: '7%'}}
        />
      }
      <Text style={styles.itemText}>{title}</Text>
      <Entypo
        name={"chevron-thin-right"}
        size={18}
        color={'#555'}
        style={styles.chevronRight}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#E4E4E4',
    // flex: 1,
    // backgroundColor: '#fff',
    // paddingVertical: 10,
    // paddingLeft: 20,
    // marginTop: 40,
  },
  contentContainer: {
    width: '100%',
    marginTop: 40,
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  chevronContainer: {
    position: 'absolute',
    right: '5%',
    alignSelf: 'center'
  },
  username: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 20
  },
  avatarContainer: {
    backgroundColor: '#eee'
  },
  listItem: {
    paddingVertical: '5%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',

  },
  itemText: {
    fontSize: 17
  },
  chevronRight: {
    position: 'absolute',
    right: '5%'
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: '3%',
    // paddingBottom: '10%',
  },
  timeLabel: {
    backgroundColor: '#f2f2f2', 
    paddingHorizontal: 10, 
    alignItems: 'center', 
    borderRadius: 5,
    paddingVertical: 3
  },
  title: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerColumn: {
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinRow:{
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 10
  }
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    languageKey: state.language.key,
    coinHistoryList: state.product.coinHistoryList,
    isLoading: state.product.isLoading,
    isLoggedIn: state.socialLogin.isLoggedIn,
    user: state.userProfile.user,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  getCoinHistoryList
})(PurchaseHistoryScreen)
