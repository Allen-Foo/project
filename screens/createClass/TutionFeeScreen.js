import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';

class TutionFee extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.tutionFee.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      tutionFee: null,
      teachingExp: '',
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    params.fee = this.state.tutionFee
    let { locale } = this.props;

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={{paddingLeft: 10}}>{this.props.locale.tutionFee.text.perLesson}</Text>
            <Text style={{marginLeft: 15}}>{this.props.locale.tutionFee.text.price}</Text>
            <Text style={{marginLeft: 100, color: '#FF5A5F'}}>＄</Text>
            <TextInput
              autoFocus
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(tutionFee) => this.setState({tutionFee})}
              value={this.state.tutionFee}
            />
          </View>
          {
            this.state.tutionFee &&
            <NextButton 
              onPress={() => this.props.navigation.navigate('UploadPhoto', params)}
              text={this.props.locale.common.next}
            />
          }
        </View>
      </TouchableWithoutFeedback>
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
