import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import {Agenda} from 'react-native-calendars';

class ScheduleScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    let headerTintColor = '#fff';
    let backgroundColor = Colors.tintColor
    if (screenProps.appType == 'tutor') {
      headerTintColor = '#000';
      backgroundColor = '#f7f7f7'
    }

    return {
      tabBarLabel: screenProps.locale.schedule.title,
      headerTitle: screenProps.locale.schedule.title,
      headerLeft: null,
      headerTintColor: headerTintColor,
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {
       '2017-11-22': [{text: 'The Darts Factory', time: '10: 00AM - 11:00 AM', tutor: 'Wong Siu Ming'}],
       '2017-11-23': [{text: 'item 2 - any js object'}],
       '2017-11-24': [],
       '2017-11-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
      }
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        //loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        selected={new Date().toISOString().slice(0,10)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={'interactive'}
        markedDates={{
         '2017-11-11': [{textColor: '#666'}],
         '2017-11-14': [{startingDay: true, color: Colors.tintColor}, {endingDay: true, color: Colors.tintColor}],
         '2017-11-21': [{startingDay: true, color: Colors.tintColor}],
         '2017-11-22': [{endingDay: true, color: Colors.tintColor}],
         }}
        //monthFormat={'yyyy'}
        //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
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
      //console.log(this.state.items);
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
        <Text style={{color: 'purple'}}>{item.tutor}</Text>
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
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ScheduleScreen)