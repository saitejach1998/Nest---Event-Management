

import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,AsyncStorage} from 'react-native';
import { Container, Header, Content, Button } from 'native-base';

import DefaultPreference from 'react-native-default-preference';
import Loader from '../loader'
import { join } from 'path';
var hash = require('hash.js');


export default class Signupform extends Component {
  constructor(){
    super();
    this.state ={
      username:"",
      password:"",
      isloading:false,
      modalVisible: false,
      modaltext:"",
      gst:'NaN'
    }
      this.getFromFrom = this.getFromFrom.bind(this)
      this.handleResponse = this.handleResponse.bind(this)
     
      
  }
  

  sendRequest(data){
    this.setState({isloading:true});
     fetch("http://192.168.43.209:3000/adduser"
     ,{
         method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
      
   })
   .then(res => this.handleResponse(res))
   .catch(err => console.warn(err));
   
  }
 
   
 
  handleResponse(response){
       
       this.setState({isloading:false});
       
       //var response_msg = response[]
       var bodyText = response['_bodyText']
       var jsObj = JSON.parse(bodyText);
       var response_msg = jsObj.respMsg;
       if(response_msg == "user_saved"){
        //User Saved
        var user_id = jsObj.userID
        console.warn(user_id)
      
        //SharedPreferences.setItem('userID', user_id)
        // Works on both iOS and Android
          Alert.alert(
            'Account Created!!',
            'User has been created successfully',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
          DefaultPreference.set('userID', user_id).then(function() {
            console.log('done')
            
           });
           this.props.navigation.navigate('Dashboard')
       }
       else if(response_msg == "unable_to_save"){
         //pls try again, server messed up
         Alert.alert(
          'Unable to create accound!',
          'User could not be created now@!',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );

       }
       else if(response_msg == "username_exists"){
        Alert.alert(
          'Username Exists!!',
          'There exists an account with the same username',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
         //uname exists
       }
       else if(response_msg == "unknown_gst_number"){
         //prompt for valid gst

         Alert.alert(
          'Unknown GST Number',
          'GST number was not valid',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
       }

      
         
     }
       
  
   getFromFrom(){
    let gstval = undefined;
    if(this.state.gst==""){
      gstval = 'NaN'
    }else{
      gstval = this.state.gst
    }
     const post_data = {
       'name':this.state.name,
       'emailID':this.state.email,
       'userName':this.state.username,
       'gstNumber':gstval,
       'passwordHash': this.state.password
 
     }
     //console.warn(post_data)
     this.sendRequest(post_data);
     
   }
   



  render() {
    return (
      <View style={styles.login}>
      <Loader
          loading={this.state.isloading} />
        <Text style={styles.header}>Signup Form</Text>

        <TextInput style={styles.textinput} placeholder="Name"     placeholderTextColor= '#fff' onChangeText={(text) => this.setState({name: text})}/>
        <TextInput style={styles.textinput} placeholder="Email id" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({email: text})}/>
        <TextInput style={styles.textinput} placeholder="GST Number" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({gst: text})}/>
        <TextInput style={styles.textinput} placeholder="Username" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({username: text})}/>
        <TextInput style={styles.textinput} placeholder="Password" placeholderTextColor= '#fff'onChangeText={(text) => this.setState({password: hash.sha256().update(text).digest('hex')})} secureTextEntry={true}/>

       <Button style={styles.button} onPress={this.getFromFrom}>
          <Text style = {styles.btntext} >Sign up</Text> 
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput:{
    alignSelf:'stretch',
    height:40,
    marginBottom: 30,
    color: '#ffffff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    justifyContent:'center'
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',

  }
});
