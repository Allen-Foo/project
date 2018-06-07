import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  FlatList,
  Picker,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { Separator, Spinner, Toast, ClassItem, TutorListItem, Hr, NextButton} from '../../components';

import { createClass, editClass, getTutorList } from '../../redux/actions';
import { Dropdown } from 'react-native-material-dropdown';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

class AssignTutorScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"check"}
          size={30}
          style={{ paddingRight: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      title: params.isEditMode ? null : screenProps.locale.assignTutor.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.state = {
      selectedTutorList: params.tutorList || [],
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
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({
      tutorList: this.state.selectedTutorList,
    })
    this.props.navigation.goBack();
  }

  handleAddTutor = (tutor) => {
    this.setState({
      selectedTutorList: [
        ...this.state.selectedTutorList,
        tutor,
      ] 
    })
  }

  handleRemoveTutor = (tutor) => {
     this.setState({
      selectedTutorList: this.state.selectedTutorList.filter(x => x.tutorId != tutor.tutorId)
    })
  }

  handleNext = () => {
    let { params = {} } = this.props.navigation.state;
    params.tutorList = this.state.selectedTutorList;
    this.props.navigation.navigate('Contact', params)
  }

  render() {
    let { locale, tutorList } = this.props;
    let { params = {} } = this.props.navigation.state;

    return (
      <View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={tutorList}
          keyExtractor={(item) => (item.tutorId)}
          renderItem={({item}) => {
            return (
              <View style={{width: '100%'}}>
                <TutorListItem
                  data={item}
                  checked={this.state.selectedTutorList.map(x=>x.tutorId).includes(item.tutorId)}
                  isCheckMode={true}
                  handleAddTutor={this.handleAddTutor}
                  handleRemoveTutor={this.handleRemoveTutor}
                />
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
        {
          this.state.selectedTutorList.length > 0 && !params.isEditMode &&
          <NextButton 
            onPress={() => this.handleNext()}
            text={locale.common.next}
          />
        }
      </View>
    );
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
  editClass,
  getTutorList,
})(AssignTutorScreen)
