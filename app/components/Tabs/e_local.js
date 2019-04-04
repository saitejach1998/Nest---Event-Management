import React, {Component} from 'react';
import {Platform,Dimensions, StyleSheet, Text, View,TextInput,FlatList} from 'react-native';

import ViewCard from '../Dashboard/ViewEvents/ViewCard.js'
//import getEvents from '../Dashboard/ViewEvents/getEvents.js'
import Geolocation from 'react-native-geolocation-service';
import AddModal from './addModal.js'
import Modal from'react-native-modalbox';
import { Container, Header, Content, Icon, Picker, Form,Button } from "native-base";
import {Slider} from 'react-native-elements';


var screen = Dimensions.get('window');
export default class Local_Events extends Component{
  constructor(props) {
    super(props);
    this.state = { events: [], refreshing: true,selected: "key1",gfilter: false,dfilter:false,gfilval:"All",dfilval:500,silder_value:0,selected1:"All" };
    this.fetchEvents = this.fetchEvents.bind(this);
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  componentDidMount() {
    
    Geolocation.getCurrentPosition(
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
      'latitude':this.state.latitude,
      'longitude':this.state.longitude,
      "sort_dist": this.state.dfilter,
      "filter_genre":this.state.gfilval,
      "filter_dist": this.state.dfilval,
      'type':'local'

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
      url=""
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
  /*      
   console.log(res)
   this.setState({ events:JSON.parse(res['_bodyText']).event_list, refreshing: false })
    *9/
  }

  
  /*
    .then(events => this.setState({ events, refreshing: false }))
    .catch(() => this.setState({ refreshing: false }));
  */



  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchEvents()
    );
  }
_onPressAdd (){
  this.refs.myModal.open();
}
render() {
   return (
    <View style={{flex:1}}>
      <View style={{backgroundColor:'#36485f',height:60}}>
      <Button style = {{backgroundColor:'#59cbbd',marginLeft:350,marginTop:7}}
        onPress = {this._onPressAdd} >
          <Text style = {{padding:20}}>Filter</Text>
      </Button>
      </View>
      
      <FlatList
          data={this.state.events}
          renderItem={({ item }) => <ViewCard article={item} />}
          keyExtractor={item => item._id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
        <Modal
            ref = {"myModal"}
                style = {{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 0:30,
                    shadowRadius: 10,
                    width:screen.width - 80,
                    height:400
                }}
                position = 'center'
                backdrop = {true}
                onClosed = {() =>{
                    this.fetchEvents()

                }}  
            >
              <View style={styles.modalContainer}>
              <Text style = {{fontSize:30,marginBottom:50,color : '#59cbbd',fontStyle:'italic'}}>Filter page</Text>
              <View style={styles.innerContainer}>
              <Text style = {{marginTop: 15,fontSize:15,color:'#fff'}}>Select genre :</Text>
              <Picker
              mode="dropdown"
  
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100,color:'#fff',marginLeft:10}}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            > 
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Sports" value="Sports" />
            <Picker.Item label="Education" value="Education" />
            <Picker.Item label="Skill development" value="Skill Development" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Workshop" value="Workshop" />
            
            </Picker>
               
            </View>

              <View style={styles.innerContainer}>
              <Text style = {{marginTop: 15,fontSize:15,color:'#fff'}}>Select distance :</Text>
              
              <View style={{ marginTop:5,marginLeft:5,width:100, flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              <Slider
              thumbTintColor = '#fff'
              step = {50}
              value = '0'
              maximumValue = {1000}
              minimumTrackTintColor = '#59cbbd'
              value={this.state.silder_value}
              onValueChange={value => this.setState({slider_value : value })}
              />
              <Text style = {{color:'#fff'}}>{this.state.slider_value} km</Text>
                </View>
              
               
              </View>
              <Button style = {{backgroundColor:'#59cbbd',marginLeft:120}}
                    onPress={() =>{
                      console.warn(this.state.slider_value+" "+this.state.selected1)
                      this.setState({gfilval: this.state.selected1})
                      if(this.state.slider_value!=undefined){
                        this.setState({
                          dfilter: true,
                          dfilval : this.state.slider_value
                        })
                      }
                      else{
                        this.setState({
                          dfilter: false
                         
                        })
                      }
                      this.refs.myModal.close();
                         }}
              >
                <Text style = {{padding:20}}>apply</Text>
                </Button>

             
            </View>
        
          </Modal> 
    
    </View>
   );
}


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#36485f', padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
    height : 400,
    // width : 50,
    // justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  innerContainer: {
    // alignItems: 'center',
   // marginLeft:screen.width-400,
    width: 300,
    height:70,
    marginBottom:20,
    // backgroundColor:'#fff',
    alignSelf: 'baseline',
    flexDirection: 'row',
  },
});