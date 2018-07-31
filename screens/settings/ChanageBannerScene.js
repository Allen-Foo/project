import React from 'react';
import { 
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { setCompanyBanner } from '../../redux/actions';
import { ProgressBar, NextButton, Separator, Toast, Spinner, CheckButton } from '../../components';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import appSecrets from '../../appSecrets';
let {width, height} = Dimensions.get('window');

class ChanageBannerScene extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {

    const { params = {} } = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.updateComplete ? params.updateComplete() : () => console.warn('not define')}} />
    )

    return {
      title: screenProps.locale.signUp.title.banner,
      headerTintColor: '#fff',
      headerRight,
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      banner: props.banner || []
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ updateComplete: this.updateComplete });
  }

  updateComplete = () => {
    if (!this.state.banner
      || this.state.banner.length == 0) {
      this.Toast.show();
    }
    else {
      this.props.setCompanyBanner (this.state.banner);
      // Next step
      this.props.navigation.goBack ();
    }
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
      let newstate = this.state.banner.map((photo, i) => {
        if (i === index) {
          return {
            ...photo,
            location: res.data.Location,
            isLoading: false
          }
        }
        return photo
      })

      this.setState({banner: newstate})
    }).catch(err => console.warn(err))
  }

  handleDeletePhoto = (index) => {
    Alert.alert(
      'Warning',
      this.props.locale.uploadPhoto.deletePhotoSentence,
      [
        {text: this.props.locale.common.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: this.props.locale.common.ok, onPress: () => {
          let temp = [...this.state.banner];
          temp.splice(index, 1);
          this.setState({
            banner: temp
          })
        }},
      ],
    )
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}

  _pickImage = async () => {
    if (this.state.banner.length === 4) {
      Alert.alert('cannot add more than four photos')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      let temp = [...this.state.banner];
      result.isLoading = true
      temp.push(result)
      this.setState({
        banner: temp
      }, () => this.uploadPhoto(result, this.state.banner.length - 1))
    }
  };

  _takePhoto = async () => {
    if (this.state.banner.length === 4) {
      Alert.alert('cannot add more than four photos')
      return
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      let temp = [...this.state.banner];
      result.isLoading = true
      temp.push(result)
      this.setState({
        banner: temp
      }, () => this.uploadPhoto(result, this.state.banner.length - 1))
    }
  };

  render() {
    let { locale } = this.props
    let { banner } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.question}>{locale.signUp.text.banner.label}</Text>

           <View style={styles.photoContainer}>
          {
            banner.map((photo, index) => 
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
              if (this.state.banner.length === 4) {
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
          <Toast timeout={3000} ref={(r) => { this.Toast = r; }} text={'At least one banner is needed'} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
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
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 20,
  },
  question: {
    fontSize: 22,
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
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
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    banner: state.company.banner,
  }
}

export default connect(mapStateToProps, {
  setCompanyBanner,
})(ChanageBannerScene)
