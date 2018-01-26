import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';
import { ImagePicker } from 'expo';

let {width, height} = Dimensions.get('window');

class ClassAddressScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      photoList: [],
    }
  }

  handleDeletePhoto = (index) => {
    let temp = [...this.state.photoList];
    temp.splice(index, 1);
    this.setState({
      photos: temp
    })
  }

  render() {
    let { image, photoList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
        {
          photoList.map((photo, index) => 
            <ImageBox
              key={index}
              uri={photo.uri}
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

      console.warn('temp', temp)

      this.setState({
        photoList: temp
      })
    }
  };
}

const ImageBox = props => {
  let { uri } = props;

  return (
    <View style={styles.imageContainer}>
      <Image
       ImageResizeMode={'cover'}
       source={{ uri: uri }} 
       style={{ width: '100%', height: '100%' }} 
      />
    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  photoContainer: {
    marginHorizontal: width * 0.05,
    alignItems: 'center',
    // justifyContent: 'center',
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
    fontSize: 50
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassAddressScreen)

