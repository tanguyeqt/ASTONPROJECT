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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Colors from '../constants/Colors';
import FeatherIcon  from 'react-native-vector-icons/Feather';


const userImage = {uri : 'https://pbs.twimg.com/profile_images/951903664809050114/Grfd40ih_400x400.jpg'}
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
String.prototype.capitalizeFirstLetter = function() {
  return `${this.substr(0,1).toUpperCase()}${this.substr(1)}`;
}
export default class Question extends React.Component {

  constructor(props) {
    super(props)
    //this.state = {id: this.props.id, rate: 0, questionnaires: []};
    this.tweetPressed = this
      .tweetPressed
      .bind(this)

    this.retweet = this.retweet.bind(this)
    this.like = this.like.bind(this)
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
  like(){
    const {rated, avis} = this.state
  

    if (rated) 
      this.setState({rated: false, avis: avis-1})
    

    else this.setState({rated: true, avis: avis+1})
  }

  comments(source) {
    if(source === 'fil')
        this.props.navigation.navigate('Commentary');
    else
        this.props.navigation.navigate('CommentaryMyQuestion');
  }

  infosQuestion() {
    if(this.props.source === 'fil')
        this.props.navigation.navigate('DisplayQuestion');
    else
        this.props.navigation.navigate('DisplayQuestionMyQuestion');
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

  showResponse(response) {
    if (response.typeresponse === 1)
    {
        return (
            <Text style={styles.responseText}>{response.correctresponse[0]}</Text>
        )
    }
    else if (response.typeresponse === 2)
    {
        var i = 0;
        return (
            <View>
                {response.correctresponse.map((correct) =>
                    <View key={i++} style={[styles.row, {marginTop: 5}]}>
                        <FeatherIcon style={styles.responseText} name='check-square' />
                        <Text style={[styles.responseText, {marginLeft: 10}]}>{correct}</Text>
                    </View>
                )}
                {response.incorrectresponse.map((incorrect) =>
                    <View key={i++} style={[styles.row, {marginTop: 10}]}>
                        <FeatherIcon style={styles.responseText} name='square' />
                        <Text style={[styles.responseText, {marginLeft: 10}]}>{incorrect}</Text>
                    </View>
                )}
          </View>
        )
    }
    else if (response.typeresponse === 3)
    {
        var i = 0;
        return (
            <View>
                {response.correctresponse.map((correct) =>
                    <View key={i++} style={[styles.row, {marginTop: 5}]}>
                        <FeatherIcon style={styles.responseText} name='check-circle' />
                        <Text style={[styles.responseText, {marginLeft: 10}]}>{correct}</Text>
                    </View>
                )}
                {response.incorrectresponse.map((incorrect) =>
                    <View key={i++} style={[styles.row, {marginTop: 10}]}>
                        <FeatherIcon style={styles.responseText} name='circle' />
                        <Text style={[styles.responseText, {marginLeft: 10}]}>{incorrect}</Text>
                    </View>
                )}
            </View>
        )
    }
}

  render() {
    return(
      <TouchableHighlight onPress={()=>this.infosQuestion()} onPressIn={() => this.tweetPressed(true)} onPressOut={() => this.tweetPressed()}>
        <View key={this.props.key} style={styles.container}>
              <View style={styles.info}>
                <View style={styles.row}>
                    <View style={[styles.column]}>
                        <TouchableOpacity style={[styles.round, {backgroundColor: this.traductColor()}]}></TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.level}>{this.props.level}</Text>
                    </View>
                    <View style={styles.column5}>
                        <Text style={styles.category}>{this.props.category}</Text>
                        <Text style={styles.theme}>{this.props.theme}</Text>
                    </View>
                    <TouchableOpacity style={styles.column} onPress={() => { this.showActionSheet() }}>
                        <EvilIcons name={'chevron-down'} size={50} color={"rgb(136, 153, 166)"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{this.props.question}</Text>
                    <View style={{marginTop: 20}}>
                        {
                            this.showResponse(this.props.response)
                        }
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.difficulty}>Difficulté : {this.props.difficulty}</Text>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                            <Text style={styles.pseudo}>@{this.props.login}</Text>
                        </TouchableOpacity>
                        <Text style={styles.lastModified}>{this.props.lastModified}</Text>
                    </View>                    
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={()=> this.retweet()} style={styles.addButton}>
                        <Icon name={'add'} size={18} color={'rgb(136, 153, 166)'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.like()}  style={styles.rateButton}>
                        <Icon name={'star'} size={18} style={{marginLeft:4}} color={this.props.rated ? "rgb(255,215,0)" : 'rgb(136, 153, 166)'}/>
                        <Text style={[styles.rateButtonIcon, {color: this.props.rated ? "rgb(255,215,0)" : "rgb(136, 153, 166)",fontWeight: this.props.rated ? "bold" : "300",}]}>
                            {this.props.note} ({this.props.avis})
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.comments(this.props.source)} style={styles.commentButton}>
                        <Icon name={'comment'} style={styles.commentButtonIcon} size={18} color={'rgb(136, 153, 166)'}/>
                        <Text style={styles.commentsCount}>{this.props.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentButton}>
                        <Icon name={'people'} size={18} color={'rgb(136, 153, 166)'}/>
                        <Text style={styles.commentsCount}>{this.props.uses}</Text>
                    </TouchableOpacity>
                </View>
              </View>
        </View>
       </TouchableHighlight>

    )
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      message: 'Que voulez-vous faire ?',
      options: ['Modifier', 'Noter', 'Ajouter à un questionnaire', 'Commenter', 'Supprimer', 'Annuler'],
      cancelButtonIndex: 5,
      destructiveButtonIndex: 4,
    },
    (index) => { 
      if(index===0)
      {
        this.updateQuestion(this.props.id);
      }
      else if (index === 1)
      {
        this.addNote(this.props.id);
      }
      else if (index === 2)
      {
        this.addQuestionToQuestionnaire(this.props.id);
      }
      else if (index === 3)
      {
        this.addComment(this.props.id);
      }
      else if (index === 4)
      {
        this.deleteQuestion(this.props.id);
      }
    });
  }

  updateQuestion = (id) => {
    let page = '';
    if(this.props.source === 'fil')
        page = 'UpdateQuestion';
    else if(this.props.source === 'myquestion')
        page = 'UpdateQuestionMyQuestion'
    else
        page = 'UpdateQuestionQuestionnaire'
        
    this.props.navigation.navigate(page, {id: id, typequestion: 3, source: this.props.source});
  }

  addNote = (id) => {

  }

  addQuestionToQuestionnaire = (id) => {

  }

  addComment = (id) => {
    this.props.navigation.navigate('CommentaryMyQuestion');
  }

  deleteQuestion = (id) => {

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
    marginLeft: 30
  },
  level: {
    color: "rgb(136, 153, 166)",
    marginLeft: 5,
    marginRight: 5
  },
  category: { 
    color: "white", 
    fontWeight: "bold"
  },
  theme: {
    color: "rgb(136, 153, 166)",
    fontWeight: "bold"
  },
  questionContainer: { flex: 1, borderColor: "blue", borderWidth: 0 },
  questionText: { color: "white", paddingRight: 10, fontSize: 12, fontWeight: 'bold', paddingTop: 10 },
  responseText: { color: "white", paddingRight: 10, fontSize: 12, color: "rgb(136, 153, 166)" },
  difficulty: { color: "white", paddingTop: 20, fontSize: 10, color: "rgb(136, 153, 166)" },
  pseudo: { color: Colors.blueLinkProfile, paddingTop: 20, textAlign: 'right' },
  lastModified: { color: "rgb(136, 153, 166)", fontSize: 10, textAlign: 'right' },
  actionsContainer: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 0,
    marginTop: 5,
    flexDirection: "row",
    paddingBottom: 5
  },
  commentButton: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
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
    flex: 1
  },
  column5: {
    flexDirection: 'column',
    flex: 5
  },
  round: {
      width: 30,
      height: 30,
      borderRadius: 30/2
  }
});