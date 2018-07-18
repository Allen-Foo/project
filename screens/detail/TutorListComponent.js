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
import { getTutorList } from '../../redux/actions';
import { Separator, Spinner, Toast, TutorListItem} from '../../components';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';

import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

class TutorListComponent extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      tabBarLabel: screenProps.locale.common.tutor,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.tutorList && nextProps.tutorList !== this.props.tutorList) {
      this.setState({tutorList: nextProps.tutorList})
    }
  }

  renderTutorList = (tutorList) => {

    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={tutorList}
        keyExtractor={(item) => (item.userId)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <TutorListItem data={item} onPress={() => this.props.navigation.navigate('CreateTutor', {...item, isEditMode: true})} />
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
    const { tutorList, locale, fetchErrorMsg } = this.props;

    var errMessage = getLocaleErrorMessage (locale, fetchErrorMsg);

    if (tutorList && tutorList.length > 0) {
      return this.renderTutorList(tutorList)
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
    user: state.classes.classDetail.user,
    locale: state.language.locale,
    isLoading: state.socialLogin.isLoading,
    isLastTutorList: state.socialLogin.isLastTutorList,
    tutorList: state.socialLogin.tutorList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  getTutorList,
})(TutorListComponent)
