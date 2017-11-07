import React, { PureComponent } from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import Colors from '../constants/Colors';

class Separator extends PureComponent {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.separator,
  }
});

export default Separator;