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
  CheckBox
} from 'react-native';

import Btn from 'react-native-elements/src/buttons/Button';

import { Input } from 'react-native-elements';

import Colors from '../constants/Colors';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

export default class CreateQuestionScreen extends React.Component {
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
  
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.formContainer}>        
                    <Text style={styles.titleLabel}>
                        Sélectionnez le type de question à créer
                    </Text>
                    <Text style={styles.infoLabel}>
                        La réponse est ouverte, sans proposition
                    </Text>
                    <Btn
                        buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10, marginBottom: 50}}
                        title="Simple" onPress={this._goToCreateSimpleQuestion} />
                    <Text style={styles.infoLabel}>
                        Plusieurs propositions, une seule bonne réponse
                    </Text>
                    <Btn
                        buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10, marginBottom: 50}}
                        title="Choix unique" onPress={this._goToCreateQCU} />
                    <Text style={styles.infoLabel}>
                        Plusieurs propositions, une ou plusieurs bonne(s) réponse(s)
                    </Text>
                    <Btn
                        buttonStyle={{marginTop: 25, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10, marginBottom: 50}}
                        title="Choix multiple" onPress={this._goToCreateQCM} />
                </View>                    
          </View>
        </View>
    );
  }

    _goToCreateSimpleQuestion = async () => {
        this.props.navigation.navigate('CreateSimpleQuestion');
    };

    _goToCreateQCM = async () => {
        this.props.navigation.navigate('CreateQCM');
    };

    _goToCreateQCU = async () => {
        this.props.navigation.navigate('CreateQCU');
    };
 
}

const styles = StyleSheet.create({
    titleLabel: {
        fontStyle: 'italic',
        fontSize: 18,
        marginBottom: 100,
        marginTop: 80,
        color: Colors.text,
        textAlign: 'center'
    },
    infoLabel: {
        fontStyle: 'italic',
        fontSize: 12,
        color: Colors.text,
        textAlign: 'center'
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
    }
});