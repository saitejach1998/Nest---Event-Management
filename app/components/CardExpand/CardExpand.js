import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Header, Content, DatePicker, Button,Picker, Item,Textarea} from 'native-base';



export default class CardExpand extends Component {
    constructor(props) {
        super(props);}

    
  render() {
    const propTypes = this.props.navigation.state.params.data;
    return (
      <View style={styles.login}>
        <Text style={styles.header}>Event Details</Text>
        <ScrollView style={styles.scrolling}>
        <Text style={styles.textinput}>{propTypes.title}</Text>
        <Text style={styles.textinput}>Price: {propTypes.price} ₹</Text>
        <Text style={styles.textinput}>Start Date: {propTypes.start_date}</Text>
        <Text style={styles.textinput}>Event Duration: {propTypes.duration} hrs</Text>
        <Text style={styles.area} multiline = {true} numberOfLines = {10}>{propTypes.description}</Text>
        
        
        </ScrollView>   
       {/* <Button style={styles.button} >
          <Text style = {styles.btntext}>Done</Text> 
        </Button> */}
        
        </View>
    );
  }
  
}


const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems:'center',
    // marginTop:20,
    // marginBottom:20,
    backgroundColor: '#36485f'
   
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    paddingBottom: 10,
    marginBottom: 40,
    marginTop: 20,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  scrolling: {
   height:450,
   width:350,
   
  },
  textinput:{
    fontSize: 15,
    alignSelf:'stretch',
    height:40,
    marginLeft:6,
    marginTop:10,
    marginBottom: 20,
    color: '#ffffff',
    
  },
  area: {
    flex:3,
    fontSize: 15,
    alignSelf:'stretch',
    marginLeft:6,
    marginTop:10,
    marginBottom: 20,
    color: '#ffffff',
    
  },
  button: {
    width:100,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop:15,
    marginLeft: 200,
    justifyContent:'center'
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',

  }
});