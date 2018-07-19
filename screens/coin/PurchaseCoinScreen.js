import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window')
import { Separator, Spinner, Toast, ClassItem} from '../../components';


import Colors from '../../constants/Colors';

import { getProductList, purchaseGold } from '../../redux/actions';

class PurchaseCoinScreen extends React.Component {
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

  handlePressPurchase = (productId) => {
    this.props.purchaseGold(this.props.user.userId, productId)
  }

  componentWillMount() {
      this.props.getProductList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPurchaseSuccess && !this.props.isPurchaseSuccess) {
      Alert.alert(
        'success',
      )
    }
  }

  render() {
    let { productList } = this.props;

    return (
      <View  style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={productList.sort(function(a,b) {return parseFloat(a.gold) - parseFloat(b.gold);})}
          keyExtractor={(item) => (item.productId)}
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.rowContainer}>
                {this.props.languageKey === 'en' && <Text> {item.engName} </Text>}
                {this.props.languageKey === 'zh_hant' && <Text> {item.tcName} </Text>}
                {this.props.languageKey === 'zh_hans' && <Text> {item.scName} </Text>}
                  <TouchableOpacity style={{paddingVertical: 10, width: '25%', backgroundColor: Colors.tintColor}} 
                  onPress={()=>{this.handlePressPurchase(item.productId)}}>
                  <View style = {{alignItems: 'center'}}>
                    <Text> HK${item.price} </Text>
                  </View>
                  </TouchableOpacity>
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
    productList: state.product.productList,
    isLoading: state.product.isLoading,
    isLoggedIn: state.socialLogin.isLoggedIn,
    user: state.userProfile.user,
    appType: state.appType.mode,
    isPurchaseSuccess: state.product.isPurchaseSuccess,
  }
}

export default connect(mapStateToPorps, {
  getProductList,
  purchaseGold
})(PurchaseCoinScreen)
