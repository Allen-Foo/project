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


class RepeatScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.repeat.title,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      currentButton: 0,
      endDate: null,
    }
  }

  handleTap = (index) => {
    this.setState({currentButton: index})
  }

  handleConfirmEndDate = (date) => {
    this.setState({
      endDate: date
    })
  }

  render() {
    let { locale } = this.props;
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
        <RepeatButton 
          type={locale.repeat.label.everyDay}
          onTap={this.handleTap}
          index={1}
          isSelected={this.state.currentButton === 1}
          locale={locale}
          onConfirm={this.handleConfirmEndDate}
          endDate={this.state.endDate}
        />
        <RepeatButton
          type={locale.repeat.label.everyWeek}
          onTap={this.handleTap}
          index={2}
          isSelected={this.state.currentButton === 2}
          locale={locale}
          onConfirm={this.handleConfirmEndDate}
          endDate={this.state.endDate}
        />
        <RepeatButton
          type={locale.repeat.label.everyTwoWeek}
          onTap={this.handleTap}
          index={3}
          isSelected={this.state.currentButton === 3}
          locale={locale}
          onConfirm={this.handleConfirmEndDate}
          endDate={this.state.endDate}
        />
        <RepeatButton
          type={locale.repeat.label.everyMonth}
          onTap={this.handleTap}
          index={4}
          isSelected={this.state.currentButton === 4}
          locale={locale}
          onConfirm={this.handleConfirmEndDate}
          endDate={this.state.endDate}
        />
      </View>
    );
  }
}

const RepeatButton = props => {
  let { type, locale, onTap, index, isSelected, neverRepeat, onConfirm, endDate} = props;
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
          onConfirm={onConfirm}
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
        <Text onPress={() => this.setState({ isTimePickerVisible: true })}>
          {moment(this.props.endDate).format('DD/MM/YYYY')}
        </Text>

        <DateTimePicker
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
