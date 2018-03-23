import React from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator, Spinner } from '../../components';
import { getFavouriteClassList } from '../../redux/actions';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

class FavouriteScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      tabBarLabel: screenProps.locale.history.favourite,
      headerTitle: screenProps.locale.history.favourite,
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  componentWillMount() {
    if (this.props.user) {
      this.props.getFavouriteClassList(this.props.user.bookmark);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requireUpdateClassList && !this.props.requireUpdateClassList) {
      this.props.getFavouriteClassList(this.props.user.bookmark);
    }
  }

  renderLoading() {
    return <Spinner />
  }

  renderClassList() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.props.favouriteClassList}
        keyExtractor={(item, index) => (index)}
        renderItem={({item}) => {
          return (
            <View style={{width: '100%'}}>
              <Tutor 
                data={item}
                onPress={() => this.props.navigation.navigate('TutorDetail', {classId: item.classId})} 
                handleUnauthorizedCall={() => this.props.navigation.navigate('Signin')}
              />
              <Separator />
            </View>
          )
        }}
      />
    );
  }

  renderEmptyPage() {
    return (
      <View style={styles.emptyContainer}>
        <Entypo
          name={"open-book"}
          size={60}
          color={Colors.tintColor}
        />
        <Text style={styles.noResultText}>{this.props.locale.searchResult.label.noResult}</Text>
      </View>
    )
  }

  render() {
    if (this.props.isLoading) {
      return this.renderLoading()
    } else if (!this.props.favouriteClassList) {
      return this.renderEmptyPage()
    } else {
      return this.renderClassList()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    user: state.socialLogin.user,
    isLoading: state.classes.isLoading,
    favouriteClassList: state.classes.favouriteClassList,
    requireUpdateClassList: state.classes.requireUpdateClassList,
  }
}

export default connect(mapStateToProps, {
  getFavouriteClassList,
})(FavouriteScreen)