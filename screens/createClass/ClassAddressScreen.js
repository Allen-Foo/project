import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class ClassAddressScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      details: null
    }
  }
  returnData = (data, details) => {
    this.setState({data, details});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ClassAddressAutocomplete', {returnData: this.returnData})}
          >
            <Text>{this.state.data && this.state.data.description}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40, 
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5, 
  },
  rowContainer: {
    flexDirection: 'row',
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

export default ClassAddressScreen
