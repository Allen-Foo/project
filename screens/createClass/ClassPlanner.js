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
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { Hr } from '../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

import { MaterialIcons, Entypo } from '@expo/vector-icons';

class ClassPlanner extends React.Component {
  constructor(props) {
    super(props);

    this.initialTimeSlots = [...props.timeSlots];

    this.state = {
      timeSlots: this.props.timeSlots,
      repeat: null
    }
  }

  componentWillReceiveProps(nextProps) {
    // if change the day, the timeslot will change at the same time 
    // load the timeslot 
    if (nextProps.timeSlots !== this.state.timeSlots) {
      this.initialTimeSlots = [...nextProps.timeSlots];

      this.setState({
        timeSlots: nextProps.timeSlots,
      })
    }
    if (nextProps.repeat !== this.state.repeat) {
      this.setState({repeat: null})
    }
  }

  handleReturnData = (data) => {
    this.setState({
      repeat: data
    })
  }

  handleTimeConfirm = (time, index, key) => {
    let {selectedDay} = this.props;
    let t = moment(time).add(moment(selectedDay).diff(moment(time).startOf('day'), 'days'), 'days');

    let slot = {
      ...this.state.timeSlots[index],
      [key]: t
    }
    let temp = [...this.state.timeSlots];
    temp[index] = slot;
    this.setState({
      timeSlots: temp
    })
  }

  handleAddTimeSlot = () => {
    if (this.state.timeSlots.length === 3) {
      Alert.alert('cannot add more than three time slots')
      return
    }
    let {selectedDay} = this.props;
    let temp = [...this.state.timeSlots];
    let st = moment().add(moment(selectedDay).diff(moment().startOf('day'), 'days'), 'days');
    
    temp.push({
      startTime: st,
      endTime: moment(st).add(1, 'hours')
    })

    this.setState({
      timeSlots: temp
    })
  }

  handleDeleteTimeSlot = (index) => {
    let temp = [...this.state.timeSlots];
    temp.splice(index, 1);
    this.setState({
      timeSlots: temp
    })
  }

  render() {
    const { selectedDay, onConfirm, onCancel } = this.props;
    let { timeSlots, repeat } = this.state;

    return (
      <View style={styles.selectTimeContainer}>
        <View style={[styles.rowContainer, styles.bottomLine, {backgroundColor: '#ddd'}]}>
          <View style={styles.innerRowContainer}>
            <TouchableOpacity onPress={() => onCancel()}>
              <Text style={[styles.text, {color: '#FF5A5F', }]}>
                {this.props.locale.common.cancel} 
              </Text>
            </TouchableOpacity>
            {
              (JSON.stringify(timeSlots) !== JSON.stringify(this.initialTimeSlots)  || (repeat && repeat.repeatType)) &&
              <TouchableOpacity onPress={() => {onConfirm(this.state.timeSlots, this.state.repeat)}}>
                <Text style={[styles.text, {color: 'black', fontWeight: '600'}]}>
                  {this.props.locale.common.confirm} 
                </Text>
              </TouchableOpacity>  
            }
          </View>
        </View>
        <View style={[styles.rowContainer, styles.bottomLine, {backgroundColor: '#ccc'}]}>
          <TouchableOpacity 
            style={styles.innerRowContainer}
            onPress={() => this.props.navigation.navigate('Repeat', {returnData: this.handleReturnData, selectedDay, repeat})}
          >
            <Text style={[styles.text, {color: '#666A6C'}]}> 
              {this.props.locale.common.repeat} 
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.text, {color: '#999C9E'}]}>
                {
                  repeat && repeat.repeatType 
                  ? this.props.locale.repeat.label[repeat.repeatType]
                  : this.props.locale.common.never
                } 
              </Text>
              <Entypo
                name={"chevron-thin-right"}
                size={18}
                color={'#999C9E'}
                style={{paddingLeft: 10}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style = {styles.dateText}>
          <Text style = {styles.text}>
            {selectedDay}
          </Text> 
        </View>
        {
          timeSlots.map((timeSlot, i) => 
            <TimeSlot
              key={i}
              index={i}
              startTime={timeSlot && timeSlot.startTime}
              endTime={timeSlot && timeSlot.endTime}
              onStartTimeConfirm={time => this.handleTimeConfirm(time, i, 'startTime')}
              onEndTimeConfirm={time => this.handleTimeConfirm(time, i, 'endTime')}
              onDeleteTimeSlots={() => this.handleDeleteTimeSlot(i)}
              locale={this.props.locale}
            />
          )
        }
        <TouchableOpacity style={styles.button} onPress={() => this.handleAddTimeSlot()}>
          <MaterialIcons
            name={"add-circle"}
            size={25}
            style={{ paddingRight: 5 }}
            color={Colors.tintColor}
          />
          <Text style={styles.text} >
            {this.props.locale.common.addTimeSlot}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const TimeSlot = props => {
  let {startTime, endTime, onStartTimeConfirm, onEndTimeConfirm, onDeleteTimeSlots, locale} = props;
  return (
    <View style={[styles.rowContainer, {paddingHorizontal: 0}]}>
      <View style={[styles.innerRowContainer, {justifyContent: 'center'}]}>
        <View style={[styles.innerLeftRowContainer, {backgroundColor: props.index % 2 === 0 ? '#fff' : '#eee'}]}>
          <TimeButton 
            buttonName={locale.common.start}
            handleTimeName={(startTime) => onStartTimeConfirm(startTime)}
            time={ startTime }
          />
        </View>
        <View style={[styles.innerRightRowContainer, {backgroundColor: props.index % 2 === 0 ? '#fff' : '#eee'}]}>
          <TimeButton 
            buttonName={locale.common.end}
            handleTimeName={(endTime) => onEndTimeConfirm(endTime)}
            time={endTime}
          />
        </View>
        <MaterialIcons
          name={"remove-circle"}
          size={25}
          color={'red'}
          style={styles.deleteButton}
          onPress={()=>{onDeleteTimeSlots()}}
        />
      </View>
    </View>
  )
}

class TimeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false,
    }
  }

  render() {
    const { buttonName, handleTimeName} = this.props;

    return (
      <TouchableOpacity 
        onPress={() => this.setState({isTimePickerVisible: true}) } 
        style={styles.timeButton}
      >
        <Text style={styles.text}>
          {buttonName + ' '}
        </Text>
        <Text style={styles.text}>
          { this.props.time && moment(this.props.time).format('LT') }
        </Text>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={(time) => {
            this.setState({
              isTimePickerVisible: false
            })
            handleTimeName(time)
          }}
          onCancel={() => this.setState({ isTimePickerVisible: false })}
          mode={'time'}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#666A6C',
  },
  timeButton: {
    height: 40,
    borderWidth: 1,
    borderColor: '#DFE0DF',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    width: '60%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DFE0DF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dateText: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTimeContainer: {
    height: '50%',
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  rowContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: '#E2E3E2'
  },
  innerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerLeftRowContainer: {
    width: '50%',
    justifyContent: 'flex-end',
  },
  innerRightRowContainer: {
    width: '50%',
    justifyContent: 'flex-start',
  },
  deleteButton: {
    position: 'absolute',
    right: 5,
    backgroundColor: 'transparent',
  },
})

export default ClassPlanner
