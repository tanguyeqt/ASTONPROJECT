import React from 'react';
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Switch,
  Picker,
  CheckBox
} from 'react-native';
import FeatherIcon  from 'react-native-vector-icons/Feather';
import IOSPicker from 'react-native-ios-picker';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

export default class CreateSimpleQuestionScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: "Création d'une question",
      headerBackTitle: 'Retour',
      headerStyle: {
        backgroundColor: Colors.secondaryColor,
        borderBottomColor: Colors.secondaryColor
      },
      headerTintColor: Colors.title4,
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
        colorChecked: 'none',
        difficultyChecked: 'none'
    }
  }
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.formContainer}>            
                    <ProgressSteps activeStepNumColor={Colors.text} disabledStepNumColor={Colors.secondaryColor}>
                        <ProgressStep label="Infos" 
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnDisabled={true}>
                            <View>
                            <Text style={[styles.titleLabel, {marginTop: 50, marginBottom: 35}]}>
                                Niveau
                            </Text>
                                <IOSPicker 
                                    mode='modal'
                                    selectedValue="CP"
                                    onValueChange={(d, i)=> {}}
                                    >
                                    <Picker.Item key="cp" label="CP" value="CP" />
                                    <Picker.Item key="ce1" label="CE1" value="CE1" />
                                    <Picker.Item key="ce2" label="CE2" value="CE2" />
                                    <Picker.Item key="cm1" label="CM1" value="CM1" />
                                    <Picker.Item key="cm2" label="CM2" value="CM2" />
                                </IOSPicker>
                            </View>
                            <Input
                                inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                placeholderTextColor={Colors.inputPlaceholderColor}
                                placeholder='Catégorie'
                                />
                            <Input
                                inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                placeholderTextColor={Colors.inputPlaceholderColor}
                                placeholder='Thème'
                                />
                      </ProgressStep>
                      <ProgressStep label="Autre" 
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}>
                            <View>
                                <Text style={[styles.titleLabel, {marginTop: 50}]}>
                                    Couleur
                                </Text>
                                <View style={[styles.row, {marginTop: 35}]}>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity id='blue' style={styles.round1} onPress={() => this._changeColor('blue')}>
                                        {
                                            this.state.colorChecked == 'blue' ?
                                            <Text style={[styles.whiteText, {marginTop: 3, marginLeft: 6}]}>
                                                ✓
                                            </Text> : <Text></Text>
                                        }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity id='yellow' style={styles.round2} onPress={() => this._changeColor('yellow')}>
                                        {
                                            this.state.colorChecked == 'yellow' ?
                                            <Text style={[styles.blackText, {marginTop: 3, marginLeft: 6}]}>
                                                ✓
                                            </Text> : <Text></Text>
                                        }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity id='green' style={styles.round3} onPress={() => this._changeColor('green')}>
                                        {
                                            this.state.colorChecked == 'green' ?
                                            <Text style={[styles.whiteText, {marginTop: 3, marginLeft: 6}]}>
                                                ✓
                                            </Text> : <Text></Text>
                                        }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity id='red' style={styles.round4} onPress={() => this._changeColor('red')}>
                                        {
                                            this.state.colorChecked == 'red' ?
                                            <Text style={[styles.whiteText, {marginTop: 3, marginLeft: 6}]}>
                                                ✓
                                            </Text> : <Text></Text>
                                        }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={[styles.titleLabel, {marginTop: 50}]}>
                                    Difficulté
                                </Text>
                                <View style={[styles.row, {marginTop: 35}]}>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity onPress={() => this._changeDifficulty('1')}>
                                            <FeatherIcon style={{color: Colors.text, fontSize: 20}} name={this.state.difficultyChecked == '1' ? 'check-circle' : 'circle'} />
                                        </TouchableOpacity>
                                        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
                                            Très facile
                                        </Text>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity onPress={() => this._changeDifficulty('2')}>
                                            <FeatherIcon style={{color: Colors.text, fontSize: 20}} name={this.state.difficultyChecked == '2' ? 'check-circle' : 'circle'} />
                                        </TouchableOpacity>
                                        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
                                            Facile
                                        </Text>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity onPress={() => this._changeDifficulty('3')}>
                                            <FeatherIcon style={{color: Colors.text, fontSize: 20}} name={this.state.difficultyChecked == '3' ? 'check-circle' : 'circle'} />
                                        </TouchableOpacity>
                                        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
                                            Moyen
                                        </Text>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity onPress={() => this._changeDifficulty('4')}>
                                            <FeatherIcon style={{color: Colors.text, fontSize: 20}} name={this.state.difficultyChecked == '4' ? 'check-circle' : 'circle'} />
                                        </TouchableOpacity>
                                        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
                                            Difficile
                                        </Text>
                                    </View>
                                    <View style={[styles.column, {alignItems: 'center'}]}>
                                        <TouchableOpacity onPress={() => this._changeDifficulty('5')}>
                                            <FeatherIcon style={{color: Colors.text, fontSize: 20}} name={this.state.difficultyChecked == '5' ? 'check-circle' : 'circle'} />
                                        </TouchableOpacity>
                                        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
                                            Très difficile
                                        </Text>
                                    </View>
                                </View>
                            </View>
                      </ProgressStep>
                      <ProgressStep label="Question" 
                            finishBtnText="✓" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            onSubmit={this._addQuestion}>
                            <View>
                                <Text style={[styles.titleLabel, {marginTop: 50, marginBottom: 35}]}>
                                    Question
                                </Text>
                                <Input
                                    inputStyle={{color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Intitulé de la question'
                                    multiline={true}/>
                            </View>
                            <View>
                                <Text style={[styles.titleLabel, {marginTop: 50, marginBottom: 35}]}>
                                    Réponse
                                </Text>
                                <Input
                                    inputStyle={{color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Réponse à votre question'
                                    multiline={true}/>
                            </View>
                      </ProgressStep>
                  </ProgressSteps>
              </View>                    
          </View>
      </View>
    );
  }

    _addQuestion = async () => {
        this.props.navigation.navigate('MyQuestion');
    };

    _changeColor = async (color) => {
        this.setState({colorChecked: color});
    }

    _changeDifficulty = async (difficulty) => {
        this.setState({difficultyChecked: difficulty});
    }
}

const styles = StyleSheet.create({
    titleLabel: {
        fontSize: 18,
        color: Colors.text
    },
  container: {
      flex: 1,        
      flexDirection: 'column',
      backgroundColor: Colors.primaryColor
  },
  row: {
      flex: 1,
      flexDirection: 'row'
  }, 
  row2: {
      flex: 2,
      flexDirection: 'row'
  }, 
  imageContainer: {
      flex: 2,
      marginLeft: 50,
      marginRight: 50,
      marginTop: 80
  },
  formContainer: {
      flex: 1,
      marginLeft: 50,
      marginRight: 50
  },
  bottomStepper: {
      backgroundColor: Colors.secondaryColor,
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
  },
  buttonStepper: {
      color: '#FFFFFF'
  },
  activeDot: {
      backgroundColor: Colors.text
  },
  inactiveDot: {
      backgroundColor: "#000000"
  },
  activeStep: {
      backgroundColor: Colors.text
  },
  inactiveStep: {
      backgroundColor: '#ededed'
  }, 
  activeStepTitle: {
      fontWeight: 'bold'
  },
  inactiveStepTitle: {
      fontWeight: 'normal'
  },
  activeStepNumber: {
      color: 'white'
  },
  inactiveStepNumber: {
      color: 'black'
  },
  round1: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: 'blue'
    },
    round2: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'yellow'
    },
    round3: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'green'
    },
    round4: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'red'
    },
    whiteText: {
        color: Colors.text,
        fontSize: 20
    },
    blackText: {
        fontSize: 20
    },
    column: {
        flexDirection: 'column',
        flex: 1
    }
});