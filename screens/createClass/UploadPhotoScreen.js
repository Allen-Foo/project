import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';
import { ImagePicker } from 'expo';

class ClassAddressScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
  }


  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.uploadPhotoButton}>
            {<Image source={{ uri: image }} style={{ width: '90%', height: '40%' }} />}
        </View>
        {
          image && <Image source={{ uri: image }} style={{ width: '90%', height: '40%' }} />
        }
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this._pickImage}
          >
            <Text>add more photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPhotoButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5, 
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    height: 40, 
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
  },
  rowContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    height: 40, 
    //borderBottomWidth: 1, 
    width: '20%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassAddressScreen)

