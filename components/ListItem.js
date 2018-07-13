import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ListItem = props => {
  let { title, leftIcon, onPress, iconType } = props;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress()}
    >
      {
        iconType === 'MaterialIcons' && 
        <MaterialIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%'}}
        />
      }
      {
        iconType === 'MaterialCommunityIcons' && 
        <MaterialCommunityIcons
          name={leftIcon.name}
          size={25}
          color={'#555'}
          style={{paddingLeft: '5%'}}
        />
      }

      <Text style={styles.itemText}>{title}</Text>
      <Entypo
        name={"chevron-thin-right"}
        size={18}
        color={'#555'}
        style={styles.chevronRight}
      />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#555',
    borderBottomColor: '#555',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 17,
    paddingLeft: '7%'
  },
  chevronRight: {
    position: 'absolute',
    right: '5%'
  }
});

export default ListItem

