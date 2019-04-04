

import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,AsyncStorage} from 'react-native';

//import Signupform from './components/signup'
// import {createStackNavigator} from 'react-navigation';

import { Container, Header, Content, Button } from 'native-base';
import App from '../../../App';
import DefaultPreference from 'react-native-default-preference';
import NavigationService from './../../../NavigationService'
import Loader from '../loader'
var hash = require('hash.js');



export default class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      username:"",
      password:"",
      isloading:false,
      
    }
      this.getFromFrom = this.getFromFrom.bind(this);
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePwd = this.onChangePwd.bind(this);
      
  }
  
  

  componentWillMount(){
    //console.warn("going")
        DefaultPreference.get('userID').then(function(value){
          //console.warn(value);
          if(value != null){
            NavigationService.navigate('Dashboard');
          }
        })


      }
      

  
  

  onChange1(e){
    // console.warn(e)
    this.setState({
      [e.target.name]:e
    })
  }

  onChangeUser(e){
    
    this.setState({username:e});
    
  }
  onChangePwd(e){
    
    this.setState({password:hash.sha256().update(e).digest('hex')});
    
  }

 sendRequest(data){
   this.setState({isloading:true});
  fetch("http://192.168.43.209:3000/validateuser"
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

      var bodyText = response['_bodyText']
      var jsObj = JSON.parse(bodyText);
      var response_msg = jsObj.respMsg;
     // console.warn(response_msg)
      if(response_msg == "valid_user"){
       //User Saved
       var user_id = jsObj.userID
      // console.warn(user_id)
       
       //SharedPreferences.setItem('userID', user_id)
       // Works on both iOS and Android

       DefaultPreference.set('userID', user_id).then(function() {
        console.warn('done')
       });
         Alert.alert(
           'Login Succesful!!',
            ' ',
           [
             {text: 'OK'},
           ],
           {cancelable: false},
         );
         
        
        
         this.props.navigation.navigate('Dashboard');
        

      }
      else if(response_msg == "wrong_password"){
        //pls try again, server messed up
        Alert.alert(
         'Entered Wrong Username/Password',
         'Please Try Again@',
         [
           {text: 'OK'},
         ],
         {cancelable: false},
       );

      }
      else if(response_msg == "unknown_user"){
        //pls try again, server messed up
        Alert.alert(
         'Unkown User',
         'You are not a registerd User ,Please Signup',
         [
           {text: 'OK'},
         ],
         {cancelable: false},
       );

      }
      //SharedPreferences.setItem('userID', 'John13231231232132312321')
      
        
    }
      
 
  getFromFrom(){
    const post_data = {
      'userName':this.state.username,
      'passwordHash': this.state.password

    }
    console.warn(post_data)
    this.sendRequest(post_data);
    
  }
  
  render() {
   return (
      
      <View style={styles.container}>
        <Loader
          loading={this.state.isloading} />
        <View style={styles.login}>
          <Text style={styles.header}>Login Form</Text>
          <TextInput name = 'username'style={styles.textinput} placeholder="Username" placeholderTextColor= '#000' onChangeText={(text) => this.setState({username: text})} />
          <TextInput name = 'password'style={styles.textinput} placeholder="Password" placeholderTextColor= '#000' secureTextEntry={true} onChangeText={(text) => this.setState({password: hash.sha256().update(text).digest('hex')})}/>
      
          {/* <TouchableOpacity style={styles.button}>
            <Text style = {styles.btntext}>Login in</Text> 
          </TouchableOpacity> */}
          <Button  style = {styles.button} onPress={this.getFromFrom}>
              <Text style = {styles.btntext}>Login</Text>
            </Button>
          

          <Button style={styles.button} onPress={()=>this.props.navigation.navigate('Signup')}>
            <Text style = {styles.btntext} >Dont have an account? Sign up</Text> 
          </Button>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  
  login: {
    alignSelf: 'stretch',
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
    
    backgroundColor: '#59cbbd',
    marginTop: 30,
    justifyContent:'center'
  },
  btntext: {
    color: '#fff',
   
    fontWeight: 'bold',
    

  }
});






