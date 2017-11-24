import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { BlurView } from 'expo';

import Colors from '../constants/Colors'

export default class Spinner extends Component {

  static propTypes = {
    color: PropTypes.string,
    intensity: PropTypes.number,
  };

  static defaultProps = {
    color: Colors.tintColor,
    intensity: 100,
  };

  render() {
    const { intensity, color } = this.props;
    return (
      <BlurView tint="light" intensity={intensity} style={styles.container}>
        <ActivityIndicator color={color} />
      </BlurView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
