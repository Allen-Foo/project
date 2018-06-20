import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { getAppliedClassList, deleteClass } from '../../redux/actions';
import { Separator, Spinner, Toast, AppliedClassItem} from '../../components';
import Swipeout from 'react-native-swipeout';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

const {width, height} = Dimensions.get('window');

class AppliedClassListScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
        <Ionicons
          name={"ios-calendar-outline"}
          size={30}
          style={{ paddingRight: 15, paddingTop: 5, color: '#fff'}}
        />
      </TouchableOpacity>
    );

    return {
      headerTitle: screenProps.locale.appliedClassList.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerRight,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      appliedClassList: [],
    }
  }

  renderClassList = (appliedClassList) => {
    const getSwipeoutBtns = (item) => [
      {
        text: this.props.locale.common.delete,
        onPress: () => this.props.deleteClass(item),
        type: 'delete',
      }
    ]

    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={appliedClassList}
        keyExtractor={(item) => (item.classId)}
        renderItem={({item}) => {
          item.uri = item.photoList[0].location
          return (
            <View style={{width: '100%'}}>
              <Swipeout right={getSwipeoutBtns(item)}>
                <AppliedClassItem data={item} onPress={() => this.props.navigation.navigate('TutorDetail', {classId: item.classId})} />
              </Swipeout>
              <Separator />
            </View>
          )
        }}
      />
    )
  }

  renderEmptyPage = (errMessage) => {
    return (
      <View style={styles.container}>
        <Entypo
          name={"circle-with-cross"}
          size={60}
          color={Colors.tintColor}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SearchClass')}
        >
          <Ionicons
            name={'ios-add-circle-outline'}
            size={30}
            style={{ padding: '2%'}}
            color={'black'}
          />
          <Text style={styles.text}>{this.props.locale.appliedClassList.exploreClasses}</Text>
        </TouchableOpacity>  
        { this.props.isLoading && <Spinner intensity={100}/> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    )
  }

  render() {        
    const { appliedClassList, locale, fetchErrorMsg } = this.props;

    var errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    if (appliedClassList && appliedClassList.length > 0) {
      return this.renderClassList(appliedClassList)
    }
    return this.renderEmptyPage(errMessage)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5, 
    flexDirection: 'row',
    marginTop: '5%',
    paddingHorizontal: '5%',
  },
});


const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    appliedClassList: state.userProfile.appliedClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getAppliedClassList,
  deleteClass,
})(AppliedClassListScreen)
