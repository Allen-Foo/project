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
const {width, height} = Dimensions.get('window');

class AppliedClassListScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Schedule')}>
        <Ionicons
          name={"ios-calendar-outline"}
          size={30}
          style={{ paddingRight: 15, paddingTop: 5, color: '#fff'}}
        />
      </TouchableOpacity>
    );

    return {
      tabBarLabel: screenProps.locale.appliedClassList.title,
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

  // componentWillMount() {
  //   this.props.getAppliedClassList(this.props.userId)
  // }

  // componentDidMount() {
  //   // We can only set the function after the component has been initialized
  //   this.props.navigation.setParams({ handleAddClass: this.handleAddClass });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.appliedClassList.length > 0 && nextProps.appliedClassList !== this.state.appliedClassList) {
  //     this.setState({appliedClassList: nextProps.appliedClassList})
  //   }

  //   // after create class, fetch the new classes
  //   if (nextProps.requireUpdateClassList && !this.props.requireUpdateClassList) {
  //     this.props.getAppliedClassList(this.props.userId)
  //   }
  // }

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

  renderEmptyPage = () => {
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
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </View>
    )
  }

  render() {
    const { appliedClassList } = this.props;
    if (appliedClassList.length > 0) {
      return this.renderClassList(appliedClassList)
    }
    return this.renderEmptyPage()
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
    userId: state.socialLogin.user && state.socialLogin.user.userId,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    appliedClassList: state.socialLogin.appliedClassList,
    requireUpdateClassList: state.classes.requireUpdateClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getAppliedClassList,
  deleteClass,
})(AppliedClassListScreen)
