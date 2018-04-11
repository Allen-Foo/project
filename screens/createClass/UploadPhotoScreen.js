import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton, Spinner, Separator } from '../../components';
import { ImagePicker } from 'expo';
import { editClass } from '../../redux/actions';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import appSecrets from '../../appSecrets';

let {width, height} = Dimensions.get('window');

class ClassAddressScreen extends React.Component {
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
      title: params.isEditMode ? null : screenProps.locale.uploadPhoto.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;

    this.state = {
      photoList: params.photoList || [],
      selectType: null,
      showPicker: false,
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    if (this.state.photoList.length < 1) {
      Alert.alert('please upload at least one photo!')
      return
    }
    this.props.editClass(this.state)
    this.props.navigation.goBack();
  }

  uploadPhoto(data, index) {
    let baseURL = appSecrets.aws.apiURL;
    axios({
      method: 'post',
      url: baseURL + '/upload',
      data: {
        key: 'testKey',
        file: data.base64,
      }
    }).then(res => {
      let newstate = this.state.photoList.map((photo, i) => {
        if (i === index) {
          return {
            ...photo,
            location: res.data.Location,
            isLoading: false
          }
        }
        return photo
      })

      this.setState({photoList: newstate})
    }).catch(err => console.warn(err))
  }

  handleDeletePhoto = (index) => {
    Alert.alert(
      'Warning',
      this.props.locale.uploadPhoto.deletePhotoSentence,
      [
        {text: this.props.locale.common.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: this.props.locale.common.ok, onPress: () => {
          let temp = [...this.state.photoList];
          temp.splice(index, 1);
          this.setState({
            photoList: temp
          })
        }},
      ],
    )
  }

  handNext = () => {
    let { params } = this.props.navigation.state;
    params.photoList = this.state.photoList.map(photo => ({
      location: photo.location,
      uri: photo.uri,
      width: photo.width,
      height: photo.height
    }))

    this.props.navigation.navigate('ClassSummary', params)
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}

  render() {
    let { photoList } = this.state;
    let { params = {} } = this.props.navigation.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
        {
          photoList.map((photo, index) => 
            <ImageBox
              key={index}
              uri={photo.location}
              isLoading={photo.isLoading}
              onDelete={() => this.handleDeletePhoto(index)}
            />
          )
        }
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={this._pickImage}
          onPress={() => {
            if (this.state.photoList.length === 4) {
              Alert.alert(this.props.locale.uploadPhoto.cannotAddmoreThanFour)
              return
            }
            this.showPicker()
          }}
        >
          <Entypo
            name={"camera"}
            size={25}
          />
        </TouchableOpacity>
        {
          this.state.photoList && this.state.photoList.length > 0 &&
          this.state.photoList.every(photo => !photo.isLoading) &&
          !params.isEditMode &&
          <NextButton 
            onPress={() => this.handNext()}
            text={this.props.locale.common.next}
          />
        }
        { 
          this.state.showPicker &&
          <SelectTypePicker
            onCancel={this.handleCancel}
            onSelectCamera={() => {
              this.hidePicker();
              this._takePhoto();
            }}
            onSelectPhoto={() => {
              this.hidePicker();
              this._pickImage();
            }}
            locale={this.props.locale}
            // chargeType={this.state.selectType}
          />
        }
      </View>
    );
  }

  _pickImage = async () => {
    if (this.state.photoList.length === 4) {
      Alert.alert('cannot add more than four photos')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      let temp = [...this.state.photoList];
      result.isLoading = true
      temp.push(result)
      this.setState({
        photoList: temp
      }, () => this.uploadPhoto(result, this.state.photoList.length - 1))
    }
  };

  _takePhoto = async () => {
    if (this.state.photoList.length === 4) {
      Alert.alert('cannot add more than four photos')
      return
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      let temp = [...this.state.photoList];
      result.isLoading = true
      temp.push(result)
      this.setState({
        photoList: temp
      }, () => this.uploadPhoto(result, this.state.photoList.length - 1))
    }
  };
}

class SelectTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectType: props.selectType
    }
  }

  render() {
    const { selectType, locale, onCancel, onSelectCamera, onSelectPhoto } = this.props;
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.pickerContent}>
            <Text>{locale.uploadPhoto.text.selectPhotoFrom}</Text>
          </View>
          <Separator style={{backgroundColor: '#eee'}}/>
          <TouchableOpacity style={styles.pickerContent} onPress={() => onSelectCamera()}>
            <Text style={styles.text}>
              {locale.uploadPhoto.text.takePhoto}
            </Text>
          </TouchableOpacity>  
          <Separator style={{backgroundColor: '#eee'}}/>
          <TouchableOpacity style={styles.pickerContent} onPress={() => onSelectPhoto()}>
            <Text style={styles.text}>
              {locale.uploadPhoto.text.selectFromCameraRoll}
            </Text>
          </TouchableOpacity>  
          <Separator style={{backgroundColor: '#eee'}}/>
          <TouchableOpacity style={styles.pickerContent} onPress={() => onCancel()}>
            <Text style={[styles.text, {fontWeight: 'bold' }]}>
              {locale.common.cancel}
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
    )
  }
}

const ImageBox = props => {
  let { uri, onDelete, isLoading } = props;

  return (
    <View style={styles.imageContainer}>
      <Image
       ImageResizeMode={'cover'}
       source={{ uri: uri }} 
       style={{ width: '100%', height: '100%' }} 
      />
      {isLoading && <Spinner intensity={80} showText={false}/> }
      {
        !isLoading &&
        <Entypo
          name={"circle-with-cross"}
          size={25}
          style={styles.deleButton}
          color={'red'}
          onPress={() => onDelete()}
        />
      }
    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingTop: 20,
  },
  photoContainer: {
    marginHorizontal: width * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: width * 0.4,
    height: width * 0.3,
    marginHorizontal: width * 0.025,
    marginVertical: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  pickerContent: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
    marginTop: 20,
    paddingVertical: 10,
  },
  addButton: {
    fontSize: 50,
    fontWeight: '500'
  },
  deleButton: {
    position: 'absolute',
    right: -12.5,
    top: -12.5,
    backgroundColor: 'transparent'
  },
  text: {
    color: '#3476EF',
    fontSize: 16
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(ClassAddressScreen)

