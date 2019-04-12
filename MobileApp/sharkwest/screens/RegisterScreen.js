import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Image
} from 'react-native';
import { Input, Button, Text, colors } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// Couleurs
import Colors from './../constants/Colors';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { pseudo: '', lastname: '', firstname: '', email: '', emailconfirmation: '', password: '', passwordconfirmation: ''};
    }

    static navigationOptions = {
        title: '',
        header: null
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={{width: '70%', height: '100%', alignSelf: 'center'}} 
                        source={require('./../assets/images/sharklogo.png')} />
                </View>
            </View>
            <View style={styles.row2}>
                <View style={styles.formContainer}>            
                    <Text h4 style={{color: Colors.title4, textAlign: 'center'}}>
                        Inscription
                    </Text>
                    <ProgressSteps activeStepNumColor={Colors.text} disabledStepNumColor={Colors.secondaryColor}>
                        <ProgressStep label="Pseudonyme" 
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnDisabled={true}>
                            <View >
                                <Input
                                    ref= {(x) => { this.pseudo = x; }}
                                    onChangeText={(pseudo) => this.setState({pseudo})}
                                    value={this.state.pseudo}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Pseudonyme'
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Infos"
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}>
                            <View>
                                <Input
                                    ref= {(y) => { this.lastname = y; }}
                                    onChangeText={(lastname) => this.setState({lastname})}
                                    value={this.state.lastname}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Nom de famille'
                                />
                                <Input
                                    ref= {(z) => { this.firstname = z; }}
                                    onChangeText={(firstname) => this.setState({firstname})}
                                    value={this.state.firstname}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Prénom'
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Email"
                            nextBtnText="→" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}>
                            <View>
                                <Input
                                    ref= {(w) => { this.email = w; }}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Adresse e-mail'
                                />
                                <Input
                                    ref= {(u) => { this.emailconfirmation = u; }}
                                    onChangeText={(emailconfirmation) => this.setState({emailconfirmation})}
                                    value={this.state.emailconfirmation}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder="Confirmation de l'email"
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep label="Mot de passe"
                            finishBtnText="✓" nextBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            previousBtnText="←" previousBtnTextStyle={{color: Colors.greyLight, fontSize: 30}}
                            onSubmit={this._registerAsync}>
                            <View>
                                <Input
                                    ref= {(v) => { this.password = v; }}
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Mot de passe'
                                />
                                <Input
                                    ref= {(t) => { this.passwordconfirmation = t; }}
                                    onChangeText={(passwordconfirmation) => this.setState({passwordconfirmation})}
                                    value={this.state.passwordconfirmation}
                                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                                    placeholderTextColor={Colors.inputPlaceholderColor}
                                    placeholder='Confirmation du mot de passe'
                                />       
                            </View> 
                        </ProgressStep>
                    </ProgressSteps>

                    <Text style={{marginTop: 35, marginBottom: 100, color: Colors.title4, textAlign: 'center', fontSize: 15, textDecorationLine: 'underline'}}
                        onPress={this._signInAsync}>
                        Se connecter
                    </Text>
                </View>                    
            </View>            
        </View>
      );
    }
  
    _registerAsync = async () => {
        let pseudo = this.state.pseudo;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let email = this.state.email;
        let emailconfirmation = this.state.emailconfirmation;
        let password = this.state.password;
        let passwordconfirmation = this.state.passwordconfirmation;

        if(email !== emailconfirmation
            && password !== passwordconfirmation)
        {
            console.log('Mail NON / Mdp NON');
        }
        else if(email === emailconfirmation
            && password !== passwordconfirmation)
        {            
            console.log('Mail OUI / Mdp NON');
        }
        else if(email !== emailconfirmation
            && password === passwordconfirmation)
        {
            console.log('Mail NON / Mdp OUI');
        }
        else
        {
            console.log('Mail OUI / Mdp OUI');
            this.props.navigation.navigate('App');
        }

        console.log('Pseudo : ' + pseudo);
        console.log('Firstname : ' + firstname);
        console.log('Lastname : ' + lastname);
        console.log('Email : ' + email);
        console.log('Emailconfirmation : ' + emailconfirmation);
        console.log('Password : ' + password);
        console.log('Passwordconfirmation : ' + passwordconfirmation);
    };

    _signInAsync = async () => {
        this.props.navigation.navigate('Auth');
    };
  }

  const styles = StyleSheet.create({
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
    }
  });