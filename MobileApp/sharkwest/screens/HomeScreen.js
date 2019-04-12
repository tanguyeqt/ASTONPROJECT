import React from 'react';
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';


export default class FilQuestionScreen extends React.Component {
  static navigationOptions = {
    title: 'Fil de questions',
    headerStyle: {
      backgroundColor: Colors.secondaryColor,
    },
    headerTintColor: Colors.title4,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
          <Text h2 style={{color: Colors.title4, textAlign: 'center', fontSize: 40}}>
            Sharkwest
          </Text>
          <Text h4 style={{color: Colors.text, marginTop: 20, fontSize: 12}}>
            Créez et utilisez de nombreuses questions afin de créer vos propre questionnaires.
          </Text>
          <Text h4 style={{color: Colors.text, marginTop: 10, fontSize: 12}}>
            C'est simple et rapide, vous n'aurez pas à chercher l'inspiration afin de concevoir de nombreux questionnaires par thème, par niveau etc... 
          </Text>
          
          <Button
            buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10}}
            title="S'inscrire" onPress={this._registerAsync} />

          <Button
            buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10}}
            title="Se connecter" onPress={this._signInAsync} />
        </View>
      </View>
    );
  }

  _registerAsync = async () => {
    this.props.navigation.navigate('Register');
  };

  _signInAsync = async () => {
    this.props.navigation.navigate('Auth');
  };
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
