import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
let {width, height} = Dimensions.get('window');
import Colors from '../../constants/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';


class ChangePasswordScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { params = {} } = navigation.state;
      let headerRight = (
        <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
          <MaterialIcons
            name={"check"}
            size={30}
            style={{ paddingRight: 15 }}
          />
        </TouchableOpacity>
      );

      return {
        headerTitle: screenProps.locale.changePw.title,
        headerTintColor: Colors,
        headerRight,
      }
    };

    componentDidMount() {
        // We can only set the function after the component has been initialized
      this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
    }

    _handleSubmit = () => {
      //this.props.updateProfile(this.state)
      this.props.navigation.goBack();
    }
  constructor(props) {
    super(props);

    this.state = {
      currentPw: '',
      newPw: '',
      confirmPw:'',
    }
  }

  render() {
    let { locale } = this.props
    return (
      <View style={styles.container}>
        <View style={[styles.rowContainer, {marginTop: 50}]}>
          <Text style={styles.textTag}>{locale.changePw.text.currentPw}</Text>
          <TextInput 
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(currentPw) => this.setState({currentPw})}
            value={this.state.currentPw}
          />
        </View>
        <View style={[styles.rowContainer,{marginTop: 40}]}>
          <Text style={styles.textTag}>{locale.changePw.text.newPw}</Text>
          <TextInput 
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(newPw) => this.setState({newPw})}
            value={this.state.newPw}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textTag}>{locale.changePw.text.confirmPw}</Text>
          <TextInput 
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(confirmPw) => this.setState({confirmPw})}
            value={this.state.confirmPw}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10
  },
  textTag: {
    width: 120,
    color: '#262525',
    fontSize: 12
  },
  textInput: {
    marginHorizontal: width * 0.05,
    fontSize: 14,
    color: '#43484A',
    height: 18, 
    width: 200, 
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale
  }
}

export default connect(mapStateToProps)(ChangePasswordScreen)