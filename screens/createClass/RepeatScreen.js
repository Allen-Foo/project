import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { CheckButton } from '../../components';

const REPEAT_TYPE = ['neverRepeat', 'everyDay', 'everyWeek', 'everyTwoWeek', 'everyMonth'];

class RepeatScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;

    let headerRight = (
      <CheckButton onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}} />
    )

    return {
      headerTitle: screenProps.locale.repeat.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.greyColor,
      },
      headerRight,
    }
  };

  constructor(props) {
    super(props);

    let { repeat, selectedDay } = props.navigation.state.params

    // init state with state passed from parent screen
    let index = 0;
    if (repeat && repeat.repeatType) {
      index = REPEAT_TYPE.findIndex((type) => repeat.repeatType === type)
    }

    this.state = {
      liked: false,
      currentButton: index,
      endDate: repeat && repeat.endDate || moment(selectedDay).add(1, 'months'),
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  handleTap = (index) => {
    this.setState({currentButton: index})
  }

  handleConfirmEndDate = (date) => {
    this.setState({
      endDate: date
    })
  }

  _handleSubmit = () => {
    let {currentButton, endDate} = this.state;
    // call the returnData function passed from its parent screen
    this.props.navigation.state.params.returnData({repeatType: REPEAT_TYPE[currentButton], endDate: endDate})
    this.props.navigation.goBack();
  }

  render() {
    let { locale } = this.props;
    let { selectedDay } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.placeholder} />

        <RepeatButton
          type={locale.repeat.label.neverRepeat}
          onTap={this.handleTap}
          index={0}
          isSelected={this.state.currentButton === 0}
          locale={locale}
          neverRepeat={true}
        />
        {
          REPEAT_TYPE.slice(1).map((type, i) => 
            <RepeatButton
              key={i + 1} 
              type={locale.repeat.label[type]}
              onTap={this.handleTap}
              index={i + 1}
              isSelected={this.state.currentButton === i + 1}
              locale={locale}
              onConfirm={this.handleConfirmEndDate}
              startDate={selectedDay}
              endDate={this.state.endDate}
            />
          )
        }
      </View>
    );
  }
}

const RepeatButton = props => {
  let { type, locale, onTap, index, isSelected, neverRepeat, onConfirm, startDate, endDate} = props;
  let buttonStyle = styles.button
  if (isSelected) {
    buttonStyle = [buttonStyle, {borderColor: Colors.tintColor, borderWidth: 3}]
  }
  if (neverRepeat) {
    return (
      <TouchableOpacity style={buttonStyle} onPress={() => onTap(index)}>
        <Text>{type}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={() => onTap(index)}>
      <View style={styles.leftContainer}>
        <Text> {type} </Text>
        <Text> {locale.repeat.label.until} </Text>
      </View>
      <View style={styles.rightContainer}>
        <DateTimePickerText
          disabled={!isSelected}
          onConfirm={onConfirm}
          startDate={startDate}
          endDate={endDate}
        />
      </View>
    </TouchableOpacity>
  )
}

class DateTimePickerText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false
    }
  }

  render() {
    return (
      <View>
        <Text onPress={() => !this.props.disabled && this.setState({ isTimePickerVisible: true })}>
          {moment(this.props.endDate).format('DD/MM/YYYY')}
        </Text>

        <DateTimePicker
          minimumDate={moment(this.props.startDate).toDate()}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={(date) => {
            this.setState({
              isTimePickerVisible: false,
            })
            this.props.onConfirm(date)
          }}
          onCancel={() => this.setState({ isTimePickerVisible: false })}
          mode={'date'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  placeholder: {
    height: '3%',
  },
  button: {
    height: 45,
    width: '90%',
    marginTop: '3%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: '3%',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 1, 
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(RepeatScreen)
