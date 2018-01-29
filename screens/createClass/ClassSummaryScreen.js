import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton} from '../../components';
import moment from 'moment';

class ClassSummaryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.classSummary.title,
      headerTintColor: 'black',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      rowContainer: null
    }
  }

  handleSubmit = () => {

  }

  /* the format of time is like this 

    time: {
      2018-01-17: [
        {
          "endTime": "2018-01-16T17:00:00.000Z",
          "startTime": "2018-01-16T16:00:00.000Z",
        },
        {
          "endTime": "2018-01-16T20:00:00.000Z",
          "startTime": "2018-01-16T18:00:00.000Z",
        },
      ],
      2018-01-18: [
        {
          "endTime": "2018-01-16T17:00:00.000Z",
          "startTime": "2018-01-16T16:00:00.000Z",
        },
      ],
    },
  */
  formateTime = (time) => {
    let allTimeSlots = []
    Object.values(time).forEach(date => date.forEach(timeSlot => allTimeSlots.push(timeSlot)))

    let formattedTimeSlots = [];

    allTimeSlots.forEach((timeSlot, index) => {
      // only show 5 time slots
      if (index < 5) {
        let str = `${moment(timeSlot.startTime).format('YYYY-MM-DD')} from ${moment(timeSlot.startTime).format('HH:mm')} to ${moment(timeSlot.endTime).format('HH:mm')}`
        formattedTimeSlots.push(str)
      } else if (index == 5) {
        formattedTimeSlots.push('...')
      }
    })

    return formattedTimeSlots.join('\n')
  }
 
  render() {
    let { data, details,  } = this.state;
    let { props } = this.props;
    let { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Please confirm the following information:'}</Text>
        <ClassInfoRow
          label={locale.classSummary.label.category}
          value={params.category}
        />
        <ClassInfoRow
          label={locale.classSummary.label.skill}
          value={params.skill}
        />
        <ClassInfoRow
          label={locale.classSummary.label.time}
          value={this.formateTime(params.time)}
          textStyle={{textAlign: 'center',}}
        />
        <ClassInfoRow
          label={locale.classSummary.label.address}
          value={params.address.formatted_address}
        />
        <TouchableOpacity style={styles.rowContainer}>
          <Text style={styles.label}>{locale.classSummary.label.fee}</Text>
          <Text style={styles.price}>{`＄ ${params.fee} HKD / hr`}</Text>
        </TouchableOpacity>
        <NextButton 
          onPress={() => this.handleSubmit()}
          locale={this.props.locale}
        />
      </View>
    );
  }
}

const ClassInfoRow = props => {
  let { label, value, onPress, textStyle } = props;

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => onPress()}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.text, textStyle]}>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
  },
  label: {
    fontWeight: '600'
  },
  text: {
    
  },
  price: {
    marginLeft: 160,
    color: '#FF5A5F',
    fontWeight: '500',
  },
  rowContainer: {
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassSummaryScreen)
