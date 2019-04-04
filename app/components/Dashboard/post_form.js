

import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, Image,TouchableOpacity,Alert} from 'react-native';
import { Container, Header, Content, DatePicker, Button,Picker, Item} from 'native-base';
import Loader from '../loader.js'
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';
import DefaultPreference from 'react-native-default-preference';


export default class PostEvents extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date(),
          selected2:undefined,
                        type: undefined,
                        isloading:false,
                      };
        
        this.setDate = this.setDate.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleResponse = this.handleResponse.bind(this)

      }
      handleChoosePhoto = () => {
        const options = {
          
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            
            this.setState({ photo: response,
              photo_data: response.data
             })
          }
        })
      }

     async componentWillMount(){
      const uid = await DefaultPreference.get('userID');
      //console.warn(uid); 
      this.setState({userID:uid})
        Geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => console.warn (error.message ),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
     );
      }



      getFormData(){
       
        this.setState({isloading:true});

        const post_data = {
          'userID':this.state.userID,
          'title':this.state.title,
          'event_summary':this.state.summary,
          'duration':this.state.days,
          'description':this.state.description,
          'genre': this.state.selected2,
          'start_date':this.state.chosenDate,
          'image_base64':this.state.photo_data,
          'latitude':this.state.latitude,
          'longitude':this.state.longitude,
          'price':this.state.price
    
        }
        console.warn(post_data)
        this.sendRequest(post_data);
        
      }


      sendRequest(data){
        
         fetch("http://192.168.43.209:3000/eventposting"
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
        if(response_msg == 'local_event_saved' || response_msg == 'global_event_saved'){
          // Saved 
          Alert.alert(
            'Event Created!!',
            'Event has been created successfully',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
          this.props.navigation.goBack();
        }
        else{
          // Try again later
          console.warn(response_msg)
          Alert.alert(
            'Unable to create event!',
            'Please Try again later!!',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
  
        }
        
      }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }


    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

  render() {
    const { photo } = this.state

    return (
      <View style={styles.container}>
      
        <View style={styles.login}>
        <Loader
          loading={this.state.isloading} />
          <Text style={styles.header}>Posting an Event</Text>
          <ScrollView style={styles.scrolling}>
          
          <TextInput style={styles.textinput} placeholder="Title of the Event" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({title: text})}/>
          <TextInput style={styles.textinput} placeholder="Event Summary" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({summary: text})} />
          <TextInput style={styles.textinput} placeholder="Duration" placeholderTextColor= '#fff' keyboardType="numeric" onChangeText={(text) => this.setState({days: text})}/>
          
          <TextInput style={styles.textinput} placeholder="Event Description" placeholderTextColor= '#fff' onChangeText={(text) => this.setState({description: text})}/>
          <TextInput style={styles.textinput} placeholder="Price" placeholderTextColor= '#fff' keyboardType = "numeric" onChangeText={(text) => this.setState({price: text})} />
          <Item style={{marginTop:5,marginBottom:20}}>
            
                <Picker
                  mode="dropdown"
                  
                  style= {styles.pickerstyle}
                  placeholderStyle={{ color: "#fff" }}
                  placeholder="type of event"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Education" value="Education"/>
                  <Picker.Item label="Workshop" value="Workshop" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Skill Development" value="Skill Development" />
                  <Picker.Item label="Sports" value="Sports" />
                </Picker>
              </Item>
          
          <DatePicker 
              
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Click here to select Start date"
              textStyle={{color: "#fff" }}
              onDateChange={this.setDate}
              disabled={false}
              />
        
        
          
        <View style={{ flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 50, height: 40 }}
          />
        )}
        <Button style = {{alignSelf: 'stretch',marginLeft:20, alignItems: 'center', padding: 20, backgroundColor: '#59cbbd', marginTop:13, justifyContent:'center'}} onPress={this.handleChoosePhoto}>
          <Text style = {styles.btntext} >Upload Image</Text>
        </Button>
        </View>



          </ScrollView>

        
              
        <Button style={styles.button}  onPress={this.getFormData}>
            <Text style = {styles.btntext} >Post Event</Text> 
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
    alignItems:'center',
    backgroundColor:'#36485f'
   
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    paddingBottom: 10,
    marginBottom: 40,
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
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 0.5,
  },
  pickerstyle:{
    width:undefined,
     height:30,
    marginLeft:2,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop:15,
    justifyContent:'center'
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',

  }
});
