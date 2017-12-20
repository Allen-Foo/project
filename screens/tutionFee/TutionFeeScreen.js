import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker
} from 'react-native';


import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

class TutionFee extends React.Component {

  validateInput() {
    if (!this.state.tutionFee) {
      Alert.alert('Tution Fee is empty!')
    } else if (!this.state.teachingExp) {
      Alert.alert('Teaching Experience is empty!')
    } 

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            TutionFee:
          </Text>
          <TextInput 
          style={styles.textInput}
          onChangeText={tutionFee => {
            // console.warn('text', text);
            this.setState({tutionFee})
          }}
          value={this.state.tutionFee}
          />
          <Picker selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

          <Text>
            Teaching Experience
          </Text>
          <TextInput 
          style={styles.textInput}
          onChangeText={teachingExp => {
            // console.warn('text', text);
            this.setState({teachingExp})
          }}
          value={this.state.teachingExp}
          />
          <Text>
            year/years
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Category')}
          >

            <Text style={styles.text}> Next</Text>
          </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold'
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
