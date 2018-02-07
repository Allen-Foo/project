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
import { getClassList } from '../../redux/actions';
import { Separator, Spinner, Toast, ClassItem} from '../../components';

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
    if (nextProps.classList && nextProps.classList !== this.props.classList) {
      this.setState({classList: nextProps.classList})
    }
  }

  handleAddClass = () => {
    this.props.navigation.navigate('Category')
  }

  renderClassList = (classList) => {
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={classList}
        keyExtractor={(item) => (item.classId)}
        renderItem={({item}) => {
          item.uri = item.photoList[0].location
          return (
            <View style={{width: '100%'}}>
              <ClassItem data={item} onPress={() => this.props.navigation.navigate('ClassSummary', item)} />
              <Separator />
            </View>
          )
        }}
      />
    )
  }

  render() {
    // console.warn('classList', this.state.classList, this.props.userId)
    const { classList } = this.state;
    if (classList.length > 0) {
      return this.renderClassList(classList)
    }
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
    userId: state.socialLogin.user && state.socialLogin.user.userId,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    classList: state.classes.classList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassList,
})(ClassListScreen)
