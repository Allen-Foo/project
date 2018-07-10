// EditClass.js
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Dimensions,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import { Hr, NextButton, Slideshow, Spinner, Toast, CheckButton } from '../../components';

import moment from 'moment';
let {width, height} = Dimensions.get('window');

import { getClassDetail, updateClass, deleteClass } from '../../redux/actions';
import { ServerErrorCode, getLocaleErrorMessage } from '../../constants/ServerErrorCode';
import Colors from '../../constants/Colors';

class EditClassScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}} />
    )
    
    return {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
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

    var errMessage = getLocaleErrorMessage (this.props.locale, this.props.fetchErrorMsg);

    if (this.props.isLoading || !params) {
      return <Spinner />
    }

    let { locale, appliedClassList, user } = this.props;
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
        {
          user.userRole == 'company' &&
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => this.props.navigation.navigate('AssignTutor', Object.assign(params, {isEditMode: true}))}
          >
            <View style={[styles.leftContainer, {justifyContent: 'center'}]}>
              <Text style={styles.label}>{'Tutor'}</Text>
            </View>
            <View style={styles.rightContainer}>
              <AvatarList urlList={params.tutorList && params.tutorList.map(x => x.avatarUrl)} />
            </View>
          </TouchableOpacity>
        }
       
        <ClassInfoRow
          label={locale.classSummary.label.category}
          appliedClassList={appliedClassList}
          classId={params.classId}
          alertMsg={locale.classSummary.label.alertMsg}
          okMsg={locale.common.okMsg}
          value={`${locale.category.types[params.category]} - ${locale.skill.types[params.category][params.skill]}`}
          onPress={() => this.props.navigation.navigate('ClassType', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.time}
          alertMsg={locale.classSummary.label.alertMsg}
          appliedClassList={appliedClassList}
          classId={params.classId}
          okMsg={locale.common.okMsg}
          value={this.formateTime(params.time)}
          textStyle={{textAlign: 'center',}}
          onPress={() => this.props.navigation.navigate('Calendar', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.address}
          appliedClassList={appliedClassList}
          classId={params.classId}
          alertMsg={locale.classSummary.label.alertMsg}
          okMsg={locale.common.okMsg}
          value={params.address.formatted_address}
          onPress={() => this.props.navigation.navigate('ClassAddress', Object.assign(params, {isEditMode: true}))}
        />
        <ClassInfoRow
          label={locale.classSummary.label.contact}
          value={params.phone}
          onPress={() => this.props.navigation.navigate('Contact', Object.assign(params, {isEditMode: true}))}
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
        {
          appliedClassList && appliedClassList.some(list => list.classId === params.classId)?
            <TouchableOpacity style={styles.deleteButton} onPress={() => {
              Alert.alert(
                locale.classSummary.label.deleteMsg,
                null,
                [{text: locale.common.okMsg}],
              )
            }}>
              <Text style={{color: 'white', }}> 
                { locale.common.delete }
              </Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.deleteClass(params)}>
              <Text style={{color: 'white', }}> 
                { locale.common.delete }
              </Text>
            </TouchableOpacity>
        }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={errMessage} />
      </ScrollView>
    );
  }
}

const ClassInfoRow = props => {
  let { label, value, onPress, textStyle, appliedClassList, classId, alertMsg, okMsg } = props;
  if (appliedClassList && appliedClassList.some(list => list.classId === classId)) {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => {
          Alert.alert(
            alertMsg,
            null,
            [{text: okMsg}],
          )
        }}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.text, textStyle]}>{value}</Text>
        </View>
      </TouchableOpacity>
    )
  } else {
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
}

const AvatarList = props => {
  let { urlList } = props
  if (urlList && urlList.length > 0) {
    return (
      <View style={styles.avatarList}>
      {
        urlList.map((url, i) => 
          <Image
            key={i}
            style={{width: 34, height: 34, borderRadius: 17, marginRight: 5}}
            source={{url: url}}
          />
        )
      }
      </View>
    )
  }
  return null
}

const sliderContainer = {
  width: width * 0.9,
  height: width * 0.9 * 3 / 4,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingTop: 20,
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
  },
  avatarList: {
    flexDirection: 'row',
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.userProfile.user,
    userId: state.userProfile.user && state.userProfile.user.userId,
    appliedClassList: state.userProfile.appliedClassList,
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
