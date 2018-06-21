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
    let { icon, uri, onPress } = this.props;
    let avatar;
    if (uri) {
      avatar = <Image source={{uri: uri}} style={styles.avatar}/>
    } else {
      avatar = (
        <View style={[styles.avatar, {alignItems: 'center', justifyContent: 'center', backgroundColor: '#BEBEBE'}]}>
          <MaterialCommunityIcons
            name={icon.name} 
            size={25}
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
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
});

module.exports = Avatar;
