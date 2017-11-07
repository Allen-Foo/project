import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';

import { mockData } from '../../constants/mockData';

import Tutor from '../../components/Tutor';
import Separator from '../../components/Separator';


class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      headerTitle: state.params && state.params.title ? state.params.title : '',
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },  
    }
  };

  constructor(props) {
    super(props);
    this.state={
      liked: false
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({title: this.props.locale.newsfeed.title})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.languageKey !== nextProps.languageKey) {
      this.props.navigation.setParams({title: nextProps.locale.newsfeed.title})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          mockData.map((data, index) => (
            <View key={index} style={{width: '100%'}}>
              <Tutor data={data} />
              <Separator />
            </View>  
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(NewsFeedScreen)
