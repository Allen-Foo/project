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

  render() {
    let {locale} = this.props;

    let upToText = locale.balance.upTo + "";

    return (
      <View style={styles.container}>
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

          <Text style= {styles.amount}> [$ 99] </Text>

        </View>
        <Text style= {styles.upToText}> {upToText} </Text>
         <TouchableOpacity 
            style={styles.button}
          >
            <Text style={styles.buttonText}>
            [Get my money back]
            </Text>
        </TouchableOpacity>
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
    marginTop: 30,
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
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(BalanceScreen)
