import React from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  FlatList,
  ScrollView,
} from 'react-native';

import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Separator, Toast } from '../../components';
import { setAchievement } from '../../redux/actions';
import { ProgressBar, NextButton, AchievementItem } from '../../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class SignUpTutorAchievementScreen extends React.Component {

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.locale.signUp.title.achievement,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      targetIndex: 0,
      isFromYear:true,
      achievementList: [],
    }
  }

  componentWillMount () {
    this.state.achievementList = this.props.achievementList;
  }

  onYearButtonPressed = (data)=> {
    this.setState({showPicker:true, targetIndex:data.index, isFromYear: data.isFromYear})
  }

  onDeletePressed = (index)=> {
    let achievementList = this.state.achievementList;
    achievementList.splice(index,1)

    for (let i=0; i<achievementList.length; i++) {
      achievementList[i].index = i;
    }

    this.setState({achievementList})
    console.log('achievementList: ', achievementList)
  }

  onTextChanged = (index, text) => {

    let achievementList = this.state.achievementList
    achievementList[index].achievement = text
    this.setState({achievementList})

  }

  handleCancel = () => {this.setState({showPicker:false})}
  handleConfirm = (v) => {
    if (this.state.isFromYear) {
      this.state.achievementList[this.state.targetIndex] = {...this.state.achievementList[this.state.targetIndex], fromYear: v}
    }
    else {
      this.state.achievementList[this.state.targetIndex] = {...this.state.achievementList[this.state.targetIndex], toYear: v}
    }

    this.setState({showPicker:false})
  }

  render() {
    let { locale } = this.props
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ProgressBar step = {3} />
          <Text style={styles.question}>{locale.signUp.text.achievement.label}</Text>

          <View style={{
            flexDirection: 'row',
            height:30,
            alignItems:'center',
          }}>
            <Text style={{
              width: '55%',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {locale.signUp.title.achievement}
            </Text>
            <Text 
              style={{
                width: '20%',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {'From'}
            </Text>
            <Text 
              style={{
                width: '20%',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {'To'}
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.container}>
            {
              this.state.achievementList &&
              this.state.achievementList.length > 0 &&
              this.state.achievementList.map((item, i) => 
                <AchievementItem 
                    key={i}
                    canEdit={true}
                    data={{...item, index:i}}
                    onPressedCallback={this.onYearButtonPressed}
                    onDeletePressedCallback={this.onDeletePressed}
                    onTextChangedCallback={this.onTextChanged}/>
              )
            }
            <TouchableOpacity
              onPress= {()=>{
                let achievementList = this.state.achievementList
                let date = new Date();
                if (achievementList) {
                  achievementList.push({index:achievementList.length, achievement:'', fromYear:date.getFullYear (), toYear:date.getFullYear ()})
                }
                else {
                  achievementList = [{index:0, achievement:'', fromYear:date.getFullYear (), toYear:date.getFullYear ()}]
                }
                this.setState({achievementList})
              }} >
              <MaterialCommunityIcons
                name={'plus-circle-outline'}
                size={25}
                color={Colors.tintColor}
              />
            </TouchableOpacity>
          </ScrollView>

          <NextButton 
            onPress={
              () => {
                if (!this.state.achievementList) {
                  this.Toast.show();
                }
                else if (this.state.achievementList.length > 0) {
                  let allFilled = true;
                  for (let i=0; i<this.state.achievementList.length;i++) {
                    if (!this.state.achievementList[i].achievement) {
                      allFilled = false;
                      break;
                    }
                  }

                  if (allFilled) {
                    this.props.setAchievement (this.state.achievementList);
                    // Next step
                    this.props.navigation.navigate('SignUpTutorSelfIntroScreen')
                  }
                  else {
                    this.Toast.show();
                  }
                }
                else {
                  this.Toast.show();
                }
              }
            }
            text={locale.signin.text.next.label}
          />

          { this.state.showPicker 
            && <CustomPicker 
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              locale={locale}
              year={this.state.isFromYear?this.state.achievementList[this.state.targetIndex].fromYear : this.state.achievementList[this.state.targetIndex].toYear}/>}

          <Toast timeout={3000} ref={(r) => { this.Toast = r; }} text={locale.alert.pleaseAnswer} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class CustomPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: props.year || '0'
    }
  }

  render() {
    const { locale, year, onCancel, onConfirm } = this.props;

    let date = new Date();
    let curYear = date.getFullYear();
    let yearList = [];


    for (let i = 0; i < 80; i++) {
      yearList.push(curYear-i);
    }

    let pickerItems = yearList.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={''+s} />
    });

    return (
      <View style={styles.pickerContainer}>
        <View style={styles.innerRowContainer}>
          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={[styles.text, {color: '#FF5A5F', }]}>
              {locale.common.cancel} 
            </Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={() => onConfirm(this.state.year)}>
              <Text style={[styles.text, {color: '#666', }]}>
                {locale.common.confirm} 
              </Text>
            </TouchableOpacity>
          }
        </View>
        
        <Picker
          selectedValue={this.state.year}
          style={styles.picker}
          onValueChange={
            (year, itemIndex) => {

              this.setState({year});
            }
          }>
          {pickerItems}
          
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    paddingTop: 20,
  },
  question: {
    fontSize: 22,
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    height: 40, 
    width: '80%',
    backgroundColor: '#5ECC3F', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10, 
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
    bottom: 0.5,
  },
  picker: {
    width: '100%',
    backgroundColor: '#FFF'
  },
  pickerName: {
    alignSelf: 'center'
  },
  listContainer: {
    backgroundColor: '#E4E4E4'
  }
});

const mapStateToProps = (state) => {
  // console.warn('state', state)
  return {
    locale: state.language.locale,
    achievementList: state.tutor.achievementList,
  }
}

export default connect(mapStateToProps,{
  setAchievement,
})(SignUpTutorAchievementScreen)
