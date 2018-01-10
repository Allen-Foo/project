import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

class TutionFee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tutionFee: '',
      teachingExp: ''
    }
  }

  validateInput() {
    if (!this.state.tutionFee) {
      Alert.alert('Tution Fee is empty!')
    } else if (!this.state.teachingExp) {
      Alert.alert('Teaching Experience is empty!')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textInputRow, {paddingTop: '10%'}]}>
          <Text style={styles.text}>
            Tution Fee:
          </Text>
          <TextInput 
            style={styles.textInput}
            onChangeText={tutionFee => {
              // console.warn('text', text);
              this.setState({tutionFee})
            }}
            value={this.state.tutionFee}
          />
        </View>
        <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
        <View style={styles.textInputRow}>
          <Text style={styles.text}>
            Teaching Experience
          </Text>
          <TextInput 
            style={[styles.textInput,{width: '15%'}]}
            onChangeText={teachingExp => {
              // console.warn('text', text);
              this.setState({teachingExp})
            }}
            value={this.state.teachingExp}
          />
          <Text style={styles.text}>
            year/years
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  text: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    height: 40, 
    borderColor: 'grey', 
    //borderBottomWidth: 1, 
    width: '50%',
    fontSize: 14,
    backgroundColor:'#FFF',
    paddingLeft:10,
    marginLeft: 10,
    marginRight:10,
  },
  textInputRow: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    height: 60, 
    width: '100%',
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 15, 
    flexDirection: 'row',
    paddingVertical: '2%',
  },
});

export default TutionFee
