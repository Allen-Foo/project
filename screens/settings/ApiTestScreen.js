import React from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { doGet, doPost } from '../../api/apiTest';
import { Toast, Spinner } from '../../components';
import { BlurView } from 'expo';


class ApiTestScreen extends React.Component {
  static navigationOptions = {
    title: 'API TEST',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    this.Toast = null;
    this.state = {
      message: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message !== this.props.message) {
      this.Toast.show();
    }
  }

  render() {
    const { isFetching, message } = this.props;
    return (
      <View style={styles.container}>
        <Button color={'blue'} title={'GET'} onPress={() => {this.props.doGet()}} />
        <Button color={'red'} title={'POST'} onPress={() => {this.props.doPost()}} />
        { 
          isFetching && <Spinner />
         }
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={message} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    message: state.apiTest.message,
    isFetching: state.apiTest.isFetching
  }
}

export default connect(mapStateToProps, {
  doGet,
  doPost
})(ApiTestScreen)
