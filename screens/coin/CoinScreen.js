import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window')


import Colors from '../../constants/Colors';

import { signInFacebook, signInGoogle, setAppType } from '../../redux/actions';

class CoinScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
   
    return {
      headerTitle: screenProps.locale.coin.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
    }
  };

  static defaultProps = {
    isLoggedIn: false
  }

  renderHeader() {
    let { user } = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.headerColumn}>
          <Text style={styles.title}>
            {this.props.locale.coin.text.purchasedCoinRemain}

          </Text>
          <View style={styles.coinRow}>
            <MaterialCommunityIcons
              name={'coin'}
              size={30}
              color={'gold'}
            />
            <Text style={styles.coinText}>
              {user.gold}
            </Text>
          </View>
        </View>
        <View style={styles.headerColumn}>
          <Text style={styles.title}>
            {this.props.locale.coin.text.freeCoinRemain}
          </Text>
          <View style={styles.coinRow}>
            <MaterialCommunityIcons
              name={'coin'}
              size={30}
              color={'gold'}
            />
            <Text style={styles.coinText}>
              {user.freeGold}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderHeader() }

          <ListItem
            title={this.props.locale.coin.text.purchase}
            leftIcon={{name: 'coin'}}
            onPress={() => {this.props.navigation.navigate('PurchaseCoin')}}
            useCommunityIcon={true}
          />
          <ListItem
            title={this.props.locale.coin.text.purchasedHistory}
            leftIcon={{name: 'history'}}
            onPress={() => {this.props.navigation.navigate('PurchaseHistory')}}
          />

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
    backgroundColor: '#efeff3',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 40,
  },
  contentContainer: {
    width: '100%',
    marginTop: 40,
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
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 17
  },
  chevronRight: {
    position: 'absolute',
    right: '5%'
  },
  header: {
    backgroundColor: Colors.tintColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '10%',
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15
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
  }
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    user: state.userProfile.user,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  signInFacebook,
  signInGoogle,
  setAppType,
})(CoinScreen)
