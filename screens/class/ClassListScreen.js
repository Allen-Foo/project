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
  ActivityIndicator,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { getClassList, getMoreClassList, deleteClass, duplicateClass } from '../../redux/actions';
import { Separator, Spinner, Toast, ClassItem} from '../../components';
import Swipeout from 'react-native-swipeout';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

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
          color={'#fff'}
          style={{ paddingRight: 15, paddingTop: 5 }}
        />
      </TouchableOpacity>
    );

    return {
      tabBarLabel: screenProps.locale.classList.title,
      headerTitle: screenProps.locale.classList.title,
      headerTintColor: '#fff',
      headerRight,
      headerStyle: {
        backgroundColor: Colors.greyColor,
      }
    }
  };

  loadMoreItems = () => {
    this.props.getMoreClassList(this.props.userId, this.props.classList[this.props.classList.length -1].classId)
  }

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true,
    this.state = {
      classList: [],
      refreshing: false,
    }
  }

  componentWillMount() {
    // if the store has some items, don't fetch
    if (!this.props.classList || this.props.classList.length == 0) {
      this.props.getClassList(this.props.userId)
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleAddClass: this.handleAddClass });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classList && nextProps.classList.length > 0 && nextProps.classList !== this.state.classList) {
      this.setState({classList: nextProps.classList})
    }
  }

  handleAddClass = () => {
    this.props.navigation.navigate('ClassType')
  }

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderClassList = (classList) => {

    const getSwipeoutBtns = (item) => [
      {
        text: this.props.locale.common.duplicate,
        onPress: () => 
          Alert.alert(
          this.props.locale.classList.duplicateClass,
          null,
          [
            {text: this.props.locale.common.cancel, onPress: () => this.props.navigation.goBack()},
            {text: this.props.locale.common.okMsg, onPress: () => this.props.duplicateClass(item)},
          ],
        ),
        backgroundColor: Colors.tintColor,
      },
      {
        text: this.props.locale.common.delete,
        onPress: () => 
          Alert.alert(
          this.props.locale.classList.deleteClass,
          null,
          [
            {text: this.props.locale.common.cancel, onPress: () => this.props.navigation.goBack()},
            {text: this.props.locale.common.okMsg, onPress: () => this.props.deleteClass(item)},
          ],
        ),
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
                <ClassItem data={item} onPress={() => this.props.navigation.navigate('ClassDetailScreen', {classId: item.classId})} />
              </Swipeout>
              <Separator />
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
          if (this.shouldLoadMore && this.props.isLastClassList == false) {
            this.loadMoreItems();
            this.shouldLoadMore = false
          }
        }}
      />
    )
  }

  renderEmptyPage = (errMessage) => {
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
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    )
  }

  render() {    
    const { classList, locale, fetchErrorMsg } = this.props;

    var errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    if (classList && classList.length > 0) {
      return this.renderClassList(classList)
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
    userId: state.userProfile.user && state.userProfile.user.userId,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    isLastClassList: state.classes.isLastClassList,
    classList: state.classes.classList,
    requireUpdateClassList: state.classes.requireUpdateClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassList,
  getMoreClassList,
  deleteClass,
  duplicateClass,
})(ClassListScreen)
