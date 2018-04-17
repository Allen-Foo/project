import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import {Agenda, Calendar} from 'react-native-calendars';
import moment from 'moment';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

class ScheduleScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerTintColor = '#fff';
    let backgroundColor = Colors.tintColor
    if (screenProps.appType == 'tutor') {
      headerTintColor = '#000';
      backgroundColor = '#f7f7f7'
    }

    let headerRight = (
      <TouchableOpacity onPress={()=>{params.switchMode ? params.switchMode() : () => console.warn('not define')}}>
        <FontAwesome
          name={params.mode === "calendar" ? "calendar" : "calendar-o"}
          size={22}
          color={'white'}
          style={{ paddingRight: 15 }}
        />
      </TouchableOpacity>
    );

    return {
      tabBarLabel: screenProps.locale.schedule.title,
      headerTitle: screenProps.locale.schedule.title,
      headerLeft: null,
      headerRight: headerRight,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: 'agenda',
      items: this.getItems(this.props.classList),
      markedDates: this.getMarkedItems(this.props.classList),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classList !== this.props.classList) {
      let items = this.getItems(nextProps.classList)
      let markedDates = this.getMarkedItems(nextProps.classList)
      this.setState({items, markedDates})
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      switchMode: this.switchMode, 
    });
  }

  switchMode = () => {
    if (this.state.mode === 'agenda') {
      this.setState({mode: 'calendar'})
      this.props.navigation.setParams({ mode: 'calendar' });
    } else {
      this.setState({mode: 'agenda'})
      this.props.navigation.setParams({ mode: 'agenda' });
    }
  }

  getItems(classList) {
    let items = {}
    classList.forEach((classes => {
      Object.keys(classes.time).forEach((date, index) => {
        classes.time[date].forEach(timeSlot => {
          let slot = {
            text: classes.title,
            time: `${moment(new Date(timeSlot.startTime)).format('HH:mm')} - ${moment(new Date(timeSlot.endTime)).format('HH:mm')}`,
            address: classes.address.formatted_address
          }
          items[date] = items[date] || [];
          items[date].push(slot)
        })
      })
    }))
    return items
  }

  getMarkedItems(classList) {
    let markedDates = {}
    classList.forEach((classes => {
      Object.keys(classes.time).forEach((date, index) => {
        classes.time[date].forEach(timeSlot => {
          markedDates[date] = {marked: true}
        })
      })
    }))
    return markedDates
  }

  handleDayPress = (day) => {
    // if press the same day, do nothing
    if (day.dateString === this.state.selectedDay) {
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
    this.renderDayItems(day.dateString)

    this.setState({
      markedDates: temp,
      selectedDay: day.dateString,
      showAgenda: true,
    })
  }

  renderAgenda() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        //loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        selected={new Date().toISOString().slice(0, 10)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={12}
        futureScrollRange={12}
        markedDates={this.state.markedDates}
        //monthFormat={'yyyy'}
        //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  renderDayItems = (day) => {
    if (day && this.state.items && this.state.items[day]) {
      return this.state.items[day].sort((a, b) => {
        let ma = a.time.substring(0, 5)
        let mb = b.time.substring(0, 5)
        if (ma > mb) return 1;
        else if (ma < mb) return -1;
        else return 0;
      }).map((item, index) => (
        <View style={{padding: 5}} key={index}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.text}</Text>
          <Text style={{color: Colors.tintColor}}>{item.time}</Text>
          <Text style={{color: 'purple', fontSize: 12}}>{item.address}</Text>
        </View>
      ))
    }
  }

  renderCalendar() {
    return (
      <View style={{flex: 1}}>
        <Calendar
          selected={new Date().toISOString().slice(0, 10)}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={this.handleDayPress}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          markedDates={this.state.markedDates}
          style={{
            paddingBottom: 30,
          }}
        />
        <View style={styles.agendaItem}>
          <ScrollView>
            {this.renderDayItems(this.state.selectedDay || new Date().toISOString().slice(0, 10))}
          </ScrollView>
        </View>
      </View>
    )
  }

  render() {
    return this.state.mode == 'agenda' ? this.renderAgenda() : this.renderCalendar()
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) { 
          this.state.items[strTime] = [];
          this.state.items[strTime].push([])
        } 
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.text}</Text>
        <Text style={{color: Colors.tintColor}}>{item.time}</Text>
        <Text style={{color: 'purple', fontSize: 12}}>{item.address}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View />
    );
  }

  rowHasChanged(r1, r2) {
    return r1.text !== r2.text;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  agendaItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 17,
    marginTop: 17,
    marginBottom: 17,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    classList: state.classes.classList,
  }
}

export default connect(mapStateToProps)(ScheduleScreen)
