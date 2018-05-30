import React from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { createTutor } from '../../redux/actions';

class CreateTutor extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={()=>{params.handleSubmit ? params.handleSubmit() : () => console.warn('not define')}}>
        <Text style={{paddingRight: 15, fontSize: 14}}>{screenProps.locale.common.confirm}</Text>
      </TouchableOpacity>
    );

    return {
      headerTitle: screenProps.locale.createTutor.title,
      headerTintColor: '#000',
      headerRight,
    }
  };

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSubmit: this._handleSubmit });
  }

  _handleSubmit = () => {
    console.warn('state', this.state)
    this.props.createTutor(this.state)
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    this.state = {
      tutorName: '',
      email: '',
      phone: '',
      introduction: '',
      avatarUrl: '',
    }
  }

  renderHeader() {
    let { locale } = this.props
    let avatar = 
      <Avatar
        xlarge
        rounded
        icon={{name: 'account-box'}}
        onPress={this._pickImage}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
      />
    if (this.state.avatarUrl) {
      // console.warn('avatarUrl', this.props.user.avatarUrl)
      avatar = 
        <Avatar
          xlarge
          rounded
          source={{url: this.state.avatarUrl}}
          onPress={this._pickImage}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
    }
    return (
      <View style={styles.loginContainer}>
        { avatar }
        <View>
          <Text style={styles.text} onPress={this._pickImage}>{locale.profileSetting.text.editIcon}</Text>
        </View>
      </View>
    )
  }

  render() {
    let { locale } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderHeader()}
        <TextInputItems
          fieldName={locale.createTutor.text.tutorName}
          style={styles.textInput}
          onChangeText={(tutorName) => this.setState({tutorName})}
          value={this.state.tutorName}
        />
        <TextInputItems
          fieldName={locale.createTutor.text.email}
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInputItems
          fieldName={locale.createTutor.text.phone}
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.fieldName}>{locale.createTutor.text.introduction}</Text>
          <TextInput
            style={styles.introTextInput}          
            onChangeText={(introduction) => this.setState({introduction})}
            value={this.state.introduction}
            multiline={true}
          />
        </View>
      </ScrollView>
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    // console.warn('photo', result);

    if (!result.cancelled) {
      this.setState({ avatarUrl: result })
    }
  };
}

const TextInputItems = props => {
  const {fieldName, style, onChangeText, value} = props;
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <TextInput
        style={style}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    paddingTop: 40,
  },
  contentContainer: {
    width: '90%',
    paddingLeft: 30
  },
  textInput: {
    paddingVertical: 10, 
    borderColor: 'grey', 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 20,
  },
  fieldName: {
    paddingTop: 10,
    paddingVertical: 10
  },
  introTextInput: {
    borderColor: 'grey', 
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    height: '20%',
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  loginContainer: {
    width: '100%',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
  }
}

export default connect(mapStateToProps, {
  createTutor
})(CreateTutor)

