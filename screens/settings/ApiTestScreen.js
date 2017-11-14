import React from 'react';
import { Button, ScrollView, StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { doGet, doPost } from '../../api/apiTest';
import { Toast } from '../../components';


class ApiTestScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    headerLeft: null,
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
    if (nextProps.message !== this.props.message) {
      this.Toast.show();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button color={'blue'} title={'GET'} onPress={() => {
          this.props.doGet()
        }} />
        <Button color={'red'} title={'POST'} onPress={() => {
          this.setState({message: doPost()});
          this.Toast._root.show();
        }} />
        <Toast timeout={5000} ref={(r) => { this.Toast = r; }} text={this.props.message} />
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
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    message: state.apiTest.message
  }
}

export default connect(mapStateToProps, {
  doGet,
})(ApiTestScreen)
