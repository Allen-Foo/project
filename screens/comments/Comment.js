import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { Avatar, Rating } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { mockData } from '../../constants/mockData';
import { Tutor, Separator } from '../../components';
import StarRating from 'react-native-star-rating';
import { getClassDetail } from '../../redux/actions';
import { Spinner } from '../../components';

const { width } = Dimensions.get('window');

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
  }

  render() {
    const { comment } = this.props;
    return (
      <View>
        <Separator />
        <View style={styles.rowContainer} onPress={() => this.props.navigation.navigate('CommentDetail')}>
          <View style={styles.avatarContainer}>
            <Avatar
              large
              rounded
              source={{url: comment.user.avatarUrl}}
              activeOpacity={0.7}
              style= {styles.avatar}
            />
          </View>
                
          <TouchableOpacity style={styles.contentContainer} onPress={() => {this.setState({collapsed: false})}}>
            <View style={styles.ratingRow}>
              <StarRating
                disabled
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                starSize={20}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={comment.content.starCount}
                starColor={Colors.tintColor}
                emptyStarColor={Colors.tintColor}
              />
            </View>
            {
              this.state.collapsed ?
              <Text 
                style={styles.userComment}
                numberOfLines={2}
              > 
                {comment.content.comment} 
              </Text> :
              <Text style={styles.userComment}> 
                {comment.content.comment} 
              </Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '2%',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginTop: '5%',
    width: 75,
    height: 75,
    marginHorizontal: '5%'
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 2
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rating: { 
    paddingVertical: '2%',
    paddingRight: '2%',
  },
  className: {
    fontSize: 14,
    color: '#555',
    fontWeight: '400',
  },
  tutorName: {
    color: '#555',
    fontSize: 14,
    //marginLeft: '8%'
  },
  comment: {
    alignItems: 'flex-end',
    fontSize: 10,
    fontWeight: '500'
  },
  heart: {
    position: 'absolute',
    right: '3%',
    top: '10%',
  },
  userComment:{
    color: '#555',
    fontSize: 12,
  }
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
    getClassDetail
})(Comment)
