import React from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

let {width, height} = Dimensions.get('window');

import Colors from '../../constants/Colors';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { Separator, Spinner, Toast } from '../../components';

import { createTutor, updateTutor } from '../../redux/actions';
import axios from 'axios';
import appSecrets from '../../appSecrets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CreateTutorScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <Text style={{paddingRight: 15, fontSize: 16}}>{screenProps.locale.common.confirm}</Text>
      </TouchableOpacity>
    );

    return {
      headerTitle: params.isEditMode ? screenProps.locale.createTutor.editTutor : screenProps.locale.createTutor.title,
      headerTintColor: '#000',
      headerRight,
    }
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    const { params = {} }  = this.props.navigation.state;
    if (params.isEditMode) {
      this.props.updateTutor({
        ...this.props.navigation.state.params,
        ...this.state
      })
    } else {
      this.props.createTutor(this.state)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && this.props.isLoading) {
      this.props.navigation.goBack();
    }
  }

  constructor(props) {
    super(props);
    const { params = {} }  = this.props.navigation.state;

    this.state = {
      tutorName: params.tutorName,
      email: params.email,
      phone: params.phone,
      introduction: params.introduction,
      avatarUrl: params.avatarUrl,
    }
  }

  renderHeader() {
    let { locale } = this.props
    let avatar = 
      <Avatar
        xlarge
        rounded
        icon={{name: 'account-box'}}
        onPress={this._pickImage}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
      
    if (this.state.avatarUrl) {
      avatar = 
        <Avatar
          xlarge
          rounded
          source={{url: this.state.avatarUrl}}
          onPress={this._pickImage}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
    }
    return (
      <View style={styles.loginContainer}>
        { avatar }
        <View>
          <Text style={styles.text} onPress={this._pickImage}>{locale.profileSetting.text.editIcon}</Text>
        </View>
      </View>
    )
  }

  render() {
    let { locale } = this.props
    return (
      <KeyboardAwareScrollView style={styles.container} behavior="padding">
        {this.renderHeader()}
        <TextInputItems
          fieldName={locale.createTutor.text.tutorName}
          style={styles.textInput}
          onChangeText={(tutorName) => this.setState({tutorName})}
          value={this.state.tutorName}
        />
        <TextInputItems
          fieldName={locale.createTutor.text.email}
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInputItems
          fieldName={locale.createTutor.text.phone}
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.fieldName}>{locale.createTutor.text.introduction}</Text>
          <TextInput
            style={styles.introTextInput}          
            onChangeText={(introduction) => this.setState({introduction})}
            value={this.state.introduction}
            multiline={true}
          />
        </View>

        { this.props.isLoading && <Spinner intensity={100}/> }
      </KeyboardAwareScrollView>
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      this.uploadPhoto(result)
    }
  }

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      this.uploadPhoto(result)
    }
  }

  uploadPhoto(data) {
    let baseURL = appSecrets.aws.apiURL;
    axios({
      method: 'post',
      url: baseURL + '/upload',
      data: {
        key: 'testKey',
        file: data.base64,
      }
    }).then(res => {
      this.setState({
        avatarUrl: res.data.Location,
      })
    }).catch(err => console.warn(err))
  }
}

const TextInputItems = props => {
  const {fieldName, style, onChangeText, value} = props;
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <TextInput
        style={style}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    paddingTop: 40,
  },
  contentContainer: {
    width: '90%',
    paddingLeft: 30
  },
  text: {
    color: '#3b85be',
    fontSize: 16,
    marginTop: 10
  },
  textInput: {
    paddingVertical: 10, 
    borderColor: 'grey', 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  fieldName: {
    paddingTop: 10,
    paddingVertical: 10
  },
  introTextInput: {
    borderWidth: 1,
    height: '50%',
    fontSize: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%', 
    borderColor: '#fff',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.socialLogin.isLoading,
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps, {
  createTutor,
  updateTutor,
})(CreateTutorScreen)

