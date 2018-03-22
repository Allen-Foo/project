import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {
  index: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class IndexMarker extends React.Component {
  render() {
    const { fontSize, index, isSelected } = this.props;
    let backgroundColor = isSelected ? '#5ECC3F' : '#FF5A5F'
    let borderColor = isSelected ? '#42903F' : '#D23F44'
    return (
      <View style={styles.container}>
        <View style={[styles.bubble, {backgroundColor, borderColor}]}>
          <Text style={[styles.index, { fontSize }]}>{index}</Text>
        </View>
        <View style={[styles.arrowBorder, {borderTopColor: backgroundColor}]} />
        <View style={[styles.arrow, {borderTopColor: borderColor}]} />
      </View>
    );
  }
}

IndexMarker.propTypes = propTypes;
IndexMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 2,
    borderRadius: 3,
    borderWidth: 0.5,
  },
  index: {
    color: '#FFFFFF',
    fontSize: 13,
    paddingHorizontal: 2,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default IndexMarker;