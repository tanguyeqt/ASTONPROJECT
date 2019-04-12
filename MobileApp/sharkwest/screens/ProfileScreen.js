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

import Colors from '../constants/Colors';

export default class ProfileScreen extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    var datas = {
      id: 1,
      login: 'tanguyeqt',
      lastname: 'EQUINET',
      firstname: 'Tanguy',
      birthdate: '30/10/1996',
      email: 'tanguyequinet@outlook.fr',
      nbQuestion: 3,
      nbCommentary: 5,
      nbQuestionnaires: 6,
      nbNotes: 1,
      notesMoyenne: 2.75,
      difficulteMoyenne: 'Très difficile'

      
    };

    this.setState({profile: datas});
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Mon Profil',
      headerBackTitle: 'Retour',
      headerStyle: {
        backgroundColor: Colors.secondaryColor,
        borderBottomColor: Colors.secondaryColor
      },
      headerTintColor: Colors.title4,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button
          onPress={() => { navigation.navigate('UpdateProfile'); }}
          title="Modifier" 
          color={Colors.title4}
        />
      )
    }
  }
  
  

    render() {
      return (
        <View style={styles.content}>
        <ScrollView style={styles.container}>
            <View style={styles.row1}>
                <View style={[styles.col3, {marginTop: 20, marginLeft: 20}]}>
                <Image 
                style={styles.imgProfile}
                source={require('./../assets/images/profile.jpg')} />
                </View>
                
                <View style={[styles.col6, {marginTop: 40}]}>
                    <Text style={styles.whiteTitle}>@{this.state.profile.login}</Text>
                    <Text style={styles.grayTitle}>{this.state.profile.firstname} {this.state.profile.lastname}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 30}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Date de naissance :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={styles.whiteText}>{this.state.profile.birthdate}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Email: </Text>
                </View>
                <View style={[styles.col3]}>
                    <Text style={[styles.whiteText,{textAlign:"right"}]}>{this.state.profile.email}</Text>
                </View>
            </View>
           
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Informations</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de questions crées :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.nbQuestion}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de commentaires :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.nbCommentary}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de questionnaires crées :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.nbQuestionnaires}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de notes données :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.nbNotes}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Note moyenne des questions crées :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.notesMoyenne}/5</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Difficulté moyenne des questions crées :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.profile.difficulteMoyenne}</Text>
                </View>
            </View>
            <View style={{marginTop: 200}}> 
              <Button color="red" title="Se déconnecter" onPress={this._signOutAsync}/>
            </View>
        </ScrollView>
      </View>
    );
  }

  _signOutAsync = async () => {
    this.props.navigation.navigate('Home');
  };


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
      width: 75,
      height: 75,
      borderRadius: 75/2
  }
});
