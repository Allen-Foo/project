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
      console.warn('details', details.formatted_address);
      this.address = details.formatted_address;
    }
    if (details && details.geometry && details.geometry.location) {
      console.warn('location', details.geometry.location);
      this.latlng = details.geometry.location;
    }
  }

  render() {
    let { data, details } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{'Please input your address'}</Text>
        <TouchableOpacity
          style={styles.details}
          onPress={() => this.props.navigation.navigate('ClassAddressAutocomplete', {returnData: this.returnData})}
        >
          <Text>{this.state.data && this.state.data.description}</Text>
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
          this.state.data && this.state.data.description &&
          <NextButton 
            onPress={() => this.props.navigation.navigate('TutionFee')}
            locale={this.props.locale}
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
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ClassAddressScreen)

