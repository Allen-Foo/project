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
      tutionFee: null,
      teachingExp: '',
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    params.fee = this.state.tutionFee
    let { locale } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={{paddingLeft: 10}}>{this.props.locale.tutionFee.text.perLesson}</Text>
          <Text style={{marginLeft: 15}}>{this.props.locale.tutionFee.text.price}</Text>
          <Text style={{marginLeft: 160, color: '#FF5A5F'}}>＄</Text>
          <TextInput 
            style={styles.textInput}
            keyboardType='number-pad'
            onChangeText={(tutionFee) => this.setState({tutionFee})}
            onSubmitEditing={this.handleNext}
            value={this.state.tutionFee}
          />
        </View>
        {
          this.state.tutionFee &&
          <NextButton 
            onPress={() => this.props.navigation.navigate('ClassSummary', params)}
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
