import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  InteractionManager,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton, Slideshow, Spinner, Toast} from '../../components';

import moment from 'moment';
let {width, height} = Dimensions.get('window');

import axios from 'axios';
import appSecrets from '../../appSecrets';
import { createClass } from '../../redux/actions';
import { NavigationActions } from 'react-navigation';

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

  componentWillReceiveProps(nextProps) {
    // if login success, go to main page
    if (nextProps.createClassSuccess && !this.props.createClassSuccess) {
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'TutorMain' })],
      // });
      // const resetAction = NavigationActions.popToTop()
      

      // InteractionManager.runAfterInteractions(() => {
      //   this.props.navigation.dispatch(resetAction);
      // });
      this.props.navigation.goBack('ClassDescription');
    }

    // if login fail, show message 
    if (nextProps.fetchErrorLastUpdate instanceof Date) {
      if (!(this.props.fetchErrorLastUpdate instanceof Date) ||
        nextProps.fetchErrorLastUpdate.getTime() !== this.props.fetchErrorLastUpdate.getTime()
      ) {
        this.Toast.show();
      }
    }
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
    let { params } = this.props.navigation.state;
    params.userId = this.props.userId;

    // console.warn('params', params)

    return (
      <View style={styles.container}>
        <ClassInfoRow
          label={locale.classSummary.label.title}
          value={params.title}
        />
        <ClassInfoRow
          label={locale.classSummary.label.description}
          value={params.description}
        />
        <ClassInfoRow
          label={locale.classSummary.label.category}
          value={`${params.category} - ${params.skill}`}
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
          <Text style={styles.price}>{`＄ ${params.fee} HKD / lesson`}</Text>
        </TouchableOpacity>
        <Slideshow 
          dataSource={params.photoList}
          containerStyle={sliderContainer}
          scrollEnabled={params.photoList.length > 1}
        />
        <NextButton 
          onPress={() => this.props.createClass(params)}
          text={this.props.locale.common.submit}
        />

        { this.props.isLoading && <Spinner /> }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </View>
    );
  }
}

const ClassInfoRow = props => {
  let { label, value, onPress, textStyle } = props;

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => onPress && onPress()}
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

const sliderContainer = {
  width: width * 0.9,
  height: width * 0.9 * 3 / 4,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingTop: 20,
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
  },
});

const mapStateToProps = (state) => {
  return {
    userId: state.socialLogin.user && state.socialLogin.user.userId,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    createClassSuccess: state.classes.createClassSuccess,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  createClass,
})(ClassSummaryScreen)
