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

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClassPlanner: false,
      markedDates: null,
      selectedDay: null, // dateString 2018-01-11
      data: null
    }
  }

  handleDayPress = (day) => {
    // if press the same day, do nothing
    if (day.dateString === this.state.selectedDay) {
      return
    }

    // console.warn('selected day', day.dateString)
    let temp = this.state.markedDates || {};
    Object.keys(temp).forEach(key => {
      if (temp[key].selected && temp[key].marked) {
        delete temp[key].selected
      } else if (temp[key].selected) {
        delete temp[key]
      }
    })
    temp[day.dateString] = Object.assign({}, temp[day.dateString], {selected: true})
    // console.warn('temp', temp)
    this.setState({
      markedDates: temp,
      selectedDay: day.dateString,
      showClassPlanner: true,
    })
  }

  handleConfirm = (timeSlots) => {
    // store the data 
    let temp = this.state.data || {};
    temp[this.state.selectedDay] = timeSlots

    // mark the date with dot
    let tempDate = this.state.markedDates;
    tempDate[this.state.selectedDay] = {marked: true, selected: true}

    this.setState({
      data: temp,
      markedDates: tempDate,
      showClassPlanner: false
    });
  }

  handleCancel = () => this.hideClassPlanner()

  showClassPlanner = () => {this.setState({ showClassPlanner: true })}
  hideClassPlanner = () => {this.setState({ showClassPlanner: false })}


  render() {
    let { data, selectedDay, startTime, endTime } = this.state;

    return (
      <View>
        <View>
          <CalendarList
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
            showWeekNumbers={true}
            onDayPress={this.handleDayPress}
            markedDates={this.state.markedDates}
          />
        </View>
        {
          this.state.showClassPlanner &&
          <ClassPlanner
            selectedDay={selectedDay}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
            locale={this.props.locale}
            timeSlots={data && data[selectedDay] || []}
          />
        }
      </View>
    );
  }
}

class ClassPlanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSlots: this.props.timeSlots,
    }
  }

  componentWillReceiveProps(nextProps) {
    // if change the day, the timeslot will change at the same time 
    // load the timeslot 
    if (nextProps.timeSlots != this.state.timeSlots) {
      this.setState({
        timeSlots: nextProps.timeSlots,
      })
    }
  }

  handleStartTimeConfirm = (time, index) => {
    let slot = {
      ...this.state.timeSlots[index],
      startTime: time
    }
    let temp = this.state.timeSlots;
    temp[index] = slot;
    this.setState({
      timeSlots: temp
    })
  }

  handleTimeConfirm = (time, index, key) => {
     let slot = {
      ...this.state.timeSlots[index],
      [key]: time
    }
    let temp = this.state.timeSlots;
    temp[index] = slot;
    this.setState({
      timeSlots: temp
    })
  }

  handleAddTimeSlot() {
    if (this.state.timeSlots.length === 3) {
      Alert.alert('cannot add more than three time slots')
      return
    }
    let temp = this.state.timeSlots;
    temp.push({
      startTime: moment(),
      endTime: moment().add(1, 'hours')
    })

    this.setState({
      timeSlots: temp
    })
  }

  render() {
    const { selectedDay, onConfirm, onCancel } = this.props;
    let { timeSlots } = this.state;

    return (
      <View style={styles.selectTimeContainer}>
        <View style={[styles.rowContainer, styles.bottomLine, {backgroundColor: '#ddd'}]}>
          <View style={styles.innerRowContainer}>
            <TouchableOpacity onPress={() => onCancel()}>
              <Text style={[styles.text,{color: '#666A6C', }]}>
                {this.props.locale.common.cancel} 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {onConfirm(this.state.timeSlots)}}>
              <Text style={[styles.text,{color: '#FF5A5F', }]}>
                {this.props.locale.common.confirm} 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.rowContainer, styles.bottomLine, {backgroundColor: '#ccc'}]}>
          <View style={styles.innerRowContainer}>
            <Text style={[styles.text,{color: '#666A6C'}]}> 
              {this.props.locale.common.repeat} 
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ClassList')}>
              <Text style={[styles.text,{color: '#999C9E'}]}>
                {this.props.locale.common.never}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style = {{height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Text style = {styles.text}>
            {selectedDay}
          </Text> 
        </View>
        {
          timeSlots.map((timeSlot, i) => 
            <TimeSlot
              key={i}
              startTime={timeSlot && timeSlot.startTime}
              endTime={timeSlot && timeSlot.endTime}
              onStartTimeConfirm={time => this.handleStartTimeConfirm(time, i)}
              onEndTimeConfirm={time => this.handleEndTimeConfirm(time, i)}
              locale={this.props.locale}
            />
          )
        }
        <TouchableOpacity style={styles.button} onPress={() => this.handleAddTimeSlot()}>
          <Text style={styles.text} >
            {this.props.locale.common.addTimeSlot}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const TimeSlot = props => {
  let {startTime, endTime, onStartTimeConfirm, onEndTimeConfirm, locale} = props;
  return (
    <View style={styles.rowContainer}>
      <View style={styles.innerRowContainer}>
        <View style={styles.innerLeftRowContainer}>
          <TimeButton 
            buttonName={locale.common.start}
            handleTimeName={(startTime) => onStartTimeConfirm(startTime)}
            time={ startTime }
          />
        </View>
        <View style={styles.innerRightRowContainer}>
          <TimeButton 
            buttonName={locale.common.end}
            handleTimeName={(endTime) => onEndTimeConfirm(endTime)}
            time={endTime}
          />
        </View>
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
          {buttonName}
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
  container: {
    flex: 1,
  },
  text: {
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    color:'#666A6C',
  },
  timeButton: {
    width: 150,
    height: 40,
    borderWidth:1,
    borderColor:'#DFE0DF',
    justifyContent: 'center',
    flexDirection:'row',
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
    height: 350,
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
    paddingRight: 29,
  }
})

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale

  }
}
export default connect(mapStateToProps)(CalendarScreen)
