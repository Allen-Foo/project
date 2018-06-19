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
import { getTutorList, deleteTutor } from '../../redux/actions';
import { Separator, Spinner, Toast, ClassItem, TutorListItem} from '../../components';
import Swipeout from 'react-native-swipeout';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

class ManageTutorScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleCreateTutor ? params.handleCreateTutor() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"person-add"}
          size={30}
          style={{ paddingRight: 15, paddingTop: 5 }}
        />
      </TouchableOpacity>
    );

    return {
      tabBarLabel: screenProps.locale.manageTutor.title,
      headerTitle: screenProps.locale.manageTutor.title,
      headerTintColor: '#000',
      headerRight,
    }
  };

  loadMoreItems = () => {
    this.props.getTutorList(this.props.user.userId, this.props.tutorList[this.props.tutorList.length -1].userId)
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    }
  }

  componentWillMount() {
    // if the store has some items, don't fetch
    if (!this.props.tutorList || this.props.tutorList.length == 0) {
      this.props.getTutorList(this.props.user.userId)
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleCreateTutor: this.handleCreateTutor });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tutorList && nextProps.tutorList !== this.props.tutorList) {
      this.setState({tutorList: nextProps.tutorList})
    }
  }

  handleCreateTutor = () => {
    this.props.navigation.navigate('CreateTutor')
  }

  renderTutorList = (tutorList) => {

    const getSwipeoutBtns = (item) => [
      {
        text: this.props.locale.common.delete,
        onPress: () => 
          Alert.alert(
          this.props.locale.manageTutor.text.deleteTutor,
          null,
          [
            {text: this.props.locale.common.cancel, onPress: () => this.props.navigation.goBack()},
            {text: this.props.locale.common.okMsg, onPress: () => this.props.deleteTutor(item)},
          ],
        ),
        type: 'delete',
      }

    ]

    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={tutorList}
        keyExtractor={(item) => (item.userId)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Swipeout right={getSwipeoutBtns(item)}>
                <TutorListItem data={item} onPress={() => this.props.navigation.navigate('CreateTutor', {...item, isEditMode: true})} />
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
        onMomentumScrollEnd={() => {
          if (this.shouldLoadMore && this.props.isLastTutorList == false) {
            this.loadMoreItems();
            this.shouldLoadMore = false
          }
        }}
      />
    )
  }

  renderEmptyPage = () => {
    let { locale, fetchErrorMsg } = this.props
    let errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);
    
    return (
      <View style={styles.container}>
        <Ionicons
          name={"ios-people"}
          size={60}
          color={Colors.tintColor}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleCreateTutor()}
        >
          <Ionicons
            name={'ios-add-circle-outline'}
            size={30}
            style={{ padding: '2%'}}
            color={'black'}
          />
          <Text style={styles.text}> {this.props.locale.manageTutor.text.addATutor} </Text>
        </TouchableOpacity>  
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </View>
    )
  }

  render() {
    const { tutorList, isLoading } = this.props;

    if (isLoading && !tutorList) {
      return (
        <Spinner intensity={100}/>
      )
    } else if (!isLoading && tutorList && tutorList.length == 0) {
      return this.renderEmptyPage()
    } else {
      return this.renderTutorList(tutorList)
    }
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
    user: state.userProfile.user,
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    isLastTutorList: state.socialLogin.isLastTutorList,
    tutorList: state.socialLogin.tutorList,
    fetchErrorMsg: state.socialLogin.fetchErrorMsg,
  }
}

export default connect(mapStateToProps, {
  getTutorList,
  deleteTutor,
})(ManageTutorScreen)
