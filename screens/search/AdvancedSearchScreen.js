import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Slider,
  Picker,
} from 'react-native';

import Colors from '../../constants/Colors';
import { Tutor, Separator, Spinner, HeaderButton } from '../../components';
import { connect } from 'react-redux';
import { searchClassList, setFilter } from '../../redux/actions';
import { FontAwesome, Entypo } from '@expo/vector-icons';

class AdvancedSearchScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} }  = navigation.state;

    let headerLeft = (
      <HeaderButton
        onPress={()=>{navigation.goBack(null)}}
        text={screenProps.locale.common.cancel}
      />
    )

    let headerRight = (
      <HeaderButton
        onPress={()=>{params.handleSearch ? params.handleSearch() : () => console.warn('not define')}}
        text={screenProps.locale.common.search}
      />
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
      searchPrice: props.filter && props.filter.searchPrice || 10000,
      chargeType: 'perSemester', // props.filter && props.filter.chargeType,
      category: props.filter && props.filter.category,
      skill: props.filter && props.filter.skill,
      showPicker: false,
    }
  }

  resetState() {
    this.setState({
      searchPrice: 10000,
      chargeType: 'perSemester', // props.filter && props.filter.chargeType,
      category: null,
      skill: null
    })
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
    this.props.navigation.goBack(null)
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
        <Separator style={{backgroundColor: '#eee'}}/>
        {
          this.state.chargeType && 
          <PriceSlider
            searchPrice={this.state.searchPrice}
            handleValueChange={(value) => this.setState({searchPrice: value})}
            locale={locale}
          />  
        }
        <TouchableOpacity 
          style={styles.resetContainer}
          onPress={() => {
            this.resetState()
          }}
        >
          <Text style={styles.reset}>
            {this.props.locale.common.reset}
          </Text>
        </TouchableOpacity>

        { isLoading && <Spinner intensity={30}/> }
      </View>
    );
  }
}

const PriceSlider = props => {
  let { searchPrice, handleValueChange, locale } = props;
  return (
    <View style={styles.slider}>
      {
        searchPrice === 10000 ?
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
        step={100}
        minimumTrackTintColor={Colors.tintColor}
        minimumValue={0}
        maximumValue={10000}
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
  resetContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    color: 'red',
    fontSize: 18,
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
