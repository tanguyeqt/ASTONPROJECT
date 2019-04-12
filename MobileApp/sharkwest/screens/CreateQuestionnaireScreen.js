import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  Picker,
  Animated,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import FeatherIcon  from 'react-native-vector-icons/Feather';
import IOSPicker from 'react-native-ios-picker';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { HitTestResultTypes } from 'expo/build/AR';
const AnimatedListView = Animated.createAnimatedComponent(ListView);
const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

export default class CreateQuestionnaireScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: "Création d'un questionnaire",
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
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    
    this.state = {
        intitule: '',
        category: '',
        theme: '',
        colorChecked: 'blue',
        difficultyChecked: 'CP',
        showBareme: false,
        listresponse: [],
        scrollAnim,
        offsetAnim,
        clampedScroll: Animated.diffClamp(
          Animated.add(
            scrollAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolateLeft: 'clamp',
            }),
            offsetAnim,
          ),
          0,
          NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
        )
    }
  }

  componentDidMount() {
  }
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.formContainer}>            
                    <ProgressSteps activeStepNumColor={Colors.text} disabledStepNumColor={Colors.secondaryColor}>
                        <ProgressStep label="Intitulé" 
                                nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                                previousBtnDisabled={true}>
                                
                                <Input
                                    ref= {(x) => { this.intitule = x; }}
                                    onChangeText={(intitule) => this.setState({intitule})}
                                    value={this.state.intitule}
                                    inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Intitulé du questionnaire'
                                    />
                                
                        </ProgressStep>
                        <ProgressStep label="Couleur" 
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
                            
                      </ProgressStep>
                        <ProgressStep label="Infos" 
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}   
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}>
                            <View>
                            <Text style={[styles.titleLabel, {marginTop: 50, marginBottom: 35}]}>
                                Niveau
                            </Text>
                                <IOSPicker 
                                    mode='modal'
                                    selectedValue="CP"
                                    onValueChange={(d, i)=> {
                                        this._changeDifficulty(d)
                                    }}
                                    >
                                    <Picker.Item key="cp" label="CP" value="CP"/>
                                    <Picker.Item key="ce1" label="CE1" value="CE1" />
                                    <Picker.Item key="ce2" label="CE2" value="CE2" />
                                    <Picker.Item key="cm1" label="CM1" value="CM1" />
                                    <Picker.Item key="cm2" label="CM2" value="CM2" />
                                </IOSPicker>
                            </View>
                            <Input
                                ref= {(y) => { this.category = y; }}
                                onChangeText={(category) => this.setState({category})}
                                value={this.state.category}
                                inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                placeholderTextColor={Colors.inputPlaceholderColor}
                                placeholder='Catégorie'
                                />
                            <Input
                                ref= {(z) => { this.theme = z; }}
                                onChangeText={(theme) => this.setState({theme})}
                                value={this.state.theme}
                                inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                placeholderTextColor={Colors.inputPlaceholderColor}
                                placeholder='Thème'
                                />
                      </ProgressStep>
                     
                      <ProgressStep label="Barême" 
                            finishBtnText="✓" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            onSubmit={this._createQuestionnaire}>
                            <View style={[styles.row, {marginTop: 5}]}>
                                <View style={styles.column1}>
                                    <TouchableOpacity onPress={() => this._showBareme()}>
                                        <FeatherIcon style={ [styles.whiteText, {marginTop: 10}] } name={this.state.showBareme ? 'check-circle' : 'circle'} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.whiteText, styles.column4, {marginTop: 8, marginLeft: 6}]}>
                                    Afficher/Masquer le barême
                                </Text>
                            </View>
                      </ProgressStep>
                  </ProgressSteps>
              </View>                    
          </View>
      </View>
    );
  }

    _showBareme = async () => {
        this.setState({ showBareme: !this.state.showBareme});
    };

    _changeColor = async (color) => {
        this.setState({colorChecked: color});
    } 

    _changeDifficulty = async (difficulty) => {
        this.setState({difficultyChecked: difficulty});
    }

    _createQuestionnaire = async (id) => {
        let intitule = this.state.intitule;
        let colorChecked = this.state.colorChecked;
        let difficultyChecked = this.state.difficultyChecked;
        let category = this.state.category;
        let theme = this.state.theme;
        let showBareme = this.state.showBareme;
        console.log('Intitule : ' + intitule);
        console.log('ColorChecked : ' + colorChecked);
        console.log('DifficultyChecked : ' + difficultyChecked);
        console.log('Category : ' + category);
        console.log('Theme : ' + theme);
        console.log('ShowBareme : ' + showBareme);

        this.props.navigation.navigate('MyQuestionnaire');
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
  contentContainer:{
    marginTop: 50
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
    },
    column1: {
        flexDirection: 'column',
        flex: 0.1
    },
    column4: {
        flexDirection: 'column',
        flex: 0.9
    },
});