import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types'; 

const propTypes = {
  fontSize: PropTypes.number,
  icon: PropTypes.object,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  shape: PropTypes.string,
};

const defaultProps = {
  fontSize: 13,
  shape: 'rounded',
  icon: {name: 'account'}
};

class Avatar extends Component {

  render() {
    let { icon, uri, onPress, onLongPress, small, medium, large, xlarge, shape, ...attributes } = this.props;
    let width = 34
    let height = 34
    if (small) {
      width = 34;
      height = 34;
    } else if (medium) {
      width = 50;
      height = 50;
    } else if (large) {
      width = 75;
      height = 75;
    } else if (xlarge) {
      width = 120;
      height = 120;
    }

    let contanerStyle = {
      width: width, 
      height: height, 
    }

    let Component = onPress || onLongPress ? TouchableOpacity : View;

    let avatar;

    if (uri && uri != 'null') {
      avatar = <Image source={{uri: uri}} style={[contanerStyle, shape == 'rounded' && { borderRadius: width / 2 }]}/>
    } else {
      avatar = (
        <View style={[
          contanerStyle,
          styles.overlayContainer,
          shape == 'rounded' && { borderRadius: width / 2 },
        ]}>
          <MaterialCommunityIcons
            name={icon.name} 
            size={width / 3}
            color={'#BEBEBE'}
            style={{ backgroundColor: '#fff'}}
          />
        </View>
      )
    }

    return (
      <Component
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.container, shape == 'rounded' && { borderRadius: width / 2 }]}
        {...attributes}
      >
        {avatar}
      </Component>
    )
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  overlayContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#BEBEBE',
  }
});

module.exports = Avatar;
