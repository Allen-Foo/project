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
    this.props.getTutorList(this.props.user.userId, this.props.tutorList[this.props.tutorList.length -1].tutorId)
  }

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true,
    this.state = {
      tutorList: [],
      refreshing: false,
    }
  }

  componentWillMount() {
    // if the store has some items, don't fetch
    if (!this.props.tutorList || this.props.tutorList.length == 0) {
      console.warn('here')
      this.props.getTutorList(this.props.user.userId)
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleCreateTutor: this.handleCreateTutor });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tutorList.length > 0 && nextProps.tutorList !== this.state.tutorList) {
      this.setState({tutorList: nextProps.tutorList})
    }
  }

  handleCreateTutor = () => {
    this.props.navigation.navigate('CreateTutor')
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
        keyExtractor={(item) => (item.tutorId)}
        renderItem={({item}) => {
          item.uri = item.avatarUrl
          return (
            <View style={{width: '100%'}}>
              <Swipeout right={getSwipeoutBtns(item)}>
                <TutorListItem data={item}/>
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
          if (this.shouldLoadMore && this.props.isLastTutorList == false) {
            this.loadMoreItems();
            this.shouldLoadMore = false
          }
        }}
      />
    )
  }

  renderEmptyPage = () => {
    return (
      <View style={styles.container}>
        <Ionicons
          name={"ios-people"}
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
          <Text style={styles.text}> {this.props.locale.manageTutor.text.addATutor} </Text>
        </TouchableOpacity>  
        { this.props.isLoading && <Spinner intensity={100}/> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </View>
    )
  }

  render() {
    const { tutorList } = this.props;
    if ( tutorList && tutorList.length > 0) {
      return this.renderTutorList(tutorList)
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
    user: state.socialLogin.user,
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    isLastTutorList: state.socialLogin.isLastTutorList,
    tutorList: state.socialLogin.tutorList,
  }
}

export default connect(mapStateToProps, {
  getTutorList,
  deleteTutor,
})(ManageTutorScreen)
