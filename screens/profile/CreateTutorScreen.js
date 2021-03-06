import React from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Picker,
  TouchableOpacity,
} from 'react-native';

let {width, height} = Dimensions.get('window');

import Colors from '../../constants/Colors';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { Separator, Spinner, Toast, Avatar, AchievementItem } from '../../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createTutor, updateTutor, getTutorDetail } from '../../redux/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import appSecrets from '../../appSecrets';

class CreateTutorScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={()=>{params.validateInput ? params.validateInput() : () => console.warn('not define')}}>
        <Text style={{paddingRight: 15, fontSize: 16, color: '#fff'}}>{screenProps.locale.common.confirm}</Text>
      </TouchableOpacity>
    );

    return {
      headerTitle: params.isEditMode ? screenProps.locale.createTutor.editTutor : screenProps.locale.createTutor.title,
      headerTintColor: '#fff',
      headerRight,
      headerStyle: {
        backgroundColor: Colors.greyColor,
      }
    }
  };

  componentWillMount() {
    const { params = {} }  = this.props.navigation.state;

    if (params.isEditMode) {
      this.props.getTutorDetail(params.userId)
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ validateInput: this.validateInput });
  }

  validateInput = () => {
    if (!this.state.name) {
      Alert.alert('Name cannot be empty!')
    }
     else if (!this.state.email) {
      Alert.alert('Email cannot be empty!')
    }
     else if (!this.state.email.includes("@")) {
      Alert.alert('Invalid email')
    }
     else if (!this.state.phone) {
      Alert.alert('Phone Number cannot be empty!')
    }
     else if (!this.state.profession) {
      Alert.alert('Profession cannot be empty!')
    }
     else if (!this.state.achievementList) {
      Alert.alert('Achievement cannot be empty!')
    }
    else if (!this.state.avatarUrl) {
      Alert.alert('Please choose icon!')
    }
     else {

      // Check if all achievements are correctly filled in
      if (this.state.achievementList.length > 0) {
        let allFilled = true;
        for (let i=0; i<this.state.achievementList.length;i++) {
          if (!this.state.achievementList[i].achievement) {
            allFilled = false;
            break;
          }
        }

        if (allFilled) {
          this.handleSubmit ();
        }
        else {
          Alert.alert('Achievement cannot be empty!')
        }
      }
      else {
        Alert.alert('Achievement cannot be empty!')
      }



    }
  }

  handleSubmit() {
    const { params = {} }  = this.props.navigation.state;

    if (this.state.selfIntro === '') {
      this.state.selfIntro = 'null';
    }

    if (params.isEditMode) {
      this.props.updateTutor({
        ...this.props.navigation.state.params,
        ...this.state
      })
    } else {
      this.props.createTutor(this.state)
    }
    this.setState ({isGoBack: true});
  }
  
  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading && this.props.isLoading) {
      this.props.navigation.goBack();
    }
    if  (!nextProps.isTutorLoading && this.props.isTutorLoading) {
      if (nextProps.fetchErrorLastUpdate instanceof Date
          && (!(this.props.fetchErrorLastUpdate instanceof Date)
            || nextProps.fetchErrorLastUpdate.getTime() !== this.props.fetchErrorLastUpdate.getTime())) {
        this.props.navigation.goBack();
      }
      else {
        this.setState ({profession: nextProps.tutor.profession});
        this.setState ({experience: nextProps.tutor.experience});
        this.setState ({achievementList: nextProps.tutor.achievementList});
        

        if (nextProps.tutor.selfIntro === 'null') {
          this.setState ({selfIntro: ''});
        }
        else {
          this.setState ({selfIntro: nextProps.tutor.selfIntro});
        }
      }
      
    }

  }

  constructor(props) {
    super(props);
    const { params = {} }  = this.props.navigation.state;
    if (params.selfIntro === 'null') {
      params.selfIntro = '';
    }
    this.state = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      selfIntro: '',
      profession: '',
      experience: '0',
      achievementList: null,
      avatarUrl: params.avatarUrl,
      showPicker: false,
      showAchievementPicker: false,
      targetIndex: 0,
      isFromYear: false,
    }
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({experience: v})
    this.hidePicker()
  }


  onYearButtonPressed = (data)=> {
    this.setState({showAchievementPicker:true, targetIndex:data.index, isFromYear: data.isFromYear})
  }

  onDeletePressed = (index)=> {
    let achievementList = this.state.achievementList;
    achievementList.splice(index,1)

    for (let i=0; i<achievementList.length; i++) {
      achievementList[i].index = i;
    }

    this.setState({achievementList})
    console.log('achievementList: ', achievementList)
  }

  onTextChanged = (index, text) => {

    let achievementList = this.state.achievementList
    achievementList[index].achievement = text
    this.setState({achievementList})

  }

  handleAchievementCancel = () => {this.setState({showAchievementPicker:false})}
  handleAchievementConfirm = (v) => {
    if (this.state.isFromYear) {
      this.state.achievementList[this.state.targetIndex] = {...this.state.achievementList[this.state.targetIndex], fromYear: v}
    }
    else {
      this.state.achievementList[this.state.targetIndex] = {...this.state.achievementList[this.state.targetIndex], toYear: v}
    }

    this.setState({showAchievementPicker:false})
  }


  renderHeader() {
    let { locale } = this.props      
    let avatar = <Avatar xlarge onPress={this._pickImage} />
    if (this.state.avatarUrl && this.state.avatarUrl != 'null') {
      avatar = <Avatar xlarge uri={this.state.avatarUrl} onPress={this._pickImage}/>
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
    let { locale, tutor } = this.props

    return (
      <View style={styles.container} >
        <KeyboardAwareScrollView >
          {this.renderHeader()}
          <TextInputItems
            fieldName={locale.createTutor.text.tutorName}
            style={styles.textInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
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
          <TextInputItems
            fieldName={locale.createTutor.text.profession}
            style={styles.textInput}
            onChangeText={(profession) => this.setState({profession})}
            value={this.state.profession}
          />
          
          <View style={styles.contentContainer}>
            <Text style={styles.fieldName}>{locale.createTutor.text.experience}</Text>
            <TouchableOpacity onPress = {() => this.showPicker()}>
              <Text style={styles.textInput}>
                {this.state.experience}
              </Text>
            </TouchableOpacity>
          </View>

          {this.achievementItem ()}

          <View style={styles.contentContainer}>
            <Text style={styles.fieldName}>{locale.createTutor.text.selfIntro}</Text>
            <TextInput
              style={styles.introTextInput}          
              onChangeText={(selfIntro) => this.setState({selfIntro})}
              value={this.state.selfIntro}
              multiline={true}
            />
          </View>
          <View style={{width: 400, height: 300}} />
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

          { this.state.showAchievementPicker 
            && <CustomAchievementPicker 
              onCancel={this.handleAchievementCancel}
              onConfirm={this.handleAchievementConfirm}
              locale={this.props.locale}
              year={this.state.isFromYear?this.state.achievementList[this.state.targetIndex].fromYear : this.state.achievementList[this.state.targetIndex].toYear}/>}

        { (this.props.isTutorLoading || this.props.isLoading) && <Spinner intensity={100}/> }
      </View>
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
    let baseURL = appSecrets.aws.apiURL

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

  achievementItem () {
    return (
      <View style={{
        width: '90%',
        paddingLeft: 30,
        marginTop: 5,
      }}>
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            height:30,
            alignItems:'center',
          }}>
            <Text style={styles.achievementTitle}>
            {this.props.locale.signUp.title.achievement}
            </Text>
            <Text 
              style={{
                width: '20%',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {'From'}
            </Text>
            <Text 
              style={{
                width: '20%',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {'To'}
            </Text>
          </View>

          <ScrollView contentContainerStyle={{alignItems: 'center',}}>
            {
              !!this.state.achievementList &&
              this.state.achievementList.length > 0 &&
              this.state.achievementList.map((item, i) => 
                <AchievementItem 
                    key={i}
                    canEdit={true}
                    data={{...item, index:i}}
                    onPressedCallback={this.onYearButtonPressed}
                    onDeletePressedCallback={this.onDeletePressed}
                    onTextChangedCallback={this.onTextChanged}/>
              )
            }
            <TouchableOpacity
              onPress= {()=>{
                let achievementList = this.state.achievementList
                let date = new Date();
                if (achievementList) {
                  achievementList.push({index:achievementList.length, achievement:'', fromYear:date.getFullYear (), toYear:date.getFullYear ()})
                }
                else {
                  achievementList = [{index:0, achievement:'', fromYear:date.getFullYear (), toYear:date.getFullYear ()}]
                }
                this.setState({achievementList})
              }} >
              <MaterialCommunityIcons
                name={'plus-circle-outline'}
                size={25}
                color={Colors.tintColor}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      );
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

class CustomAchievementPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: props.year || '0'
    }
  }

  render() {
    const { locale, year, onCancel, onConfirm } = this.props;

    let date = new Date();
    let curYear = date.getFullYear();
    let yearList = [];


    for (let i = 0; i < 80; i++) {
      yearList.push(curYear-i);
    }

    let pickerItems = yearList.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={''+s} />
    });

    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.year)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>
          }
        </View>
        
        <Picker
          selectedValue={this.state.year}
          style={styles.picker}
          onValueChange={
            (year, itemIndex) => {

              this.setState({year});
            }
          }>
          {pickerItems}
          
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  contentContainer: {
    width: '90%',
    paddingLeft: 30
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
  achievementTitle: {
    
    fontSize: 14,
    width: '60%',
  },
  pickerName: {
    alignSelf: 'center'
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
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  picker: {
    width: '100%',
    backgroundColor: '#FFF'
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.socialLogin.isLoading,
    isTutorLoading: state.tutor.isLoading,
    locale: state.language.locale,
    tutor: state.tutor,
    fetchErrorLastUpdate: state.tutor.fetchErrorLastUpdate,
  }
}

export default connect(mapStateToProps, {
  createTutor,
  updateTutor,
  getTutorDetail,
})(CreateTutorScreen)

