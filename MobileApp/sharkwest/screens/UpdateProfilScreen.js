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
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

export default class UpdateProfilScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: "Modification du profil",
            headerBackTitle: 'Retour',
            headerStyle: {
                backgroundColor: Colors.secondaryColor,
            },
            headerTintColor: Colors.title4,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.formContainer}>            
                        <ProgressSteps activeStepNumColor={Colors.text} disabledStepNumColor={Colors.secondaryColor}>
                            <ProgressStep label="Email" 
                                    nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                                    previousBtnDisabled={true}>
                                    <Input
                                        inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                        placeholderTextColor={Colors.inputPlaceholderColor}
                                        placeholder='Email'
                                        />
                            </ProgressStep>
                            <ProgressStep label="Mot de passe" 
                                   finishBtnText="✓" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                                   previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                                   onSubmit={this._myProfile}>
                                <Input
                                    inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Ancien mot de passe'
                                    />
                                <Input
                                    inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Nouveau mot de passe'
                                    />
                                <Input
                                   inputStyle={{marginTop: 50, color: Colors.inputColor, fontSize: 15}}
                                   placeholderTextColor={Colors.inputPlaceholderColor}
                                   placeholder='Confirmer le mot de passe'
                                />
                        </ProgressStep>
                        
                    
                    </ProgressSteps>
                </View>                    
            </View>
        </View>
        );
    }

 
    _myProfile = async (id) => {
        this.props.navigation.navigate('Profile');
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
      backgroundColor: Colors.secondaryColor
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