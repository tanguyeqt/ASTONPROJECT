import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Image
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

// Connection string de l'API
import { APIURL } from '../config-connections';
// Couleurs
import Colors from './../constants/Colors';

export default class SignInScreen extends React.Component {
    constructor(props) {
        super();

        this.state = { username: '', password: ''};
        super(props);
    }

    static navigationOptions = {
        title: '',
        header: null
    };
  
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={{width: '100%', height: '100%', alignSelf: 'center'}} 
                    source={require('./../assets/images/sharklogo.png')} />
            </View>
            <View style={styles.formContainer}>            
                <Text h4 style={{color: Colors.title4, textAlign: 'center'}}>
                    Connexion
                </Text>

                <Input
                    ref= {(x) => { this.username = x; }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    inputStyle={{marginTop: 20, color: Colors.inputColor, fontSize: 15}}
                    placeholderTextColor={Colors.inputPlaceholderColor}
                    placeholder='Nom de compte ou email'
                />

                <Input
                    ref= {(x) => { this.password = x; }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputStyle={{marginTop: 25, color: Colors.inputColor, fontSize: 15}}
                    secureTextEntry={true}
                    placeholderTextColor={Colors.inputPlaceholderColor}
                    placeholder='Mot de passe'
                />

                <Button
                    buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10}}
                    title="Se connecter" onPress={this._signInAsync} />

                <Button
                    buttonStyle={{marginTop: 15, backgroundColor: Colors.buttonFacebookColor, borderRadius: 10, paddingVertical: 10}}
                    title="Se connecter avec Facebook" onPress={this._signInAsync} />

                <Button
                    buttonStyle={{marginTop: 15, backgroundColor: Colors.buttonGoogleColor, borderRadius: 10, paddingVertical: 10}}
                    title="Se connecter avec Google" onPress={this._signInAsync} />

                <Text style={{marginTop: 15, color: Colors.title4, textAlign: 'center', fontSize: 15, textDecorationLine: 'underline'}}
                    onPress={this._registerAsync}>
                    S'inscrire
                </Text>
            </View>
        </View>
      );
    }
  
    _signInAsync = async () => {
        let username = this.state.username;
        let password = this.state.password;
        console.log('Username : ' + username);
        console.log('Password : ' + password);        

        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    _registerAsync = async () => {
        this.props.navigation.navigate('Register');
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: Colors.secondaryColor
    },
    imageContainer: {
        flex: 2,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 35
    },
    formContainer: {
        flex: 3,
        marginLeft: 50,
        marginRight: 50
    }
  });