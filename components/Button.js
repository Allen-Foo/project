import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const NextButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.nextButton}>
      <Text style={styles.nextText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const HeaderButton = props => (
  <TouchableOpacity 
    style={styles.headerButtonContainer} 
    onPress={()=>props.onPress()}>
    <Text style={styles.headerButtonText}>{props.text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  nextButton: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
    right: '10%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    borderRadius: 8,
  },
  nextText: {
    color: '#fff',
    paddingVertical: 10,
  },
  headerButtonContainer: {
    paddingHorizontal: 10,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export {
  NextButton,
  HeaderButton,
}