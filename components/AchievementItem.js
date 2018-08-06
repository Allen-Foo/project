// ClassItem.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class AchievementItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: props.data.index,
      achievement: props.data.achievement,
    }
  }

  onPressedButton = (isFromYear)=>{

    if (this.props.onPressedCallback) {
      this.props.onPressedCallback ({index:this.state.index, isFromYear:isFromYear})
    }

  }

  onPressedDelete = ()=> {
    if (this.props.onDeletePressedCallback) {
      this.props.onDeletePressedCallback (this.state.index)
    }
  }

  renderEditMode () {
    return (
      <View style={styles.achievementContainer}>
        <TouchableOpacity
          onPress={this.onPressedDelete}>
          <MaterialCommunityIcons
            name={'close-circle-outline'}
            size={25}
            color={'#a22'}
          />
        </TouchableOpacity>
        <TextInput 
          style={styles.textInput}
          onChangeText={achievement => {
            this.setState({achievement})
            if (this.props.onPressedCallback) {
              this.props.onTextChangedCallback (this.state.index, achievement)
            }
          }}
          value={this.props.data.achievement}
        />
        <TouchableOpacity 
          style={styles.yearButton}
          onPress={() => {
            this.onPressedButton(true);
          }}>
          <Text style = {styles.year}>
            {this.props.data.fromYear}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.yearButton}
          onPress={() => {
            this.onPressedButton(false);
          }}>
          <Text style = {styles.year}>
            {this.props.data.toYear}
          </Text>
          
        </TouchableOpacity>
        
      </View>
    );
  }

  renderDisplayMode () {
    return (
      <View style={styles.displayAchievementContainer}>
        <Text 
          style={styles.displayAchievement}>
          {this.props.data.achievement}
        </Text>
        <View style={styles.displayYearContainer}>
          <Text style = {styles.displayYear}>
            {this.props.data.fromYear + ' - ' + this.props.data.toYear}
          </Text>
        </View>
        
      </View>
    );
  }

  render() {
    
    if (this.props.canEdit) {
      return this.renderEditMode ()
    }
    else {
      return this.renderDisplayMode ()
    }
    
  }
}


const styles = StyleSheet.create({
  yearButton: {
    borderColor: '#E4E4E4', 
    borderWidth: 3, 
    width: '20%',
    height:30,
    backgroundColor: '#FFF',
  },
  year: {
    fontSize: 18,
    textAlign: 'center',
    
  },
  achievementContainer: {
    flexDirection: 'row',
    height:30,
    alignItems:'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#E4E4E4', 
    borderWidth: 3, 
    width: '50%',
    fontSize: 18,
    backgroundColor: '#FFF',
    height:30,
    paddingLeft: 5,
  },
  displayAchievementContainer: {
    flexDirection: 'row',
    borderColor: '#E4E4E4', 
    borderBottomWidth: 1, 
    width:'100%',
    alignItems:'center',
    justifyContent: 'center',
  },
  displayAchievement: {
    width: '60%',
    fontSize: 14,
    paddingLeft: 5,
  },
  displayYearContainer: {
    // borderColor: '#E4E4E4', 
    // borderWidth: 3, 
    width: '40%',
    height:30,
    alignItems:'center',
    justifyContent: 'center',
  },
  displayYear: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf:'center',
  },
})
