/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import NavigationService from './NavigationService';

import LoginForm from './app/components/Login/index.js';
import SignupForm from './app/components/Signup/index.js'
import DashboardPage from './app/components/Dashboard/index.js';
import  PostEvents  from "./app/components/Dashboard/post_form.js";
import {Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import EditEvents from './app/components/Dashboard/edit_form.js';
import CardExpand from './app/components/CardExpand/CardExpand.js'

const TopLevelNavigator = createStackNavigator({
  Home: {
    screen: LoginForm,
    navigationOptions: {
      header: null,
    }
  },
  Dashboard :{
    screen: DashboardPage,
    navigationOptions: {
      header: null,
    }
  },
  Signup: {
    screen: SignupForm,
    navigationOptions: {
      header: null,
    }
    
  },
 
  PostEventsPage:{
    screen: PostEvents,
    navigationOptions: {
      header: null,
    }
  },

  EditEventsPage:{
    screen: EditEvents,
    navigationOptions: {
      header: null,
    }
  
  },
  CardExpandPage:{
    screen:CardExpand,
    navigationOptions: {
      header: null,
    }
  }

  

 
  
});

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  // ...

  
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}