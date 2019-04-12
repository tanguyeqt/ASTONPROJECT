import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity, 
} from 'react-native'
import { Icon } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Colors from '../constants/Colors';
import FeatherIcon  from 'react-native-vector-icons/Feather';

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
String.prototype.capitalizeFirstLetter = function() {
  return `${this.substr(0,1).toUpperCase()}${this.substr(1)}`;
}
export default class Question extends React.Component {

  constructor(props) {
    super(props)

    this.state = { id: 1};
  }

  render() {
    return(
      (this.state.id !== this.props.ownerid)
      ?
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.column]}>
              <Image 
                style={styles.img} 
                source={require('./../assets/images/profile.jpg')} />
          </View>
          <View style={styles.column5}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={[styles.linkProfile, styles.leftAlign]}>@{this.props.owner}</Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.grayTitle, styles.centerAlign]}>{this.props.date}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.spaceTop]}>
              <View style={styles.column}>
                <Text style={styles.whiteText}>{this.props.text}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      :
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column5}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={[styles.grayTitle, styles.centerAlign]}>{this.props.date}</Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.linkProfile, styles.rightAlign]}>@{this.props.owner}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.spaceTop]}>
              <View style={styles.column}>
                <Text style={styles.whiteText}>{this.props.text}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.column]}>
            <Image 
              style={styles.img} 
              source={require('./../assets/images/profile.jpg')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    flexDirection: "column",
    paddingVertical: 25,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20
  },
  leftAlign: {
    alignSelf: 'flex-start'
  },
  rightAlign: {
    alignSelf: 'flex-end'
  },
  centerAlign: {
    alignSelf: 'center'
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
  img: {
    borderRadius: 40/2,
    width: 40, 
    height: 40,
    alignSelf: 'center'
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
  spaceTop: {
    paddingTop: 15
  }
});