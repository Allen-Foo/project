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
import { createClass, editClass } from '../../redux/actions';
import { Hr, NextButton} from '../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import ClassPlanner from './ClassPlanner';

import { MaterialIcons } from '@expo/vector-icons';

class CalendarScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <MaterialIcons
          name={"check"}
          size={30}
          style={{ paddingRight: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      title: params.isEditMode ? null : screenProps.locale.calendar.title,
      headerRight: params.isEditMode ? headerRight : null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
    }
  };

  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    let markedDates = {};
    if (params.time) {
      Object.keys(params.time).forEach(key => markedDates[key] = {marked: true})
    }

    this.state = {
      showClassPlanner: false,
      markedDates: markedDates,
      selectedDay: null, // dateString 2018-01-11
      time: params.time
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.editClass({time: this.state.time})
    this.props.navigation.goBack();
  }

  handleDayPress = (day) => {
    // if press the same day, do nothing
    if (day.dateString === this.state.selectedDay) {
      this.showClassPlanner();
      return
    }

    let temp = this.state.markedDates || {};
    Object.keys(temp).forEach(key => {
      if (temp[key].selected && temp[key].marked) {
        delete temp[key].selected
      } else if (temp[key].selected) {
        delete temp[key]
      }
    })
    temp[day.dateString] = Object.assign({}, temp[day.dateString], {selected: true})
    this.setState({
      markedDates: temp,
      selectedDay: day.dateString,
      showClassPlanner: true,
    })
  }

  handleConfirm = (timeSlots, repeat) => {
    let allMarkedDates = [this.state.selectedDay];
    if (repeat && repeat.endDate && repeat.repeatType) {
      allMarkedDates = getRepeatedDates(this.state.selectedDay, repeat.endDate, repeat.repeatType)
    }

    let temp = this.state.time || {};
    let tempDates = this.state.markedDates;
    allMarkedDates.forEach(day => {
      // store the time 
      let str = JSON.stringify(timeSlots).replace(this.state.selectedDay, day)
      temp[day] = JSON.parse(str);

      // mark the date with dot
      if (!timeSlots || timeSlots.length < 1) {
        tempDates[day] && (delete tempDates[day].marked);
        delete temp[day]
      } else {
        if (day == this.state.selectedDay) {
          tempDates[day] = {marked: true, selected: true}
        } else {
          tempDates[day] = {marked: true}
        }
      }
    }) 
    
    this.setState({
      time: temp,
      markedDates: tempDates,
      showClassPlanner: false
    });
  }

  handleCancel = () => this.hideClassPlanner()

  showClassPlanner = () => {this.setState({ showClassPlanner: true })}
  hideClassPlanner = () => {this.setState({ showClassPlanner: false })}

  handleNext() {
    let { params = {} } = this.props.navigation.state;
    params.time = this.state.time
    this.props.navigation.navigate('ClassAddress', params)
  }


  render() {
    let { time, selectedDay, startTime, endTime } = this.state;
    let { params = {} } = this.props.navigation.state;

    return (
      <View>
        <View>
          <CalendarList
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={12}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={24}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            minDate={new Date().toISOString().slice(0, 10)}
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
            timeSlots={time && time[selectedDay] || []}
          />
        }
        {
          !this.state.showClassPlanner && this.state.time && Object.keys(this.state.time).length > 0 && !params.isEditMode &&
          <NextButton 
            onPress={() => this.handleNext()}
            text={this.props.locale.common.next}
          />
        }
      </View>
    );
  }
}

const getRepeatedDates = (startDate, endDate, repeatType) => {
  switch (repeatType) {
    case 'everyDay':
      return calculateRepeatedDates(startDate, endDate, 1, 'days')
    case 'everyWeek':
      return calculateRepeatedDates(startDate, endDate, 7, 'days')
    case 'everyTwoWeek':
      return calculateRepeatedDates(startDate, endDate, 14, 'days')
    case 'everyMonth':
      return calculateRepeatedDates(startDate, endDate, 1, 'months')
    default:
      return []
  }
}

// note that the unit of repeatInterval is 'day', but the unit of diff is 'ms'
const calculateRepeatedDates = (startDate, endDate, repeatInterval, type) => {
  let diff = moment(endDate).endOf('day') - moment(startDate).startOf('day');
  let num = Math.floor(moment(endDate).endOf('day').diff(moment(startDate).startOf('day'), type) / repeatInterval)
  if (moment(endDate).endOf('day').diff(moment(startDate).startOf('day').add(num + 1, type))) {
    num = num + 1
  }
  return new Array(num).fill(0).map((n, i) => 
    moment(startDate).add(repeatInterval * i , type).format('YYYY-MM-DD')
  )
}

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale

  }
}
export default connect(mapStateToProps, {
  editClass,
})(CalendarScreen)
