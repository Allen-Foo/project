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

import { connect } from 'react-redux';
import { getClassList } from '../../redux/actions';
import { Separator, Spinner, Toast } from '../../components';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

class ClassListScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state, props } = navigation;

    return {
      tabBarLabel: screenProps.locale.classList.title,
      headerTitle: screenProps.locale.classList.title,
      headerTintColor: 'black',
      headerStyle: {
        // backgroundColor: '#555',
      },
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.classList && nextProps.classList !== this.props.classList) {
      this.setState({classList: nextProps.classList})
    }
  }

  renderClassList = (classList) => {
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={classList}
        keyExtractor={(item) => (item.classId)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Image source={{uri: item.photoList[0].location}} style={styles.image}/>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Category')}
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
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8 * 3 / 4,
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
