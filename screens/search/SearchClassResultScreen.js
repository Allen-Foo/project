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
import { searchClassList, sortClassList, setSort } from '../../redux/actions';
import { calcDistanceBetween } from '../../lib/Helpers';

class SearchClassResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortingItem: null,
      showPicker: false,
      sortType: props.sort && props.sort.sortType,
      isAscending: props.sort && props.sort.isAscending,
    }
  }

  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({sortingItem: v}, () => {
      // console.warn('sortingItem', this.state.sortingItem)
      // let sortType = null;
      let isAscending = this.state.sortingItem.substring(0, 3) === 'asc';
      let sortType = this.state.sortingItem.substring(3)

      this.props.setSort({sortType, isAscending})
      
      this.props.searchClassList()
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
    let { currentLocation } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBarRowContainer}>
          {
            list && list.map((cls, index) => {
              let clsLocation = cls.address.coordinate
              if (clsLocation === 'On site') {
                cls.distance = 'On site'
              } else if (clsLocation && clsLocation.lat && clsLocation.lng && currentLocation && currentLocation.latitude && currentLocation.longitude) {
                cls.distance = calcDistanceBetween(clsLocation.lat, clsLocation.lng, currentLocation.latitude, currentLocation.longitude)
              }
              return (
                <View key={index} style={{width: '100%'}}>
                  <Tutor data={cls} onPress={() => this.props.navigation.navigate('TutorDetail', {classId: cls.classId})} />
                  <Separator style={{backgroundColor: '#aaa'}}/>
                </View>
              )
            })
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

  getSortingItem() {
    let { sortType, isAscending } = this.state;
    if (sortType && isAscending !== null) {
      let isAscend = isAscending === true ? 'asc' : 'des'
      return isAscend + sortType
    }
    return null
  }

  render() {
    let { locale, keyword, address } = this.props;
    
    return (
      <View style={{flex:1}}>
        <SearchBar
          handleTextInputPress={() => this.props.handleTextInputPress()}
          handleFilterPress={() => this.props.handleFilterPress()}
          handleToggleMode={() => this.props.handleToggleMode()}
          locale={locale}
          keyword={keyword}
          address={address}
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
            sortingItem={this.getSortingItem()}
          />
        }
      </View>
    );
  }
}

const SearchBar = props => {
  let placeholder = (
    <Text style={{color: '#999'}}>
     {props.locale.searchResult.placeholder.typeHere}
    </Text>
  )
  if (props.keyword || props.address) {
    placeholder = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#333'}}>
          {props.keyword}
        </Text>
        <Text style={{color: '#999', fontSize: 12, paddingLeft: 10,}}>
          {props.address}
        </Text>
      </View>
    )
  }

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
          { placeholder }
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
      sortingItem: props.sortingItem || 'ascfee'
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
          <Picker.Item label={locale.searchResult.label.ascfee} value={'ascfee'} />
          <Picker.Item label={locale.searchResult.label.desfee} value={'desfee'} />
          <Picker.Item label={locale.searchResult.label.asctotalRatings} value={'asctotalRatings'} />
          <Picker.Item label={locale.searchResult.label.destotalRatings} value={'destotalRatings'} />
          <Picker.Item label={locale.searchResult.label.asctotalComments} value={'asctotalComments'} />
          <Picker.Item label={locale.searchResult.label.destotalComments} value={'destotalComments'} />
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
    currentLocation: state.filter.currentLocation,
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.filter.isLoading,
    sort: state.filter.sort,
    keyword: state.filter.keyword,
    address: state.filter.address,
    filteredClassList: state.filter.filteredClassList,
    fetchErrorMsg: state.filter.fetchErrorMsg,
    fetchErrorLastUpdate: state.filter.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  sortClassList,
  searchClassList,
  setSort,
})(SearchClassResultScreen)
