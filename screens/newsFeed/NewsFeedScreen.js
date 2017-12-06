import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';

import { connect } from 'react-redux';

class NewsFeedScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.newsfeed.title,
      headerTitle: screenProps.locale.newsfeed.title,
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

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={mockData.class}
        keyExtractor={(item, index) => (item.avatar)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Tutor data={item} onPress={() => this.props.navigation.navigate('TutorDetail')} />
              <Separator />
            </View>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(NewsFeedScreen)
