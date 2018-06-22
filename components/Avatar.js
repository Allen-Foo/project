import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types'; 

const propTypes = {
  fontSize: PropTypes.number,
  icon: PropTypes.object,
};

const defaultProps = {
  fontSize: 13,
  icon: {name: 'account'}
};

class Avatar extends Component {

  render() {
    let { icon, uri, onPress, small, medium, large, xlarge } = this.props;
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
      borderRadius: width /2
    }

    let avatar;
    if (uri) {
      avatar = <Image source={{uri: uri}} style={contanerStyle}/>
    } else {
      avatar = (
        <View style={{...contanerStyle, alignItems: 'center', justifyContent: 'center', backgroundColor: '#BEBEBE'}}>
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
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {avatar}
      </TouchableOpacity>
    )
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = Avatar;
