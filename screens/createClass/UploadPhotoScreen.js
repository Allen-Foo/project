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
import { Hr, NextButton, Spinner } from '../../components';
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
          onPress={this._pickImage}
        >
          <Text style={styles.addButton}>+</Text>
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
  button: {
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
    marginTop: 20,
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
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps, {
  editClass,
})(ClassAddressScreen)

