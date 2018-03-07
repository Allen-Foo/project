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
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { Slideshow } from '../../components';
import { SearchBar } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList } from '../../redux/actions';

class SearchClassResultScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.searchResult.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state={
    }
  }

  renderEmptyPage = () => {
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
    if (this.props.filteredClassList.length < 1) {
      return this.renderEmptyPage()
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBarRowContainer}>
          {
            this.props.filteredClassList &&
            this.props.filteredClassList.map((cls, index) => (
              <View key={index} style={{width: '100%'}}>
                <Tutor data={cls} onPress={() => this.props.navigation.navigate('TutorDetail')} />
                <Separator style={{backgroundColor: '#aaa'}}/>
              </View>
            )
          )
        }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  emptyContainer: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noResultText: {
    paddingTop: 5,
  },
  searchBarRowContainer: {
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    filteredClassList: state.classes.filteredClassList,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  searchClassList
})(SearchClassResultScreen)
