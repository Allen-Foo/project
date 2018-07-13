import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';

import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import { Separator } from '../../components';

class TermsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    return {
      headerTitle: screenProps.locale.terms.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  render() {
    let { locale } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>
          {locale.terms.body}
        </Text>
        <Text style={styles.text}>
          {locale.terms.privacy}
        </Text>
        <View style={{height: 50}}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
  },
  text: {
    color:'black',
    textAlign: 'justify',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps , {

})(TermsScreen)
