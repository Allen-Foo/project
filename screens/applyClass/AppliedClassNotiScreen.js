import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window')
import Colors from '../../constants/Colors';
import { getClassList } from '../../redux/actions';
import { Separator, Tutor } from '../../components';
import { FontAwesome, Entypo } from '@expo/vector-icons';

class appliedClassNoti extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      
    }
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { locale } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>{locale.appliedClassNoti.text.successMsg}</Text>
          <Text style={styles.contentText}>{locale.appliedClassNoti.text.thanksMsg}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewMyRecordButton}
          // onPress={onPress}
        >
          <View>
            <Text style={styles.subTabText}>
              {locale.appliedClassNoti.text.viewMyRecord}
            </Text>
          </View>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
        <Separator style={{backgroundColor: '#eee'}}/>
        <TouchableOpacity 
          style={styles.continueFindClassButton}
          // onPress={onPress}
        >
          <View>
            <Text style={styles.whiteText}>
              {locale.appliedClassNoti.text.continueFindClass}
            </Text>
          </View>
          <View style={styles.chevronContainer}>
            <Entypo
              name={"chevron-thin-right"}
              size={15}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: '#efeff3',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  headingText: {
    color: '#2f2f2f',
    fontSize: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentText: {
    color: '#303030',
    fontSize: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  viewMyRecordButton: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueFindClassButton: {
    paddingVertical: 15,
    backgroundColor: Colors.tintColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTabText: {
    paddingHorizontal: 20,
  },
  whiteText: {
    color: '#fff',
    paddingHorizontal: 20,
  },
  chevronContainer: {
    paddingRight: 10,
  },
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    classDetail: state.classes.classDetail,
    classList: state.classes.classList,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  getClassList,
})(appliedClassNoti)
