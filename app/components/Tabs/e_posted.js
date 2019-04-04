import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ViewEditCard from '../Dashboard/ViewEditEvent/ViewEditCard.js'
//import getEvents from '../Dashboard/ViewEvents/getEvents.js'
import DefaultPreference from 'react-native-default-preference';

export default class User_Events extends Component{
  constructor(props) {
    super(props);
    this.state = { events: [], refreshing: true };
    this.fetchEvents = this.fetchEvents.bind(this);
   
  }

  
  async componentDidMount() {
    console.warn(this.props)
    const uid = await DefaultPreference.get('userID');
    //console.warn(uid); 
    this.setState({userID:uid})
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,

          error: null,
        });
      },
      (error) => console.warn (error.message ),
      { 
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }
      
 );


    this.fetchEvents();
  }
  
  fetchEvents() {
    
    const params = {
      'userID':this.state.userID,
      'type':'self'


    };
   this.getEvents(params)
  
  }

  getEvents(params) {
    
    if(params['type'] == 'global'){
      url = "http://192.168.43.209:3000/getglobalevents";
    }
    else if(params['type'] == 'local'){
      url= "http://192.168.43.209:3000/getlocalevents";
    }
    else if(params['type'] == 'self'){
      url= "http://192.168.43.209:3000/getuserevents";
    }
    else{
      
    }
  
  
        fetch(url
           ,{
               method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(params)
            
         })
         .then(res => this.setState({ events:JSON.parse(res['_bodyText']).event_list, refreshing: false }))
         .then(console.log(this.state.events))
         .catch(err => console.warn(err));

        }



  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchEvents()
    );
  }

render() {
   return (
    
        <FlatList
            data={this.state.events}
            renderItem={({ item }) => <ViewEditCard article={item} nav = {this.props.navigation} parentFlatlist={this} />}
            keyExtractor={item => item._id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
    
      
   );
}
}