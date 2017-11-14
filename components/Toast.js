import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Toast extends Component {
  static propTypes = {
    inAnimation: PropTypes.string,
    outAnimation: PropTypes.string,
    text: PropTypes.string,
    timeout: PropTypes.number,
    autoHide: PropTypes.bool,
  }

  static defaultProps = {
    autoHide: true,
    timeout: 2000,
    inAnimation: 'fadeInUp',
    outAnimation: 'fadeOutDown',
    text: undefined,
  }

  state = {
    visible: false,
    animationEnded: true,
  }

  show = () => {
    if (this.props.autoHide) {
      clearTimeout(this.state.timeoutVar);
      this.setState({
        visible: true,
        animationEnded: false,
        timeoutVar: setTimeout(() => this.hide(), this.props.timeout),
      });
    } else {
      this.setState({
        visible: true,
        animationEnded: false,
      });
    }
  }

  hide = () => {
    if (this.props.autoHide) clearTimeout(this.state.timeoutVar);
    this.setState({ visible: false, animationEnded: false });
  }

  render() {
    if (!this.state.visible && this.state.animationEnded) return null;
    const {
      text,
      inAnimation,
      outAnimation,
      style,
    } = this.props;
    return (
        <Animatable.View
          animation={this.state.visible ? inAnimation : outAnimation}
          style={styles.container}
          onAnimationEnd={() => this.setState({ animationEnded: true })}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    minHeight: 50,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  text: {
    color: '#fff',
  },
  textContainer: {
    //flex: 1,
    paddingHorizontal: 16,
  },
})

