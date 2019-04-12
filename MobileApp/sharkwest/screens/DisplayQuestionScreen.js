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

import Colors from './../constants/Colors';

export default class DisplayQuestionScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      question: {}
    };
  }

  componentDidMount() {
    var datas = {
      id: 1,
      color: 'primary',
      level: 'CP',
      category: 'Géographie',
      theme: 'Les capitales',
      note: 4.2,
      rated: true,
      question: 'Quelle est la capitale de la France ?',
      response: {
        typeresponse: 1,
        correctresponse: ['Paris'],
        incorrectresponse: ['Bruxelles','Londres']
      },
      avis: 6,
      comments: 18,
      uses: 624,
      file: null,
      accountId: 1,
      login: 'Thunder',
      lastModified: '20/08/2018 18:50',
      difficulty: 'Facile'
    };

    this.setState({question: datas});
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Question',
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

  showResponse(response) {
    if (response === undefined)
        return;

    var type = response.typeresponse;
    if (type === 1)
    {
      return (
          <View style={[styles.row1, {marginTop: 10}]}>
              <View style={[styles.col1]}>
                  <Text style={styles.whiteText}>{response.correctresponse[0]}</Text>
              </View>
          </View>
      )
    }
    else if (type === 2)
    {
        var i = 0;
        return (
            <View>
                {response.correctresponse.map((correct) =>
                    <View key={i++} style={[styles.row1, {marginTop: 5}]}>
                        <FeatherIcon style={styles.whiteText} name='check-square' />
                        <Text style={[styles.whiteText, {marginLeft: 10}]}>{correct}</Text>
                    </View>
                )}
                {response.incorrectresponse.map((incorrect) =>
                    <View key={i++} style={[styles.row1, {marginTop: 10}]}>
                        <FeatherIcon style={styles.whiteText} name='square' />
                        <Text style={[styles.whiteText, {marginLeft: 10}]}>{incorrect}</Text>
                    </View>
                )}
            </View>
      )
    }
    else if (type === 3)
    {
        var i = 0;
      return (
        <View>
          {response.correctresponse.map((correct) =>
            <View key={i++} style={[styles.row1, {marginTop: 5}]}>
              <FeatherIcon style={styles.whiteText} name='check-circle' />
              <Text style={[styles.whiteText, {marginLeft: 10}]}>{correct}</Text>
            </View>
          )}
          {response.incorrectresponse.map((incorrect) =>
            <View key={i++} style={[styles.row1, {marginTop: 10}]}>
                <FeatherIcon style={styles.whiteText} name='circle' />
                <Text style={[styles.whiteText, {marginLeft: 10}]}>{incorrect}</Text>
            </View>
          )}
        </View>
      )
    }
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
                    <Text style={styles.grayTitle}>{this.state.question.level}</Text>
                </View>
                <View style={styles.col6}>
                    <Text style={styles.whiteTitle}>{this.state.question.category}</Text>
                    <Text style={styles.grayTitle}>{this.state.question.theme}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col4]}>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                        <Text style={styles.linkProfile}>@{this.state.question.login}</Text>
                    </TouchableOpacity>
                    <Text style={styles.grayTitle}>Dernière modification le {this.state.question.lastModified}</Text>
                </View>
                <View style={[styles.col1]}>
                    <View style={styles.row1}>
                        <Icon 
                            name={Platform.OS === 'ios' ? 'star' : 'star'}
                            color="#F2CA45"
                            size={14} />
                        <Text style={styles.whiteText}> {this.state.question.note} ({this.state.question.avis})</Text>
                    </View>
                    <View style={styles.row1}>
                        <Icon 
                            name={Platform.OS === 'ios' ? 'people' : 'people'}
                            color={Colors.text}
                            size={14} />
                        <Text style={styles.whiteText}> {this.state.question.uses}</Text>
                    </View>
                    <View style={styles.row1}>
                        <Text style={styles.whiteText}>{this.state.question.difficulty}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Question</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.whiteText}>{this.state.question.question}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Réponse</Text>
                </View>
            </View>
            {this.showResponse(this.state.question.response)}
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Informations</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Note moyenne de la question :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.question.note}/5</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de personnes ayant noté la question :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.question.avis}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de personnes ayant utilisé la question :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.question.uses}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10}]}>
                <View style={[styles.col3]}>
                    <Text style={styles.whiteText}>Nombre de commentaires pour cette question :</Text>
                </View>
                <View style={[styles.col1]}>
                    <Text style={[styles.whiteText, {textAlign: 'center'}]}>{this.state.question.comments}</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20}]}>
                <View style={[styles.col1]}>
                    <Text style={styles.headerTitle1}>Commentaires</Text>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20, marginLeft: 20, marginRight: 20}]}>
                <View style={[styles.col1]}>
                    <TouchableOpacity style={styles.round} onPress={() => {this.props.navigation.navigate('Profile')}}></TouchableOpacity>
                    {/* <Image style={styles.imgProfile} source={require('./../assets/images/profile.jpg')} /> */}
                </View>
                <View style={[styles.col6]}>
                    <View style={styles.row1}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                            <Text style={styles.linkProfile}>@Robrinne</Text>
                        </TouchableOpacity>
                        <Text style={styles.grayTitle}>20/08/2018  18:50</Text>
                    </View>
                    <View style={styles.row1}>
                        <Text style={styles.whiteText}>Bonjour, je verrais plus la question en difficulté "Facile" pour le coup</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20, marginLeft: 20, marginRight: 20}]}>
                <View style={[styles.col1]}>
                    <TouchableOpacity style={styles.round} onPress={() => {this.props.navigation.navigate('Profile')}}></TouchableOpacity>
                </View>
                <View style={[styles.col6]}>
                    <View style={styles.row1}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                            <Text style={styles.linkProfile}>@Robrinne</Text>
                        </TouchableOpacity>
                        <Text style={styles.grayTitle}>20/08/2018  18:50</Text>
                    </View>
                    <View style={styles.row1}>
                        <Text style={styles.whiteText}>Bonjour, je verrais plus la question en difficulté "Facile" pour le coup</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 20, marginLeft: 20, marginRight: 20}]}>
                <View style={[styles.col1]}>
                    <TouchableOpacity style={styles.round} onPress={() => {this.props.navigation.navigate('Profile')}}></TouchableOpacity>
                </View>
                <View style={[styles.col6]}>
                    <View style={styles.row1}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                            <Text style={styles.linkProfile}>@Robrinne</Text>
                        </TouchableOpacity>
                        <Text style={styles.grayTitle}>20/08/2018  18:50</Text>
                    </View>
                    <View style={styles.row1}>
                        <Text style={styles.whiteText}>Bonjour, je verrais plus la question en difficulté "Facile" pour le coup</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.row1, {marginTop: 10, marginLeft: 20, marginRight: 20}]}>
                <View style={[styles.col3]}>
                    <Input
                        inputStyle={{color: Colors.inputColor, fontSize: 10}}
                        placeholderTextColor={Colors.inputPlaceholderColor}
                        placeholder='Ecrivez votre commentaire'
                    />
                </View>
                <View style={[styles.col1]}>
                    <TouchableOpacity
                        style={[{
                            flex:1,
                            justifyContent:"center",
                            alignItems:'center',
                            borderRadius:10,
                            height:40,
                            margin:3,
                            backgroundColor: Colors.buttonConnectColor,
                        }]}>
                        <Text
                            style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: Colors.buttonConnectColor,
                                color: Colors.text,
                            }}>
                            Envoyer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
      </View>
    );
  }

  _signOutAsync = async () => {
    this.props.navigation.navigate('App');
  };

  traductColor()
  {
        switch(this.state.question.color)
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
