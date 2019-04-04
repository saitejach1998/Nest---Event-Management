import React, {Component} from 'react';
import {Platform,Dimensions, StyleSheet, Text, View,TextInput,FlatList} from 'react-native';
import Modal from'react-native-modalbox';
import {Button,Container, Header, Content, Icon, Picker, Form } from 'react-native-button';
import {Slider} from 'react-native-elements';

var screen = Dimensions.get('window');
export default class addModal extends Component{
    constructor(props){
        super(props);
        
    }
    onValueChange(value) {
        this.setState({
          selected1: value
        });
      }
    showAddModal = () => {
        this.refs.myModal.open()

    }
    render(){
        return (
            <Modal
            ref = {"myModal"}
                style = {{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 0:30,
                    shadowRadius: 10,
                    width:screen.width - 80,
                    height:200
                }}
                position = 'center'
                backdrop = {true}
                onClosed = {() =>{
                    alert("Modal closed");

                }}
            
            >
                            <View style={styles.modalContainer}>
              <Text style = {{fontSize:30,marginBottom:100,color : '#59cbbd',fontStyle:'italic'}}>Filter page</Text>
              <View style={styles.innerContainer}>
              <Text style = {{marginTop: 15,fontSize:15,color:'#fff'}}>Select genre :</Text>
              <Picker
              mode="dropdown"
  
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100,color:'#fff',marginLeft:10}}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Sports" value="key0" />
              <Picker.Item label="Education" value="key1" />
              <Picker.Item label="Skill development" value="key2" />
              <Picker.Item label="Food" value="key3" />
              <Picker.Item label="Workshops" value="key4" />
            </Picker>
               
            </View>

              <View style={styles.innerContainer}>
              <Text style = {{marginTop: 15,fontSize:15,color:'#fff'}}>Select distance :</Text>
              
              <View style={{ marginTop:5,marginLeft:5,width:100, flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              <Slider
              thumbTintColor = '#fff'
              step = '1'
              value = '0'
              maximumValue = '30'
              minimumTrackTintColor = '#59cbbd'
              value={this.state.value}
              onValueChange={value => this.setState({ value })}
              />
              <Text style = {{color:'#fff'}}>{this.state.value} km</Text>
                </View>
               
              </View>


              <Button 
                
                    title="Apply"
                >
                </Button>
            </View>



                </Modal>
            );
        }
        
}
const styles = StyleSheet.create({
  
});