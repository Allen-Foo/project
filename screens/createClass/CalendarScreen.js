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
import ClassPlanner from './ClassPlanner';

import { MaterialIcons } from '@expo/vector-icons';

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
      this.showClassPlanner();
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
    // if no time slots, do not mark
    if (!timeSlots || timeSlots.length < 1) {
      this.setState({showClassPlanner: false})
      return
    }
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
            navigation={this.props.navigation}
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

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale

  }
}
export default connect(mapStateToProps)(CalendarScreen)
