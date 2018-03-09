import React from 'react';
import { 
  Alert, 
  AsyncStorage, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  TextInput,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Entypo, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Comments from '../comments/Comments';
import { Hr } from '../../components';
import { giveComment } from '../../redux/actions';

let {width, height} = Dimensions.get('window');
const MAX_LENGTH = 255

class GiveCommentScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const { state } = navigation;
    const { params = {} } = navigation.state;

    return {
      headerTitle: screenProps.locale.giveComment.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  handleChangeText = (text) => {
    if (text.length < MAX_LENGTH) {
      this.setState({
        textLength: text.length,
        comment: text,
      });
    }
  }

  handleSubmit = () => {
    // console.warn('giveComment', this.props.giveComment)
    let {textLength, ...rest} = this.state;

    this.props.giveComment(rest, this.props.navigation.state.params.classId)
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    let comment = ''
    this.state = {
      textLength: 0,
      starCount: 0,
      comment: comment
    }
  }

  render() {
    let { locale } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.ratingRow}>
          <Text style={styles.textStyle}> {locale.giveComment.text.rating} </Text>
          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            starSize={30}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starColor={Colors.tintColor}
            emptyStarColor={Colors.tintColor}
          />
        </View>
        <Hr/>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline={true}
            style={styles.textInputStyle}
            onChangeText={this.handleChangeText}
            placeholder={locale.giveComment.text.placeholder}
            value={this.state.comment}
          />
          <View style={styles.numberLocation}>
            <Text style={styles.textNumber}>{`${this.state.textLength}/${MAX_LENGTH}`}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{this.handleSubmit()}}>
          <Text style={styles.text} >
            {this.props.locale.common.submit}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  ratingRow: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textStyle: {
    alignSelf: 'center',
    paddingLeft: 10,
    fontSize:18,
  },
  textInputStyle: {
    borderColor: 'gray', 
    fontSize: 16,
  },
  textInputContainer: {
    height: '40%', 
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: '#fff',
  },
  textNumber: {
    fontSize: 12,

  },
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 5,
    height: '6%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  numberLocation: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },

});

const mapStateToProps = (state) => {
  return {
    locale: state.language.locale,
    isLoading: state.classes.isLoading,
    fetchErrorMsg: state.classes.fetchErrorMsg,
    fetchErrorLastUpdate: state.classes.fetchErrorLastUpdate
  }
}

export default connect(mapStateToProps, {
  giveComment,
})(GiveCommentScreen)
