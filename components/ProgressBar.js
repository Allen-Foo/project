import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { connect } from 'react-redux';


class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    const { step, locale } = this.props;

    let width = '80%';
    let total = 5;
    var completePercentage = step / total;
    var remainPercentage = 1 - completePercentage;
    let remainStep = total - step;

    let text = eval(locale.progressBar.stepToGo);

    return (
      <View style = {{width : '80%', alignItems: 'center'}}>
          <Text style = {{}}>
          {text}
          </Text>
          <View style={{ marginTop:10, justifyContent : 'center', alignItems: 'center', backgroundColor: Colors.tintColor, height: 10, width: '100%'}}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E4E4E4', height: '60%', width: '98%'}}>
            <View style={{ backgroundColor: Colors.tintColor, flex:completePercentage}}>
            </View>
            <View style={{ backgroundColor: '#E4E4E4', flex:remainPercentage}}>
            </View>
            </View>
          </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ProgressBar)
