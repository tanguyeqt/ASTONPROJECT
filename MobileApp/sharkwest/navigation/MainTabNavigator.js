import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import FilQuestionScreen from '../screens/FilQuestionScreen';
import MyQuestionScreen from '../screens/MyQuestionScreen';
import CommentaryScreen from '../screens/CommentaryScreen';
import DisplayQuestionScreen from '../screens/DisplayQuestionScreen';
import MyQuestionnaireScreen from '../screens/MyQuestionnaireScreen';
import DisplayQuestionnaireScreen from '../screens/DisplayQuestionnaireScreen';
import Colors from './../constants/Colors';
import UpdateQuestionScreen from '../screens/UpdateQuestionScreen';
import CreateQuestionnaireScreen from '../screens/CreateQuestionnaireScreen';
import UpdateQuestionnaireScreen from '../screens/UpdateQuestionnaireScreen';
import CreateQuestionScreen from '../screens/CreateQuestionScreen';
import CreateSimpleQuestionScreen from '../screens/CreateQuestion/CreateSimpleQuestionScreen';
import CreateQCUScreen from '../screens/CreateQuestion/CreateQCUScreen';
import CreateQCMScreen from '../screens/CreateQuestion/CreateQCMScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileScreen from '../screens/UpdateProfilScreen';

const HomeStack = createStackNavigator({
  FilQuestion: FilQuestionScreen,
  Commentary: CommentaryScreen, 
  DisplayQuestion: DisplayQuestionScreen,
  UpdateQuestion: UpdateQuestionScreen,
  Profile: ProfileScreen,
  UpdateProfile: UpdateProfileScreen
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Fil de questions',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home` //${focused ? '' : 'ios-list-box'}`
          : 'md-home'
      }
    />
  ),
};



const MyQuestionStack = createStackNavigator({
  MyQuestion: MyQuestionScreen,
  DisplayQuestionMyQuestion : DisplayQuestionScreen,
  CommentaryMyQuestion: CommentaryScreen,
  UpdateQuestionMyQuestion: UpdateQuestionScreen,
  CreateQuestion:CreateQuestionScreen,
  CreateSimpleQuestion:CreateSimpleQuestionScreen,
  CreateQCU:CreateQCUScreen,
  CreateQCM:CreateQCMScreen
});

MyQuestionStack.navigationOptions = {
  tabBarLabel: 'Questions',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon 
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-help-circle' : 'md-help-circle'}
    />
  ),
};

const QuestionnaireStack = createStackNavigator({
  MyQuestionnaire: MyQuestionnaireScreen,
  DisplayQuestionnaire: DisplayQuestionnaireScreen,
  UpdateQuestionQuestionnaire: UpdateQuestionScreen,
  CreateQuestionnaire: CreateQuestionnaireScreen,
  UpdateQuestionnaire: UpdateQuestionnaireScreen
});

QuestionnaireStack.navigationOptions = {
  tabBarLabel: 'Questionnaire',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MyQuestionStack,
  QuestionnaireStack
}, 
{
  tabBarOptions: {
    activeTintColor: Colors.text,
    activeBackgroundColor: Colors.secondaryColor,
    inactiveTintColor: Colors.greyLight,
    style: {
      backgroundColor: Colors.secondaryColor,
      paddingVertical: 10,
      height: 60
    }
  }
});
