// EditClass.js
import React from 'react';
import {
  StyleSheet,
  ScrollView,
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
import { getClassDetail, updateClass, deleteClass } from '../../redux/actions';
import { NavigationActions } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

class EditClassScreen extends React.Component {
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
      headerTintColor: 'black',
      headerRight: headerRight
    }
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    const { params = {} }  = this.props.navigation.state;
    this.props.getClassDetail(params.classId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requireUpdateClassList && !this.props.requireUpdateClassList) {
      this.props.navigation.goBack();
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

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    this.props.updateClass(this.props.classDetail)
    this.props.navigation.goBack();
  }

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
    let params = this.props.classDetail;

    if (this.props.isLoading || !params) {
      return <Spinner />
    }

    let { locale } = this.props;
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ClassInfoRow
          label={locale.classSummary.label.title}
          value={params.title}
          onPress={() => this.props.navigation.navigate('ClassDescription', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.description}
          value={params.description}
          onPress={() => this.props.navigation.navigate('ClassDescription', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.category}
          value={`${locale.category.types[params.category]} - ${locale.skill.types[params.category][params.skill]}`}
          onPress={() => this.props.navigation.navigate('ClassType', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.time}
          value={this.formateTime(params.time)}
          textStyle={{textAlign: 'center',}}
          onPress={() => this.props.navigation.navigate('Calendar', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.address}
          value={params.address.formatted_address}
          onPress={() => this.props.navigation.navigate('ClassAddress', Object.assign(params, {isEditMode: true}))}
        />
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => this.props.navigation.navigate('TutionFee', Object.assign(params, {isEditMode: true}))}
        >
          <Text style={styles.label}>{locale.classSummary.label.fee}</Text>
          <Text style={styles.price}>{`＄ ${params.fee} HKD ${locale.classSummary.label[params.chargeType]}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadPhoto', Object.assign(params, {isEditMode: true}))}>
          <Slideshow 
            dataSource={params.photoList}
            containerStyle={sliderContainer}
            scrollEnabled={params.photoList.length > 1}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.deleteClass(params)}>
          <Text style={{color: 'white', }}> 
            { locale.common.delete }
          </Text>
        </TouchableOpacity>

        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.fetchErrorMsg} />
      </ScrollView>
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
  price: {
    marginLeft: 140,
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
  deleteButton: {
    height: 40, 
    width: '90%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center', 
    borderRadius: 5, 
    marginVertical: 20,
  }
});

const mapStateToProps = (state) => {
  return {
    userId: state.socialLogin.user && state.socialLogin.user.userId,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    classDetail: state.classes.classDetail,
    requireUpdateClassList: state.classes.requireUpdateClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  getClassDetail,
  updateClass,
  deleteClass,
})(EditClassScreen)
