import React from 'react';
import { 
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Picker,
  TextInput} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { List, ListItem } from 'react-native-elements';
import { signOut, updateAvatar, updateProfile, getTutorDetail, getCompanyDetail } from '../../redux/actions';
import { onSignOut } from '../../lib/Auth/AWS_Auth';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { Avatar, CheckButton, Slideshow} from '../../components';

let {width, height} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const maxLength = 255;

class ProfileSettingScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.validateInput ? params.validateInput() : () => console.warn('not define')}} />
    )

    return {
      headerTitle: screenProps.locale.profileSetting.title,
      headerTintColor: '#fff',
      headerRight,
      headerStyle: {
        backgroundColor: screenProps.appType == 'tutor' ? Colors.greyColor : Colors.tintColor,
      },
    }
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ validateInput: this.validateInput });
  }

  validateInput = () => {
    if (!this.state.name
      || this.state.name === '') {
      Alert.alert('Name cannot be empty!')
    }
     else if (!this.state.email.includes("@")) {
      Alert.alert('Invalid email')
    }
     else if (!this.state.email
      || this.state.email === '') {
      Alert.alert('Email cannot be empty!')
    }
     else if (!this.state.phone
      || this.state.phone === '') {
      Alert.alert('Phone Number cannot be empty!')
    }
    else {
      if (this.props.user.userRole == 'learner') {
        // Learner, Done
        this.handleSubmit()
      }
      else if (this.props.user.userRole == 'tutor') {

        if (!this.state.profession) {
          Alert.alert('Profession cannot be empty!')
        }
        else if (!this.state.achievement) {
          Alert.alert('Achievement cannot be empty!')
        }
        else {
          // Tutor, Done
        this.handleSubmit()
        }

      }
      else if (this.props.user.userRole == 'company') {
        if (!this.state.introduction) {
          Alert.alert('Introduction cannot be empty!')
        }
        else if (!this.state.slogan) {
          Alert.alert('Slogan cannot be empty!')
        }
        else {
          // Tutor, Done
        this.handleSubmit()
        }
      }
    }
  }

  handleSubmit() {

    let data = {...this.state}

    if (this.state.introduction === '') {
      data.introduction = 'null';
    }
    if (this.state.website === '') {
      data.website ='null';
    }
    if (this.state.selfIntro === '') {
      data.selfIntro ='null';
    }

    this.props.updateProfile(data)
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    let {name, email, website, introduction, changePw, phone} = props.user;

    if (introduction === 'null') {
      introduction = '';
    }
    if (website === 'null') {
      website = '';
    }

    this.state = {
      textLength: 0,
      name: name,
      email: email,
      website: website,
      introduction: introduction,
      changePw: changePw,
      phone: phone,
      selfIntro: '',
      profession: '',
      experience: '0',
      achievement: '',
      slogan: '',
      showPicker: false,
    }
  }

  componentWillMount() {

    if (this.props.user.userRole == 'tutor') {
      this.props.getTutorDetail(this.props.user.userId)
    }
    else if (this.props.user.userRole == 'company') {
      this.props.getCompanyDetail(this.props.user.userId)
    }
  }

  componentWillReceiveProps(nextProps) {

    // if (!nextProps.isLoading && this.props.isLoading) {
    //   this.props.navigation.goBack();
    // }
    if  (!nextProps.isTutorLoading && this.props.isTutorLoading) {
      this.setState ({profession: nextProps.tutor.profession});
      this.setState ({experience: nextProps.tutor.experience});
      this.setState ({achievement: nextProps.tutor.achievement});
      
      if (nextProps.tutor.selfIntro === 'null') {
        this.setState ({selfIntro: ''});
      }
      else {
        this.setState ({selfIntro: nextProps.tutor.selfIntro});
      }
    }
      

    if  (!nextProps.isCompanyLoading && this.props.isCompanyLoading) {
      this.setState ({introduction: nextProps.company.introduction});
      this.setState ({slogan: nextProps.company.slogan});

    }
    if (this.props.user.userRole == 'company') {
      this.setState ({banner: nextProps.company.banner});
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

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({experience: v})
    this.hidePicker()
  }

  renderHeader() {
    let { locale } = this.props
    let avatar = <Avatar xlarge onPress={this._pickImage} />
    if (this.props.user && this.props.user.avatarUrl != 'null') {
      avatar = <Avatar xlarge uri={this.props.user.avatarUrl} onPress={this._pickImage}/>
    }
    return (
      <View style={styles.loginContainer}>
        <View style={styles.avatarContainer}>
          { avatar }
        </View>
        <View>
          <Text style={styles.text} onPress={this._pickImage}>{locale.profileSetting.text.editIcon}</Text>
        </View>
      </View>
    )
  }

  uploadedPhoto = (data) => {
    this.props.updateAvatar(data)
  }

  renderLearner() {
    let {locale, user} = this.props;

    return (
        <View style={styles.bottomContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.name}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.email}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.phone}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.introduction}</Text>
              <TextInput 
                multiline={true}
                numberOfLines={4}
                autoCapitalize={'none'}
                style={styles.introBox}
                onChangeText={(t) => this.handleChangeText(t)}
                value={this.state.introduction}
              />
          </View>
          <View style={[styles.rowContainer, {justifyContent: 'flex-end'}]}>
            <Text style={[styles.textTag, {fontSize: 13}]}>{`${this.state.textLength}/255`}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.website}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(website) => this.setState({website})}
              value={this.state.website}
            />
          </View>
          <TouchableOpacity style={styles.changePwButton} onPress={()=> this.props.navigation.navigate('ChangePassword')}>
            <Text style={{textAlign: 'left', paddingVertical: 10}}>{locale.profileSetting.text.changePw}</Text>
          </TouchableOpacity>
        </View>
    );
  }

  renderTutor() {
    let {locale, user} = this.props;

    return (
        <View style={styles.bottomContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.name}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.email}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.phone}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.website}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(website) => this.setState({website})}
              value={this.state.website}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.createTutor.text.profession}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(profession) => this.setState({profession})}
              value={this.state.profession}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.createTutor.text.experience}</Text>
            <TouchableOpacity 
              style={styles.expBox}
              onPress = {() => this.showPicker()}>
              <Text>
                {this.state.experience}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.createTutor.text.achievement}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(achievement) => this.setState({achievement})}
              value={this.state.achievement}
              autoCapitalize={'none'}
            />
          </View>


          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.createTutor.text.selfIntro}</Text>
              <TextInput 
                multiline={true}
                numberOfLines={4}
                autoCapitalize={'none'}
                style={styles.introBox}
                onChangeText={(selfIntro) => this.setState({selfIntro})}
                value={this.state.selfIntro}
              />
          </View>

          
          
          <TouchableOpacity style={styles.changePwButton} onPress={()=> this.props.navigation.navigate('ChangePassword')}>
            <Text style={{textAlign: 'left', paddingVertical: 10}}>{locale.profileSetting.text.changePw}</Text>
          </TouchableOpacity>
          <View style={{width: 400, height: 50}} />

        </View>
    );
  }

  renderCompany() {
    let {locale, user} = this.props;

    return (
        <View style={styles.bottomContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.name}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.email}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.phone}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.profileSetting.text.website}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(website) => this.setState({website})}
              value={this.state.website}
              autoCapitalize={'none'}
            />
          </View>
          
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.signUp.title.slogan}</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(slogan) => this.setState({slogan})}
              value={this.state.slogan}
              autoCapitalize={'none'}
            />
          </View>
          
          <View style={styles.rowContainer}>
            <Text style={styles.textTag}>{locale.signUp.title.introduction}</Text>
            <TextInput 
              multiline={true}
              numberOfLines={4}
              autoCapitalize={'none'}
              style={styles.introBox}
              onChangeText={(introduction) => this.setState({introduction})}
              value={this.state.introduction}
            />
          </View>

          {
            this.state.banner &&
            <View style={styles.rowContainer}>
              <Text style={styles.textTag}>{locale.signUp.title.banner}</Text>
              <View >
                <Slideshow 
                  dataSource={this.state.banner}
                  containerStyle={{
                    width: width * 0.7,
                    height: width * 0.7 * 3 / 4,
                    paddingHorizontal: width * 0.025,
                    paddingTop: width * 0.025,
                    marginBottom: width * 0.025,
                  }}
                  scrollEnabled={this.state.banner.length > 1}
                />
                <Text style={styles.changeBanner} onPress={() => this.props.navigation.navigate('ChanageBannerScene')}>{locale.profileSetting.text.editIcon}</Text>
              </View>
            </View>
          }
          
          <View style={{width: 400, height: 50}} />

        </View>
    );
  }

  render() {
    let {locale, user} = this.props;
    
    return (
      <View style={{flex:1}}>
        <KeyboardAwareScrollView style={styles.container} behavior="padding">
          {this.renderHeader()}
          {user.userRole === 'learner' && this.renderLearner ()}
          {user.userRole === 'tutor' && this.renderTutor ()}
          {user.userRole === 'company' && this.renderCompany ()}
        </KeyboardAwareScrollView>
        { 
          this.state.showPicker &&
          <CustomPicker
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            locale={locale}
            experience={this.state.experience}
          />
        }
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

class CustomPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      experience: props.experience || '0'
    }
  }

  render() {
    const { experience, locale, onCancel, onConfirm } = this.props;
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.experience)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>  
          }
        </View>
        <Text style={styles.pickerName}>{locale.createTutor.text.experience}</Text>
        <Picker
          selectedValue={this.state.experience}
          style={styles.picker}
          onValueChange={
            (experience, itemIndex) => {
              this.setState({experience});
            }
          }>
          <Picker.Item label="0" value={'0'} />
          <Picker.Item label="1" value={'1'} />
          <Picker.Item label="2" value={'2'} />
          <Picker.Item label="3" value={'3'} />
          <Picker.Item label="4" value={'4'} />
          <Picker.Item label="5" value={'5'} />
          <Picker.Item label="6" value={'6'} />
          <Picker.Item label="7" value={'7'} />
          <Picker.Item label="8" value={'8'} />
          <Picker.Item label="9" value={'9'} />
          <Picker.Item label="10+" value={'10+'} />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#3b85be',
    fontSize: 16,
    marginTop: 10
  },
  textTag: {
    width: '30%',
    color: '#262525',
    fontSize: 15,
    fontWeight: '500'
  },
  changePwButton: {
    marginTop: 20,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    width: '100%',
    alignSelf: 'center',
  },
  changeBanner: {
    color: '#3b85be',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
  expBox: {
    borderWidth: 1,
    height: 30,
    borderRadius: 10,
    width: '60%', 
    borderColor: '#d9d9d9',
    marginHorizontal: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introBox: {
    borderWidth: 1,
    height: 80,
    fontSize: 15,
    color: '#43484A',
    borderRadius: 10,
    width: '60%', 
    borderColor: '#d9d9d9',
    marginHorizontal: width * 0.05,
  },
  textInput: {
    marginHorizontal: width * 0.05,
    fontSize: 15,
    color: '#43484A',
    height: 18, 
    width: '60%', 
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  pickerName: {
    alignSelf: 'center'
  },
  picker: {
    width: '100%',
    backgroundColor: '#FFF'
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    user: state.userProfile.user,
    isTutorLoading: state.tutor.isLoading,
    isCompanyLoading: state.company.isLoading,
    tutor: state.tutor,
    company: state.company,
  }
}

export default connect(mapStateToProps, {
  signOut,
  updateAvatar,
  updateProfile,
  getTutorDetail,
  getCompanyDetail,
})(ProfileSettingScreen)
