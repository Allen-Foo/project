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
import { editClass } from '../../redux/actions';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'

class ClassAddressScreen extends React.Component {
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
      title: params.isEditMode ? null : screenProps.locale.classAddress.title,
      headerTintColor: 'black',
      headerRight: params.isEditMode ? headerRight : null
    }
  };
  
  constructor(props) {
    super(props);
    let { params = {} } = this.props.navigation.state;
    this.state = {
      data: params.address,
      details: params.address,
      checked: params.address && params.address.description == props.locale.classAddress.label.onSite,
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    let { data, details, checked } = this.state;
    let address
    if (checked == true) {
      address = {
      description: this.props.locale.classAddress.label.onSite,
      formatted_address: this.props.locale.classAddress.label.onSite,
      coordinate: this.props.locale.classAddress.label.onSite,
    }
  } else {
      address = {
      description: data && data.description,
      formatted_address: details && details.formatted_address,
      coordinate: details && details.geometry && details.geometry.location
    }
  }

    this.props.editClass({address})
    this.props.navigation.goBack();
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

  handleNext = (params) => {
    if (this.props.user.userRole == 'company') {
      this.props.navigation.navigate('AssignTutor', params)
    } else {
      this.props.navigation.navigate('Contact', params)
    }
  }

  render() {
    let { data, details, checked } = this.state;
    let { params = {} } = this.props.navigation.state;
    let address
    if (checked) {
      address = {
        description: this.props.locale.classAddress.label.onSite,
        formatted_address: this.props.locale.classAddress.label.onSite,
        coordinate: this.props.locale.classAddress.label.onSite,
      }
    } else {
      address = {
        description: data && data.description,
        formatted_address: details && details.formatted_address,
        coordinate: details && details.geometry && details.geometry.location
      }
    }
    params.address = address;
    if(checked){
      return (
        <View style={styles.container}>
          <CheckBox
            title='On Site'
            style={[styles.details,{marginTop: 20}]}
            checked={this.state.checked}
            onPress={this.state.checked ? () => this.setState({checked: false}) : () => this.setState({checked: true})}
          />
          <NextButton 
            onPress={() => this.handleNext(params)}
            text={this.props.locale.common.next}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <CheckBox
            title='On Site'
            style={[styles.details,{marginTop: 20}]}
            checked={this.state.checked}
            onPress={this.state.checked ? () => this.setState({checked: false}) : () => this.setState({checked: true})}
          />
          <View style={styles.line}>
            <Hr text="Or" marginLeft={0} marginRight={0}/>
          </View>
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
            data && data.description && !params.isEditMode &&
            <NextButton 
              onPress={() => this.props.navigation.navigate('TutionFee', params)}
              text={this.props.locale.common.next}
            />
          }
        </View>
      )
    }
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
  },
  line: {
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    user: state.socialLogin.user,
  }
}

export default connect(mapStateToProps, {
  editClass,
})(ClassAddressScreen)

