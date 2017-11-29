import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';

import { BlurView } from 'expo';

import Colors from '../constants/Colors'

class Spinner extends Component {

  static propTypes = {
    color: PropTypes.string,
    intensity: PropTypes.number,
  };

  static defaultProps = {
    color: Colors.tintColor,
    intensity: 80,
  };

  render() {
    const { intensity, color } = this.props;
    return (
      <BlurView tint="light" intensity={intensity} style={styles.container}>
        <ActivityIndicator color={color} />
        <Text style={[styles.text, {color: color}]}>
          {this.props.locale.common.loading}
        </Text>
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
  text: {
    paddingTop: '3%'
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(Spinner)
