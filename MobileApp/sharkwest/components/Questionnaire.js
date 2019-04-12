import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
  ActionSheetIOS
} from 'react-native'
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import Entypo from 'react-native-vector-icons/Entypo' 
import Colors from '../constants/Colors';
 

const userImage = {uri : 'https://pbs.twimg.com/profile_images/951903664809050114/Grfd40ih_400x400.jpg'}
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
String.prototype.capitalizeFirstLetter = function() {
  return `${this.substr(0,1).toUpperCase()}${this.substr(1)}`;
}
export default class Questionnaire extends React.Component {

  constructor(props) {
    super(props)
    //this.state = {id: this.props.id, rate: 0, questionnaires: []};
    this.tweetPressed = this
      .tweetPressed
      .bind(this)

    this.retweet = this.retweet.bind(this)
  
  }

  tweetPressed(pressed = false) {
    
    this.setState({touched: pressed})
  }

  retweet(){

    const {retweeted, retweets} = this.state
  

    if (retweeted) 
      this.setState({retweeted: false, retweets: retweets-1})
    

    else this.setState({retweeted: true, retweets: retweets+1})
  }
  traductColor()
  {
        switch(this.props.color)
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

  render() {
    return(
      <TouchableHighlight onPress={()=>this.props.navigation.navigate('DisplayQuestionnaire')} onPressIn={() => this.tweetPressed(true)} onPressOut={() => this.tweetPressed()}>
        <View key={this.props.key} style={styles.container}>
              <View style={styles.info}>
                <View style={styles.row}>
                  <View style={[styles.column]}>
                      <TouchableOpacity style={[styles.round, {backgroundColor: this.traductColor()}]}></TouchableOpacity>
                  </View>
                  <View style={styles.column}>
                      <Text style={styles.level}>{this.props.level}</Text>
                  </View>
                  <View style={styles.column6}>
                      <Text style={styles.category}>{this.props.category}</Text>
                      <Text style={styles.theme}>{this.props.theme}</Text>
                  </View>
                  <TouchableOpacity style={styles.column} onPress={() => { this.showActionSheet() }}> 
                      <EvilIcons name={'chevron-down'} size={50} color={"rgb(136, 153, 166)"}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.column1}> 
                        <Text style={styles.title}>{this.props.name}</Text>
                        <Text style={styles.infos}>Nombre de questions :{this.props.questions}</Text>
                        <Text style={styles.infos}>Derniere modification le {this.props.lastModified}</Text>
                    </View> 
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.infos}>{this.props.rangeDifficulty}</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.infos}>Bareme :{this.props.showPoints === true ? "Affiché - /" + this.props.pointsMax : "Masqué"}</Text>
                    </View> 
                    <View style={styles.column2}>
                        <Text style={styles.infos}>{this.props.difficultyMoy}</Text>
                    </View>
                </View>
           
                <View style={styles.actionsContainer}>
                  <View style={styles.row}>
                      <TouchableOpacity style={styles.column}>  
                          <Feather name={'trash-2'} style={styles.commentButtonIcon} size={18} color={'rgb(136, 153, 166)'}/>
                          
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.column}>
                          <AntDesign name={'download'} size={18} color={'rgb(136, 153, 166)'}/>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
        </View>
       </TouchableHighlight>

    )
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      message: 'Que voulez-vous faire ?',
      options: ['Modifier', 'Générer le PDF', 'Supprimer', 'Annuler'],
      cancelButtonIndex: 3,
      destructiveButtonIndex: 2,
    },
    (index) => { 
      if(index===0)
      {
        this.updateQuestionnaire(this.props.id);
      }
      else if (index === 1)
      {
        this.generatePdf(this.props.id);
      }
      else if (index === 2)
      {
        this.deleteQuestionnaire(this.props.id);
      }
    });
  }
  
  updateQuestionnaire = (id) => {
    this.props.navigation.navigate('UpdateQuestionnaire');
  }

  generatePdf = (id) => {

  }

  deleteQuestionnaire = (id) => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 0.5,
    borderTopColor: Colors.secondaryColor,
    borderTopWidth: 0.5,
    flexDirection: "column",
    paddingTop: 10,
    backgroundColor: Colors.primaryColor,
    paddingRight: 20
  },
  info: {
    flex: 0.77,
    borderColor: "yellow",
    flexDirection: "column",
    borderWidth: 0,
    marginLeft: 20 
  },
  level: {
    color: "rgb(136, 153, 166)",
    marginLeft: 5
  },
  category: { 
    color: "white", 
    fontWeight: "bold"
  },
  theme: {
    color: "rgb(136, 153, 166)",
    fontWeight: "bold"
  },
  title: { 
    color: "white",
    marginLeft:10,
    marginTop:10 
  },
  infos: {
    color: "rgb(136, 153, 166)",
    marginLeft:10,
    marginTop:10,
    fontSize:10
  },
  actionsContainer: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 0,
    marginTop: 20,
    flexDirection: "row",
    paddingBottom: 5,
    textAlign:"center",
    paddingBottom:10
  },
  commentButton: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0,
    textAlign:'center'
  },
  commentButtonIcon: {
    margin: 0,
    marginLeft: -4,
    borderColor: "red",
    borderWidth: 0
  },
  commentsCount: {
    position: "absolute",
    left: 27,
    color: "rgb(136, 153, 166)",
    marginLeft: -4
  },
  addButton: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  },
  rateButton: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  },
  rateButtonIcon: {
    position: "absolute",
    left: 27
  },
  row: {
      flexDirection: 'row',
      flex: 1
  },
  row2: {
      flexDirection: 'row',
      flex: 2
  },
  row3: {
      flexDirection: 'row',
      flex: 3
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: "center" 
  },
  column1: {
    flexDirection: 'column',
    flex: 1
  },
  column2: {
    flexDirection: 'column',
    flex: 2
  },
  column6: {
    flexDirection: 'column',
    flex: 6
  },
  column4: {
    flexDirection: 'column',
    flex: 4
  },
  column3: {
    flexDirection: 'column',
    flex: 3
  },
  round: {
      width: 30,
      height: 30,
      borderRadius: 30/2
  }
});