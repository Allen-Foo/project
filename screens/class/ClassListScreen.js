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
import { getClassList, deleteClass } from '../../redux/actions';
import { Separator, Spinner, Toast, ClassItem} from '../../components';
import Swipeout from 'react-native-swipeout';

import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

class ClassListScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleAddClass ? params.handleAddClass() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"add"}
          size={30}
          style={{ paddingRight: 15, paddingTop: 5 }}
        />
      </TouchableOpacity>
    );

    return {
      tabBarLabel: screenProps.locale.classList.title,
      headerTitle: screenProps.locale.classList.title,
      headerTintColor: '#000',
      headerRight,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      classList: [],
    }
  }

  componentWillMount() {
    this.props.getClassList(this.props.userId)
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleAddClass: this.handleAddClass });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classList.length > 0 && nextProps.classList !== this.state.classList) {
      this.setState({classList: nextProps.classList})
    }

    // after create class, fetch the new classes
    if (nextProps.requireUpdateClassList && !this.props.requireUpdateClassList) {
      this.props.getClassList(this.props.userId)
    }
  }

  componentWillUnmount() {
    console.warn('componentWillUnmount')
  }

  handleAddClass = () => {
    this.props.navigation.navigate('ClassType')
  }

  renderClassList = (classList) => {
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
        data={classList}
        keyExtractor={(item) => (item.classId)}
        renderItem={({item}) => {
          item.uri = item.photoList[0].location
          return (
            <View style={{width: '100%'}}>
              <Swipeout right={getSwipeoutBtns(item)}>
                <ClassItem data={item} onPress={() => this.props.navigation.navigate('EditClass', {classId: item.classId})} />
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
          name={"open-book"}
          size={60}
          color={Colors.tintColor}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleAddClass()}
        >
          <Ionicons
            name={'ios-add-circle-outline'}
            size={30}
            style={{ padding: '2%'}}
            color={'black'}
          />
          <Text style={styles.text}> Add a Class</Text>
        </TouchableOpacity>  
        { this.props.isLoading && <Spinner intensity={100}/> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </View>
    )
  }

  render() {
    const { classList } = this.state;
    if (classList.length > 0) {
      return this.renderClassList(classList)
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
    backgroundColor: '#FFF', 
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
    classList: state.classes.classList,
    requireUpdateClassList: state.classes.requireUpdateClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassList,
  deleteClass,
})(ClassListScreen)
