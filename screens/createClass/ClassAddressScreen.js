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

class ClassAddressScreen extends React.Component {
   static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      title: screenProps.locale.classAddress.title,
      headerTintColor: 'black',
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      details: null
    }
  }

  returnData = (data, details) => {
    this.setState({data, details});

    if (details && details.formatted_address) {
      this.address = details.formatted_address;
    }
    if (details && details.geometry && details.geometry.location) {
      // console.warn('location', details.geometry.location);
      this.latlng = details.geometry.location;
    }
  }

  render() {
    let { data, details } = this.state;
    let { params } = this.props.navigation.state;

    let address = {
      description: data && data.description,
      formatted_address: details && details.formatted_address
    }
    params.address = address;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{'Please input your address'}</Text>
        <TouchableOpacity
          style={styles.details}
          onPress={() => this.props.navigation.navigate('ClassAddressAutocomplete', {returnData: this.returnData})}
        >
          <Text>{data && data.description}</Text>
        </TouchableOpacity>
        {
          details && details.formatted_address &&
          <View>
            <Text style={styles.label}> {'Detail Address:'} </Text>
            <Text style={styles.details}>
              {details.formatted_address}
            </Text>
          </View>
        }
        {
          data && data.description &&
          <NextButton 
            onPress={() => this.props.navigation.navigate('TutionFee', params)}
            text={this.props.locale.common.next}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 20,
  },
  label: {
    paddingHorizontal: '5%',
    paddingVertical: 10,
  },
  details: {
    paddingLeft: 5,
    paddingVertical: 15,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassAddressScreen)

