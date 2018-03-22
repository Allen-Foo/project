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
  Picker
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { Slideshow } from '../../components';
import { SearchBar } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator, Spinner } from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList, sortClassList } from '../../redux/actions';

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
      showPicker: false,
      sortingItem: null,
    }
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({sortingItem: v}, () => {
      console.warn('sortingItem', this.state.sortingItem)
      let sortType = null;
      let isAscending = this.state.sortingItem.includes('Asc');
      if (this.state.sortingItem.includes('price')) {
        sortType = 'fee';
      } else if (this.state.sortingItem.includes('rating')) {
        sortType = 'totalRatings'
      } else if (this.state.sortingItem.includes('comment')) {
        sortType = 'totalComments'
      }
      console.warn('category', category)
      console.warn('isAscending', isAscending)
      console.warn('sortType', sortType)
      let {searchPrice, chargeType, category, skill} = this.state
      this.props.searchClassList({
        advancedSearch:{
          ...this.props.navigation.state.params,
          sortType,
          isAscending
        }
      })
    })
    this.hidePicker()
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
    let { locale } = this.props;
    
    if (this.props.isLoading || !this.props.filteredClassList) {
      return <Spinner />
    } else if (this.props.filteredClassList.length < 1) {
      return this.renderEmptyPage()
    }

    return (
      <View style={{flex:1}}>
        <TouchableOpacity 
          style={styles.chargeTypeButton} 
          onPress={() => this.showPicker()}
        >
          <Text style={styles.subTabText}>
            {locale.searchResult.label[this.state.sortingItem] || locale.searchResult.label.selectSortingType}
          </Text>
          <View style={styles.chargeTypeChevron}>
            <Entypo
              name={"chevron-thin-down"}
              size={15}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.searchBarRowContainer}>
            {
              this.props.filteredClassList &&
              this.props.filteredClassList.map((cls, index) => (
                <View key={index} style={{width: '100%'}}>
                  <Tutor data={cls} onPress={() => this.props.navigation.navigate('TutorDetail', {classId: cls.classId})} />
                  <Separator style={{backgroundColor: '#aaa'}}/>
                </View>
              ))
            }
          </View>
        </ScrollView>
        { 
          this.state.showPicker &&
          <SortingPicker
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            locale={locale}
            sortingItem={this.state.sortingItem}
          />
        }
      </View>
    );
  }
}

class SortingPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortingItem: props.sortingItem || 'priceAscOrder'
    }
  }

  render() {
    const { sortingItem, locale, onCancel, onConfirm } = this.props;
    console.warn('SortingPicker, sortingItem', this.state.sortingItem)
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.sortingItem)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>  
          }
        </View>
        <Picker
          selectedValue={this.state.sortingItem}
          onValueChange={(itemValue) => this.setState({sortingItem: itemValue})}>
          <Picker.Item label={locale.searchResult.label.priceAscOrder} value={'priceAscOrder'} />
          <Picker.Item label={locale.searchResult.label.priceDescOrder} value={'priceDescOrder'} />
          <Picker.Item label={locale.searchResult.label.ratingAscOrder} value={'ratingAscOrder'} />
          <Picker.Item label={locale.searchResult.label.ratingDescOrder} value={'ratingDescOrder'} />
          <Picker.Item label={locale.searchResult.label.commentAscOrder} value={'commentAscOrder'} />
          <Picker.Item label={locale.searchResult.label.commentDescOrder} value={'commentDescOrder'} />
        </Picker>
      </View>
    )
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
  chargeTypeButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  subTabText: {
    paddingLeft: 10,
  },
  chargeTypeChevron: {
    position: 'absolute',
    right: 13,
    top: 15,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
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
  sortClassList,
  searchClassList
})(SearchClassResultScreen)
