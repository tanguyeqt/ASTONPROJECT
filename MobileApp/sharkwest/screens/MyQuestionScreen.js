import React from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Button,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors'; 
import Question from '../components/Question';

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const AnimatedListView = Animated.createAnimatedComponent(ListView);

export default class MyQuestionScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Mes questions',
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
          onPress={() => { navigation.navigate('CreateQuestion'); }}
          title="Ajouter" 
          color={Colors.title4}
        />
      ),

      headerLeft: (
        <TouchableOpacity onPress={ () => { navigation.getParam('_goToProfile')() }}>
          <Image 
            style={{width: 30, height: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 25}} 
            source={require('./../assets/images/profile.jpg')} /> 
        </TouchableOpacity>
      )
    }
  }

      constructor(props) {
        super(props);
    
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
    
        this.state = {
          dataSource: [],
          data: false,
          scrollAnim,
          offsetAnim,
          clampedScroll: Animated.diffClamp(
            Animated.add(
              scrollAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
              }),
              offsetAnim,
            ),
            0,
            NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
          ),
        };
      }
    
      _clampedScrollValue = 0;
      _offsetValue = 0;
      _scrollValue = 0;
    
      componentDidMount() {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
        var rows = [
          {
            id: 1,
            color: 'primary',
            level: 'CP',
            category: 'Géographie',
            theme: 'Les capitales',
            note: 4.2,
            rated: true,
            question: 'Quelle est la capitale de la France ?',
            response:
            {
              typeresponse: 1,
              correctresponse: ['Paris'],
              incorrectresponse: []
            },
            avis: 6,
            comments: 18,
            uses: 624,
            file: null,
            accountId: 1,
            login: 'Thunder',
            lastModified: '20/08/2018 18:50',
            difficulty: 'Facile'
          },
          {
            id: 3,
            color: 'warning',
            level: 'CE2',
            category: 'Mathématiques',
            theme: 'Les additions',
            note: 5.0,
            rated: true,
            question: 'Combien font 127 + 132 ?',
            response: 
            {
              typeresponse: 2,
              correctresponse: ['259'],
              incorrectresponse: ['159', '112', '260']
            },
            avis: 253,
            comments: 0,
            uses: 1490,
            file: null,
            accountId: 1,
            login: 'Thunder',
            lastModified: '21/03/2019 14:34',
            difficulty: 'Très facile'
          }
        ];
        
        this.setState({ dataSource: ds.cloneWithRows(rows), data: true});
    
        this.state.scrollAnim.addListener(({ value }) => {
          const diff = value - this._scrollValue;
          this._scrollValue = value;
          this._clampedScrollValue = Math.min(
            Math.max(this._clampedScrollValue + diff, 0),
            NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
          );
        });
        this.state.offsetAnim.addListener(({ value }) => {
          this._offsetValue = value;
        });
      }
    
      componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
      }

      componentWillMount() {
        this.props.navigation.setParams({ _goToProfile: () => { this._goToProfile() } });
      }
    
    
      _onScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
      };
    
      _onMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
      };
    
      _onMomentumScrollEnd = () => {
        const toValue = this._scrollValue > NAVBAR_HEIGHT &&
          this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
          ? this._offsetValue + NAVBAR_HEIGHT
          : this._offsetValue - NAVBAR_HEIGHT;
    
        Animated.timing(this.state.offsetAnim, {
          toValue,
          duration: 350,
          useNativeDriver: true,
        }).start();
      };
      
    _renderRow = (rowData, sectionId, rowId) => {
      return (
        <View style={{flex:1}}>
        <Image key={rowId} style={styles.row} source={{ uri: rowData.image }} resizeMode="cover"/>
          <Text style={styles.rowText}>{rowData.title}</Text>
        </View>
      );
    };

    renderRow(record){
      return(
          <Question source={"myquestion"} navigation={this.props.navigation} {...record} />
      );
    }

    render() {
      return (
        <View style={[styles.fill, {backgroundColor:"rgb(27, 40, 54)"}]}>
          { this.state.data ? 
            <AnimatedListView
              contentContainerStyle={styles.contentContainer}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              scrollEventThrottle={1}
              onMomentumScrollBegin={this._onMomentumScrollBegin}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              onScrollEndDrag={this._onScrollEndDrag}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                { useNativeDriver: true },
              )}
              backgroundColor={Colors.primaryColor}
            />
            :             
            <View style={[styles.container, styles.horizontal]}>                
                <ActivityIndicator size="small" color="rgb(29, 161, 242)" />
            </View> 
          }
        </View>
      );
    } 
  
    updateQuestion = (id) => {
      this.props.navigation.navigate('UpdateQuestion');
    }

    _goToProfile = () => {
      this.props.navigation.navigate('Profile');
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
      backgroundColor: Colors.secondaryColor,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    fill: {
      flex: 1,
    },
    navbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor,
      borderBottomColor: '#dedede',
      borderBottomWidth: 0,
      height: NAVBAR_HEIGHT,
      justifyContent: "flex-start",
      elevation:8,
      flex: 1, flexDirection: 'row'
      //paddingTop: STATUS_BAR_HEIGHT,
    },
    contentContainer: {
      //paddingTop: NAVBAR_HEIGHT,
    },
    title: {
      color: 'white',
      fontWeight:"bold"
    },
    row: {
      height: 300,
      width: null,
      marginBottom: 1,
      padding: 16,
      backgroundColor: 'transparent',
    },
    rowText: {
      color: 'white',
      fontSize: 18,
    },
    avatar:{
      marginRight:15
    }
});