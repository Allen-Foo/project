import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { Hr } from '../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class CalendarScreen extends React.Component {

  render() {
    return (
        <View style={styles.selectTimeContainer}>
          <View style={[styles.rowContainer, styles.bottomLine]}>
            <View style={styles.innerRowContainer}>
              <TouchableOpacity>
                <Text style={[styles.text,{color: '#666A6C', }]} 
                      onPress={() => this.props.navigation.navigate('ClassList')}
                > {this.props.locale.common.cancel} 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.text,{color: '#FF5A5F', }]} 
                      onPress={() => this.props.navigation.navigate('ClassList')}> 
                  {this.props.locale.common.confirm} 
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.rowContainer, styles.bottomLine]}>
            <View style={styles.innerRowContainer}>
              <Text style={[styles.text,{color: '#666A6C'}]}> 
                {this.props.locale.common.repeat} 
              </Text>
              <TouchableOpacity>
                <Text style={[styles.text,{color: '#999C9E'}]} 
                      onPress={() => this.props.navigation.navigate('ClassList')}> 
                  {this.props.locale.common.never} 
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style = {{height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {styles.text}>
              1 Jan 2017
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.innerRowContainer}>
              <View style={styles.innerLeftRowContainer}>
                <TouchableOpacity style={[styles.timeButton, {borderTopLeftRadius: 8, borderBottomLeftRadius: 8}]}>
                  <Text style={styles.text} onPress={() => this.props.navigation.navigate('ClassList')}>
                    {this.props.locale.common.start}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.innerRightRowContainer}>
                <TouchableOpacity style={[styles.timeButton, {borderTopRightRadius: 8, borderBottomRightRadius: 8}]}>
                  <Text style={styles.text} onPress={() => this.props.navigation.navigate('ClassList')}>
                    {this.props.locale.common.end}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.text} onPress={() => this.props.navigation.navigate('ClassList')}>
                {this.props.locale.common.addTimeSlot}
              </Text>
            </TouchableOpacity>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    justifyContent:'center',
    color:'#666A6C',
  },
  timeButton: {
    width: 150,
    height: 40,
    borderWidth:1,
    borderColor:'#DFE0DF',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height:40,
    borderRadius: 5,
    borderColor:'#DFE0DF',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  selectTimeContainer:{
    height: 250,
    backgroundColor:'#F0F0F0',
    position:'absolute',
    bottom:0,
    width:'100%',
    //alignItems: 'center',
  },
  rowContainer: {
    height:40,
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: '#E2E3E2'
  },
  innerRowContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  innerLeftRowContainer: {
    paddingLeft: 28,

  },
  innerRightRowContainer: {
    paddingRight: 30,

  }
})

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}
export default connect(mapStateToProps)(CalendarScreen)
