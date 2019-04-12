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
  Button
} from 'react-native';

import { Input, Icon } from 'react-native-elements';
import FeatherIcon  from 'react-native-vector-icons/Feather';
import { Dialog, Portal } from 'react-native-paper';

import Colors from './../constants/Colors';

export default class DisplayQuestionnaireScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionnaire: {}
    };
  }

  componentDidMount() {
    var datas = {
        id: 1,
        color: 'primary',
        level: 'CP',
        category: 'Géographie',
        theme: 'Les capitales',
        name: 'Questionnaire sur les capitales',
        questions: 7,
        rangeDifficulty: 'Tres Facile - Très difficile',
        showPoints: true,
        accountId: 1,
        pointsMax : 20,
        login: 'Thunder',
        lastModified: '20/08/2018 18:50',
        difficultyMoy: 'Très difficile',
        noteMin : 3,
        noteMax : 3,
        noteMoy : 3
    };

    this.setState({questionnaire: datas});
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Questionnaire',
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

  openDialog = (show) => {
    this.setState({ showDialog: show });
}
    
   

  render() {
    return (      
      <View style={styles.content}>
        <ScrollView style={styles.container}>
            <View style={styles.row1}>
                <View style={[styles.col1]}>
                    <TouchableOpacity style={[styles.round, {backgroundColor: this.traductColor()}]}></TouchableOpacity>
                </View>
                <View style={[styles.col1]}>
                    <Text style={styles.grayTitle}>{this.state.questionnaire.level}</Text>
                </View>
                <View style={styles.col6}>
                    <Text style={styles.whiteTitle}>{this.state.questionnaire.category}</Text>
                    <Text style={styles.grayTitle}>{this.state.questionnaire.theme}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col4]}>
                    <Text style={styles.linkProfile}>@{this.state.questionnaire.login}</Text>
                    <Text style={styles.grayTitle}>Dernière modification le {this.state.questionnaire.lastModified}</Text>
                </View>
                
            </View>
            
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Informations</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Bareme</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.showPoints === true ? "Affiché - /" + this.state.questionnaire.pointsMax : "Masqué"}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Difficulté moyenne </Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.difficultyMoy}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Borne de difficulté</Text>
                </View>
                <View style={[styles.col2]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.rangeDifficulty}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Note minimale</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.noteMin}/5</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Note maximale</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.noteMax}/5</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Note moyenne</Text> 
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.questionnaire.noteMoy}/5</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Questions</Text>
                </View>
            </View>
            <View style={[styles.col1]}>
                    <TouchableOpacity
                        style={[{
                            flex:1,
                            justifyContent:"center",
                            alignItems:'center',
                            borderRadius:10,
                            marginLeft:50,
                            marginRight:50,
                            marginTop:30,
                            height:40,
                            margin:3,
                            backgroundColor: Colors.buttonConnectColor,
                        }]}
                        onPress={ () => this.openDialog(true) }
                        >
                        <Text
                            style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: Colors.buttonConnectColor,
                                color: Colors.text,
                            }}
                            onPress={ () => this.openDialog(true) }
                            >
                            Voir les questions
                        </Text>
                    </TouchableOpacity>
            </View>
               
              
            <Dialog style={ { marginTop: 175,  height: 640, width: 355, marginLeft:0 } } 
                title="Custom Dialog"
                animationType="fade" 
                contentStyle={
                    {
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }
                onTouchOutside={ () => this.openDialog(false) }
                visible={ this.state.showDialog }
            >
                <Dialog.ScrollArea style={ { marginTop: 60} } >
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                        <Text style={ { marginVertical: 30 } }>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                       

                    </ScrollView>
                </Dialog.ScrollArea>
                

                <Button
                    onPress={ () => this.openDialog(false) }
                    style={ { marginTop: 10 } }
                    title="CLOSE"
                />
            </Dialog>
        </ScrollView>
      </View>
    );
  }

  traductColor()
  {
        switch(this.state.questionnaire.color)
        {
            case 'primary':
                return 'blue';
            case 'danger':
                return 'red';
            case 'success':
                return 'green';
            case 'warning':
                return 'yellow';
        }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  row1: {
      flex: 1,
      flexDirection: 'row'
  },
  col1: {
      flex: 1,
      flexDirection: 'column'
  },
  col3: {
      flex: 3,
      flexDirection: 'column'
  },
  col4: {
      flex: 4,
      flexDirection: 'column'
  },
  col6: {
      flex: 6,
      flexDirection: 'column',
  },
  round: {
      width: 30,
      height: 30,
      borderRadius: 30/2,
      backgroundColor: 'white'
  },
  whiteTitle: {
      color: Colors.text,
      fontSize: 15
  },
  whiteText: {
      color: Colors.text,
      fontSize: 10
  },
  grayTitle: {
      color: Colors.grayLight,
      fontSize: 10
  },
  headerTitle1: {
      color: Colors.title4,
      fontSize: 15
  },
  linkProfile: {
      color: Colors.blueLinkProfile,
      fontSize: 10
  },
  imgProfile: {
      width: 11,
      height: 11,
      borderRadius: 11/2
  }
});
