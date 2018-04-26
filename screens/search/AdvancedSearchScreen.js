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
  AsyncStorage,
  Slider,
  Picker,
} from 'react-native';

import Swiper from 'react-native-swiper';
let {width, height} = Dimensions.get('window');
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator, Spinner} from '../../components';
import icons from '../../assets/icon';
import { connect } from 'react-redux';
import { searchClassList, setFilter } from '../../redux/actions';
import { FontAwesome, Entypo } from '@expo/vector-icons';

class AdvancedSearchScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerLeft = (
      <TouchableOpacity 
        style={styles.headerButtonContainer} 
        onPress={()=>{navigation.goBack(null)}}>
        <Text style={styles.headerButtonText}>{screenProps.locale.common.cancel}</Text>
      </TouchableOpacity>
    )

    let headerRight = (
      <TouchableOpacity 
        style={styles.headerButtonContainer} 
        onPress={()=>{params.handleSearch ? params.handleSearch() : () => console.warn('not define')}}>
        <Text style={styles.headerButtonText}>{screenProps.locale.common.submit}</Text>
      </TouchableOpacity>
    )

    return {
      headerTitle: screenProps.locale.advancedSearch.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerLeft: headerLeft,
      headerRight: headerRight,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      searchPrice: props.filter && props.filter.searchPrice,
      showPicker: false,
      chargeType: props.filter && props.filter.chargeType,
      category: props.filter && props.filter.category,
      skill: props.filter && props.filter.skill,
    }
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ 
      handleSearch: this.handleSearch, 
    });
  }

  handleSearch = () => {
    let {showPicker, ...rest} = this.state
    this.props.setFilter(rest)
    this.props.searchClassList()
    this.props.navigation.navigate('Search', rest)
  }

  handleCategoryReturnData = (categoryData) => {
    const {locale} = this.props;
    this.setState({
      category: categoryData
    })
  }

  handleSkillReturnData = (skillData) => {
    const {locale} = this.props;
    this.setState({
      skill: skillData
    })
  }
  showPicker = () => {this.setState({ showPicker: true })}
  hidePicker = () => {this.setState({ showPicker: false })}
  handleCancel = () => {this.hidePicker()}
  handleConfirm = (v) => {
    this.setState({chargeType: v})
    this.hidePicker()
  }

  render() {
    const { locale, isLoading } = this.props;
    let { category, skill } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tabButton}>
          <Text style={styles.tabText}>
            {locale.advancedSearch.text.category}
          </Text>
        </View>
        <RowButton
          onPress={() => this.props.navigation.navigate('SearchCategory', {returnData: this.handleCategoryReturnData})}
          title={locale.advancedSearch.text.classCategory}
          value={locale.category.types[category]}
        />
        <Separator style={{backgroundColor: '#eee'}}/>
        {
          this.state.category &&
          <RowButton 
            onPress={() => this.props.navigation.navigate('SearchSkill', {category: category, returnData: this.handleSkillReturnData})}
            title={locale.advancedSearch.text.skillCategory}
            value={locale.skill.types[category][skill]}
          />
        }
        <View style={styles.tabButton}>
          <Text style={styles.tabText}>
            {locale.advancedSearch.text.tutionFee}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.chargeTypeButton} 
          onPress={() => this.showPicker()}
        >
          <Text style={styles.subTabText}>
            {locale.advancedSearch.text[this.state.chargeType] || locale.advancedSearch.text.selectChargeType}
          </Text>
          <View style={styles.chargeTypeChevron}>
            <Entypo
              name={"chevron-thin-down"}
              size={15}
              color={'#555'}
            />
          </View>
        </TouchableOpacity>
        <Separator style={{backgroundColor: '#eee'}}/>
        {
          this.state.chargeType && 
          <PriceSlider
            searchPrice={this.state.searchPrice}
            handleValueChange={(value) => this.setState({searchPrice: value})}
            locale={locale}
          />  
        }
        { 
          this.state.showPicker &&
          <ChargeTypePicker
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            locale={locale}
            chargeType={this.state.chargeType}
          />
        }
        { isLoading && <Spinner intensity={30}/> }
      </View>
      
    );
  }
}

class ChargeTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chargeType: props.chargeType || 'perLesson'
    }
  }

  render() {
    const { chargeType, locale, onCancel, onConfirm } = this.props;
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.chargeType)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>  
          }
        </View>
        <Picker
          selectedValue={this.state.chargeType}
          onValueChange={(itemValue) => this.setState({chargeType: itemValue})}>
          <Picker.Item label={locale.advancedSearch.text.perLesson} value='perLesson' />
          <Picker.Item label={locale.advancedSearch.text.perSemester} value='perSemester' />
        </Picker>
      </View>
    )
  }
}

const PriceSlider = props => {
  let { searchPrice, handleValueChange, locale } = props;
  return (
    <View style={styles.slider}>
      {
        searchPrice == 1000 ?
          <Text style={[styles.subTabText, {height: 17}]}>
            {locale.advancedSearch.text.any}
          </Text>
        :
          <Text style={styles.subTabText}>
            {locale.advancedSearch.text.below} $ 
            {searchPrice}
          </Text>
      }
      <Slider
        style={{width: '90%', alignSelf: 'center'}}
        step={50}
        minimumValue={0}
        maximumValue={1000}
        onValueChange={(searchPrice) => handleValueChange(searchPrice)}
        value={searchPrice}
      />
    </View>
  )
}

const RowButton = props => {
  let { title, value, onPress } = props;
  return (
    <TouchableOpacity 
      style={styles.subTabButton}
      onPress={onPress}
    >
      <View>
        <Text style={styles.subTabText}>
          {title}
        </Text>
        { value && <Text style={styles.returnData}> {value} </Text>}
      </View>
      <View style={styles.chevronContainer}>
        <Entypo
          name={"chevron-thin-right"}
          size={15}
          color={'#555'}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  innerRowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  returnData: {
    paddingLeft: 10,
    marginTop: 5,
    color: '#FF5A5F',
  },
  tabText: {
    paddingLeft: 10,
  },
  subTabText: {
    paddingLeft: 10,
  },
  slider: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  chargeTypeButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  chargeTypeChevron: {
    position: 'absolute',
    right: 13,
    top: 15,
  },
  tabButton: {
    paddingVertical: 15,
  },
  subTabButton: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronContainer: {
    paddingRight: 10,
  },
  submitButton: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
    right: '10%',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    paddingVertical: 10,
  },
  headerButtonContainer: {
    paddingHorizontal: 10,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    languageKey: state.language.key,
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    filter: state.filter.filter,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
    searchClassList,
    setFilter,
})(AdvancedSearchScreen)
