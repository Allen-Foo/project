import React from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window')
import Colors from '../../constants/Colors';
import { getClassList, getCompanyDetail } from '../../redux/actions';
import { Separator, Avatar, Spinner, Slideshow } from '../../components';
import StarRating from 'react-native-star-rating';

class CompanyInfoScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      didMount: false,
      classDetail: null,
      companyDetail: null,
      tutor: null,
    }
  }

  componentWillMount() {
    this.props.getClassList(this.props.classDetail.user.userId);
    this.props.getCompanyDetail(this.props.classDetail.user.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.companyDetail && nextProps.companyDetail != this.props.companyDetail) {
      this.setState({companyDetail: nextProps.companyDetail})
    }
  }

  renderLoading() {
    return <Spinner />
  }

  render() {
    let { classList, locale } = this.props
    let { companyDetail } = this.state;

    console.warn('companyDetail', companyDetail)

    if (!companyDetail || !companyDetail.profile) {
      return this.renderLoading()
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Slideshow 
          dataSource={companyDetail.banner}
          containerStyle={sliderContainer}
          scrollEnabled={true}
        />
        <TouchableOpacity style={styles.chevronContainer} onPress={() => this.props.navigation.goBack()}>
          <Entypo
            name={"chevron-thin-left"}
            size={20}
            color={'#fff'}
          />
        </TouchableOpacity>
        <View style={styles.companyAvatarContainer}>
          <Avatar
            large
            uri={companyDetail.logo}
          />
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{companyDetail.displayName}</Text>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name={"check-square-o"}
                size={20}
                color={'#f72470'}
              />
              <Text style={{marginLeft: 5, color: '#f72470'}}>{locale.classDetail.text.verifiedBy}</Text>
            </View>
            <Text>{companyDetail.slogan}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const sliderContainer = {
  width: width,
  height: width * 3 / 4,
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: '#eee',
  },
  companyAvatarContainer: {
    position: 'absolute',
    top: '80%',
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  chevronContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'transparent',
  },
  usernameText: {
    fontSize: 20,
  },
  usernameContainer: {
    paddingLeft: '5%',
    paddingTop: '18%',
  },
});

const mapStateToPorps = (state) => {
  return {
    locale: state.language.locale,
    isLoggedIn: state.socialLogin.isLoggedIn,
    companyDetail: state.company,
    classList: state.classes.classList,
    classDetail: state.classes.classDetail,
    appType: state.appType.mode,
  }
}

export default connect(mapStateToPorps, {
  getClassList,
  getCompanyDetail,
})(CompanyInfoScreen)
