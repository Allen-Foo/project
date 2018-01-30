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
import { Hr, NextButton } from '../../components';
import { ImagePicker } from 'expo';
import { Entypo } from '@expo/vector-icons';

let {width, height} = Dimensions.get('window');

class ClassAddressScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.calendar.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
    }
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

  render() {
    let { photoList } = this.state;
    let { params } = this.props.navigation.state;
    params.photoList = photoList

    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
        {
          photoList.map((photo, index) => 
            <ImageBox
              key={index}
              uri={photo.uri}
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
          <NextButton 
            onPress={() => this.props.navigation.navigate('ClassSummary', params)}
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
    });

    if (!result.cancelled) {
      let temp = [...this.state.photoList];
      temp.push({uri: result.uri})

      this.setState({
        photoList: temp
      })
    }
  };
}

const ImageBox = props => {
  let { uri, onDelete } = props;

  return (
    <View style={styles.imageContainer}>
      <Image
       ImageResizeMode={'cover'}
       source={{ uri: uri }} 
       style={{ width: '100%', height: '100%' }} 
      />
      <Entypo
        name={"circle-with-cross"}
        size={25}
        style={styles.deleButton}
        color={'red'}
        onPress={() => onDelete()}
      />
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

export default connect(mapStateToProps)(ClassAddressScreen)

