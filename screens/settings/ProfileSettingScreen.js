import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, TextInput} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { List, ListItem } from 'react-native-elements';
import { signOut, updateAvatar, updateProfile } from '../../redux/actions';
import { onSignOut } from '../../lib/Auth/AWS_Auth';
import { Avatar } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
let {width, height} = Dimensions.get('window');
import axios from 'axios';
import appSecrets from '../../appSecrets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const maxLength = 255;

class ProfileSettingScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
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
        headerTitle: screenProps.locale.profileSetting.title,
        headerTintColor: '#000',
        headerRight,
      }
    };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.updateProfile(this.state)
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    let {name, email, website, introduction, changePw, phone} = props.user;

    this.state = {
      textLength: 0,
      name: name,
      email: email,
      website: website,
      introduction: introduction,
      changePw: changePw,
      phone: phone,
    }
  }

  handleChangeText = (text) => {
    this.setState({
      textLength: text.length,
      introduction: text,
    });
  }

  static defaultProps = {
    uploadedImage: false
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
    if (this.props.user && this.props.user.avatarUrl) {
      // console.warn('avatarUrl', this.props.user.avatarUrl)
      avatar = 
        <Avatar
          xlarge
          rounded
          source={{url: this.props.user.avatarUrl}}
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

  uploadedPhoto = (data) => {
    this.props.updateAvatar(data)
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} behavior="padding">
        {this.renderHeader()}
        <View style={styles.bottomContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.name}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.email}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.phone}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.introduction}</Text>
              <TextInput 
                multiline={true}
                numberOfLines={4}
                style={styles.introBox}
                onChangeText={(t) => this.handleChangeText(t)}
                value={this.state.introduction}
              />
          </View>
          <View style={[styles.rowContainer, {justifyContent: 'flex-end'}]}>
            <Text style={[styles.textTag, {fontSize: 12}]}>{`${this.state.textLength}/255`}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.website}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(website) => this.setState({website})}
              value={this.state.website}
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.changePwButton}>
              <Text style={{textAlign: 'left', paddingVertical: 10}}>{locale.profileSetting.text.changePw}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    // console.warn('photo', result);

    if (!result.cancelled) {
      this.uploadedPhoto(result)
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  text: {
    color: '#3b85be',
    fontSize: 16,
    marginTop: 10
  },
  textTag: {
    width: 80,
    color: '#262525',
    fontSize: 14
  },
  changePwButton: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    width: '100%',
    paddingHorizontal: 10
  },
  introBox: {
    borderWidth: 1,
    height: 80,
    color: '#43484A',
    borderRadius: 10,
    width: 200, 
    borderColor: '#d9d9d9',
    marginHorizontal: width * 0.05,
  },
  textInput: {
    marginHorizontal: width * 0.05,
    fontSize: 14,
    color: '#43484A',
    height: 18, 
    width: 200, 
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  bottomContainer: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOut: {
    color: 'red',
    fontSize: 18
  },

});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    user: state.socialLogin.user,
  }
}

export default connect(mapStateToProps, {
  signOut,
  updateAvatar,
  updateProfile,
})(ProfileSettingScreen)
