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
  Picker,
  PixelRatio,
} from 'react-native';

import { Constants } from 'expo';
let {width, height} = Dimensions.get('window');
import { Ionicons, Entypo, MaterialIcons, FontAwesome, Foundation} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Tutor, Separator, Spinner } from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList, sortClassList } from '../../redux/actions';

class SearchClassResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      sortingItem: null,
    }
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({sortingItem: v}, () => {
      // console.warn('sortingItem', this.state.sortingItem)
      let sortType = null;
      let isAscending = this.state.sortingItem.includes('Asc');
      if (this.state.sortingItem.includes('price')) {
        sortType = 'fee';
      } else if (this.state.sortingItem.includes('rating')) {
        sortType = 'totalRatings'
      } else if (this.state.sortingItem.includes('comment')) {
        sortType = 'totalComments'
      }
      
      this.props.searchClassList({
        advancedSearch: {
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

  renderList = (list) => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBarRowContainer}>
          {
            list && list.map((cls, index) => (
              <View key={index} style={{width: '100%'}}>
                <Tutor data={cls} onPress={() => this.props.navigation.navigate('TutorDetail', {classId: cls.classId})} />
                <Separator style={{backgroundColor: '#aaa'}}/>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }

  renderContent = () => {
    if (this.props.isLoading || !this.props.filteredClassList) {
      return <Spinner />
    } else if (this.props.filteredClassList.length < 1) {
      return this.renderEmptyPage()
    } else {
      return this.renderList(this.props.filteredClassList)
    }
  } 

  render() {
    let { locale } = this.props;
    
    return (
      <View style={{flex:1}}>
        <SearchBar
          handleTextInputPress={() => this.props.handleTextInputPress()}
          handleFilterPress={() => this.props.handleFilterPress()}
          handleToggleMode={() => this.props.handleToggleMode()}
        />
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
        {
          this.renderContent()
        }
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

const SearchBar = props => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.textInput}>
        <MaterialIcons
          name={"search"}
          size={24}
          color={'#555'}
          style={styles.icon}
        />
        <TouchableOpacity style={styles.inputStyle} onPress={() => props.handleTextInputPress()}>
          <Text style={{color: '#999'}}>
           {'Type Here...'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.handleFilterPress()}>
          <FontAwesome
            name={"filter"}
            size={22}
            color={'#555'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.handleToggleMode()}>
          <Foundation
            name={"map"}
            size={22}
            color={'#555'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
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
    // console.warn('SortingPicker, sortingItem', this.state.sortingItem)
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
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc'
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
  searchBarContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.tintColor,
    paddingHorizontal: '3%',
    paddingBottom: 5,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 10,
    // backgroundColor: '#fff'
  },
  icon: {
    paddingHorizontal: 8,
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
