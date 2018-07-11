// RecordItem.js
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const { height, width } = Dimensions.get('window')

class RecordItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }

  expandCollapse() {
    let isExpanded = this.state.isExpanded;

    this.setState({isExpanded: !isExpanded})
  }

  renderNormal(dateString, statusIcon, statusColor, statusText) {

    return (
      <TouchableOpacity
        style={{
          width: width,
          height: 80,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth:1,
        }}
        onPress={()=>this.expandCollapse ()}
      >

        <View 
          style= {{
            width: 60,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: '#000',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={this.props.icon}
              size={25}
              color={'#555'}>

            </MaterialCommunityIcons>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              right: 2,
              bottom: 2,
            }}
            source={statusIcon}
          />
        </View>
      
        <Text style={styles.text}>
          {this.props.locale.withdraw.title}
        </Text>
        <Text style={styles.amount}>
          {this.props.amount}
        </Text>
        <Text style={styles.date}>
          {dateString}
        </Text>

        <View
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
          }}
          style={{
            width: 75,
            height: 30,
            borderRadius: 12,
            borderColor: statusColor,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 8,
          }}>
          <Text style={{
            justifyContent: 'center',
            fontSize: 12,
            backgroundColor: 'transparent',
            color: statusColor
          }}>
            {statusText}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderExpanded(dateString, statusIcon, statusColor, statusText) {
    let isExpanded = this.state.isExpanded;

    return (
      <TouchableOpacity
        style={{
          width: width,
          height: 210,
          borderWidth:1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}
        onPress={()=>this.expandCollapse ()}
      >
        <View
          style={{
            width: width,
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >

          <View 
            style= {{
              width: 60,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: '#000',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name={this.props.icon}
                size={25}
                color={'#555'}>

              </MaterialCommunityIcons>
            </View>
            <Image
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                right: 2,
                bottom: 2,
              }}
              source={statusIcon}
            />
          </View>
        
          <Text style={styles.text}>
            {this.props.locale.withdraw.title}
          </Text>
          <Text style={styles.amount}>
            {this.props.amount}
          </Text>
          <Text style={styles.date}>
            {dateString}
          </Text>

          <View
            onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
            }}
            style={{
              width: 75,
              height: 30,
              borderRadius: 12,
              borderColor: statusColor,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 8,
            }}>
            <Text style={{
              justifyContent: 'center',
              fontSize: 12,
              backgroundColor: 'transparent',
              color: statusColor
            }}>
              {statusText}
            </Text>
          </View>
        </View>
        <ExtraInfo name = {this.props.locale.withdraw.text.bankAccountName} text = {this.props.data.bankAccountName} />
        <ExtraInfo name = {this.props.locale.withdraw.text.bankName} text = {this.props.data.bankName} />
        <ExtraInfo name = {this.props.locale.withdraw.text.bankAccount} text = {this.props.data.bankAccount} />
      </TouchableOpacity>
    )
  }

  render() {
    const { locale, icon, progress, date, amount, onPress } = this.props;

    tDate = new Date (date);
    let dateString = tDate.getDate() + '/' + (tDate.getMonth()+1) + '/' + tDate.getFullYear() + '\n'
                     + tDate.getHours() + ':' + tDate.getMinutes() + ':' + tDate.getSeconds(); 

    let statusIcon, statusColor, statusText;
    if (progress === 'approved') {
      statusIcon = require('../assets/images/tick.png');
      statusColor = '#65B458';
      statusText = locale.withdrawRecord.text.approved;
    }
    else if (progress === 'rejected') {
      statusIcon = require('../assets/images/cross.png');
      statusColor = '#D23731';
      statusText = locale.withdrawRecord.text.rejected;
    }
    else {
      statusIcon = require('../assets/images/question.png');
      statusColor = '#3B4F9E';
      statusText = locale.withdrawRecord.text.processing;
    }

    if (!this.state.isExpanded) {
      return (this.renderNormal(dateString, statusIcon, statusColor, statusText))
    }
    else {
      return (this.renderExpanded(dateString, statusIcon, statusColor, statusText))

    }
  }


}

const ExtraInfo = props => {
  let {name, text} = props

  return (
    <View
      style={{
        width: width,
        paddingVertical: 5,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          width:'32%',
          textAlign: 'center',
        }}>
        {name}
      </Text>
      <Text
        style={{
          width:'64%',
          paddingVertical:5,
          textAlign: 'center',
          backgroundColor: '#e4e4e4',
        }}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    width:75,
    paddingVertical: 15, 
    fontSize: 16,
    backgroundColor: '#FFF',

  },
  date: {
    width:100,
    paddingVertical: 15, 
    fontSize: 12,
    color: '#777',
    paddingLeft: 5,
  },
  amount: {
    width:70,
    paddingVertical: 15, 
    fontSize: 16,
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps)(RecordItem)
