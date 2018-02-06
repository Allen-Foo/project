import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, TextInput} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { List, ListItem } from 'react-native-elements';
import { signOut, updateAvatar, updateProfile } from '../../redux/actions';
import { onSignOut } from '../../lib/Auth/AWS_Auth';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import { ImagePicker } from 'expo';

let {width, height} = Dimensions.get('window');

import axios from 'axios';
import appSecrets from '../../appSecrets';


class ProfileSettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    let {username, firstName, lastName, email, gender} = props.user;

    console.warn('user', props.user)

    this.state = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      gender: gender,
    }
  }

  static defaultProps = {
    uploadedImage: false
  }

  renderHeader() {
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
        <TouchableOpacity style={styles.button} onPress={this._pickImage}>
          <Text style={styles.text}>click here to edit icon </Text>
        </TouchableOpacity>
      </View>
    )
  }

  uploadedPhoto = (data) => {
    this.props.updateAvatar(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {this.renderHeader()}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>First name</Text>
            <TextInput 
              style={styles.TextInput}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>Last name</Text>
            <TextInput 
              style={styles.TextInput}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>Email</Text>
            <TextInput 
              style={styles.TextInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>Gender</Text>
            <TextInput 
              style={styles.TextInput}
              onChangeText={(gender) => this.setState({gender})}
              value={this.state.gender}
          />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>Username</Text>
            <TextInput 
              style={styles.TextInput}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
          />
          </View>
            <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.updateProfile(this.state)}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
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
    color: '#3B85BE',
    fontSize: 16,
  },
  textTag: {
    width: 80,
    color: '#262525',
  },
  TextInput: {
    marginHorizontal: width * 0.05,
    height: 18, 
    width: 200, 
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginTop: '10%',
    marginBottom: '5%',
    backgroundColor: '#eee'
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  bottomContainer: {
    height: '40%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 180,
  },
  photoContainer: {
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  listContainer: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 50,
    justifyContent: 'center',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    paddingVertical: '20%',
    backgroundColor: 'green',
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
  }
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
