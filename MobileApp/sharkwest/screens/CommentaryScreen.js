import React from 'react';
import {
  Animated,
  Image,
  Platform,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Button,
  ActivityIndicator,
  Dimensions,
  PixelRatio
} from 'react-native';

import { Input } from 'react-native-elements';
import Btn from 'react-native-elements/src/buttons/Button';
import Colors from '../constants/Colors';
import Commentary from '../components/Commentary';
import { Dialog, Portal } from 'react-native-paper';


const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const _width = Dimensions.get('screen').width * 0.7;
const _height = Dimensions.get('screen').height * 0.5;
const AnimatedListView = Animated.createAnimatedComponent(ListView);

export default class CommentaryScreen extends React.Component {

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Commentaires',
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
          onPress={() => { navigation.getParam('_openDialog')() }}
          title="Commenter"
          color={Colors.title4}
          buttonStyle={{ fontSize: 10}}
        />
      )
    }
  };

  constructor(props) {
    super(props);

    console.log('Width : ' + _width);
    console.log('Height : ' + _height);

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

  openDialog = (show) => {
    this.setState({ showDialog: show });
  }

  componentDidMount() {      
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    var commentaries = [
      {
        id: 1,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Robrinne',
        ownerid: 1,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 2,
        text: "Non pas du tout, c'est totalement correct",
        owner: 'Thunder',
        ownerid: 2,
        date: '11/03/2019 15:32',
        image: ''
      },
      {
        id: 3,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 4,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Robrinne',
        ownerid: 1,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 5,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 6,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 7,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 8,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      },
      {
        id: 9,
        text: "La question n'est pas correcte, la réponse est fausse",
        owner: 'Tanguieqt',
        ownerid: 66,
        date: '10/03/2019 13:50',
        image: ''
      }
    ];
    
    this.setState({ dataSource: ds.cloneWithRows(commentaries), data: true});

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

  componentWillMount() {
    this.props.navigation.setParams({ _openDialog: () => { this.openDialog(true) } });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
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
        <Commentary navigation={this.props.navigation} {...record} />
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View>
          { this.state.data 
            ? 
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
        <Dialog style={styles.popup} 
          title="Custom Dialog"
          animationType="fade" 
          contentStyle={
              {
                  alignItems: "center",
                  justifyContent: "center"
              }
          }
          onDismiss={ () => this.openDialog(false) }
          visible={ this.state.showDialog }>
          <Text style={styles.popupTitle}>
            Commenter
          </Text>
          <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 10 }}>
                <Input
                  inputStyle={{color: 'black', fontSize: 15}}
                  placeholderTextColor={'#000'}
                  placeholder='Ecrivez votre commentaire'
                  multiline={true}
                />
              </ScrollView>
          </Dialog.ScrollArea>
          
          <Btn
              onPress={ () => { this.openDialog(false) } }
              buttonStyle={{marginTop: 15, backgroundColor: Colors.buttonConnectColor, borderRadius: 10, paddingVertical: 10, marginVertical: 10, marginHorizontal: 10}}
              title="Envoyer le commentaire" />
        </Dialog>
    </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

  _goToQuestion = () => {
    this.props.navigation.navigate('DisplayQuestion');
  }

  _goToProfile = () => {
    this.props.navigation.navigate('Profile');
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primaryColor,
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
    },
    popup: {
      width: _width,
      height: _height,
      alignSelf: 'center'
    },
    popupTitle: {
      color: 'black',
      fontWeight:"bold",
      fontSize: 20,
      alignSelf: 'center',
      marginVertical: 20
    },
});
