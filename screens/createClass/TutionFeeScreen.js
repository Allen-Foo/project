import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';

class TutionFee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tutionFee: '',
      teachingExp: '',
      text: '',
    }
  }

  validateInput() {
    if (!this.state.tutionFee) {
      Alert.alert('Tution Fee is empty!')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={{paddingLeft: 10}}>每堂</Text>
          <Text style={{marginLeft: 15}}>價格</Text>
          <Text style={{marginLeft: 160, color: '#FF5A5F'}}>＄</Text>
          <TextInput 
            style={styles.textInput} 
            keyboardType='number-pad'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        {
          this.state.tutionFee &&
          <NextButton 
            onPress={() => {}}
            locale={this.props.locale}
          />
        }
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginTop: 50
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

export default connect(mapStateToProps)(TutionFee)
