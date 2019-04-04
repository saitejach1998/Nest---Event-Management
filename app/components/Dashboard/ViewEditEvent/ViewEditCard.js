import React, { Component } from 'react';
import { Image,View,StyleSheet,Dimensions,ImageBackground ,TouchableNativeFeedback,Alert,ActivityIndicator} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,ActionSheet } from 'native-base';
import NavigationService from './../../../../NavigationService'
import Swipeout  from 'react-native-swipeout';
import Loader from '../../loader'
require ('datejs');
export default class ViewEditCard extends Component {


  constructor() {

    super();
    this.state = {count: 0,loading :false};
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  

  _incrementCount() {
    this.setState = ({
      count : ~(this.state.count)
    });
  }

  deleteEvent(_id,userID){
      console.warn(_id);

    const params = {
        "_id" : _id,
        "userID": userID
    };
    this.setState({loading:true});
    
    fetch("http://192.168.43.209:3000/deleteevent"
        ,{
            method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
         
      })
      .then(res => console.warn(res))
     
      .catch(err => console.warn(err));

     }

  
  render() {

    /*
'userID':'5c75a2ec12ce5d19d055ea2e',
          'title':this.state.title,
          'event_summary':this.state.summary,
          'duration':this.state.days,
          'description':this.state.price,
          'genre': this.state.genre,
          'start_date':this.state.chosenDate,
          'image_base64':this.state.photo_data,
          'latitude':this.state.latitude,
          'longitude':this.state.longitude
*/
    const nav = this.props.nav;
    const art= this.props.article;
    const price = "₹"+art.price;
    const date = art.start_date;
    const art_key  = art._id;
    const uid = art.userID;
    const summary = art.event_summary;
    const genre = art.genre;
    const title = art.title;
    const distance =  art.distance
    const img_url = art.image_url
    const prop = this.props.parentFlatlist;

    
    const swipeSettings = {
        autoClose: true,
        onClose : (secId,rowId,direction) =>{

        },
        onOpen : (secId,rowId,direction) =>{

        },
        right :[
            {
                onPress : () =>{
                   NavigationService.navigate('EditEventsPage',{"pre_data":art});
                   prop.handleRefresh();
                },
                text:'Edit  ',type:'primary'
            },
            {
                onPress : () =>{
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete this post?',
                        [
                          {
                            text: 'NO',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'YES', onPress: () => {
                             this.deleteEvent(art_key,uid); 
                            prop.handleRefresh();
                          }},
                        ],
                        {cancelable: false},
                      );
                },
                text:'Delete',type:'delete'
            }
        ],
        rowId: art_key,
        sectionId:1 
    };
    return (
    
    <Swipeout {...swipeSettings}>
<TouchableNativeFeedback
      useForeground
        onPress={ () =>{
           NavigationService.navigate('CardExpandPage',{"data":art});
           prop.handleRefresh();}
        
  }
    >
         
          <Card style={styles.container}>
          <CardItem>
            <Left>
              <Body>
            <Text>{title}</Text>
            <Text note>{Date.parse(date.slice(0,10)).toString('D')}</Text>
             </Body>
            </Left>
          </CardItem>
          <CardItem>
          <View>
            <ImageBackground style={styles.mainimage} source={{uri: img_url}}  ><Text style={{bottom: -90,textAlign: "bottom",textAlign: "center",fontSize: 25}}>{title}</Text></ImageBackground>
            </View >
          </CardItem>
          <CardItem>
          <Body>
            <Text>
            {summary}
            </Text>
          </Body>
         </CardItem>
         <CardItem>
          <Left>
          <Body >
            <Text style={{color: '#EB4958'}}><Image style={styles.image1} source={require('../../../images/images/chef.png')}  />{genre}</Text>
           

          </Body>
          </Left>
          <View style={{ flexDirection: "row" }}>
          <Text>{price}</Text>
         </View>		 
         </CardItem>
			          </Card>
          
      </TouchableNativeFeedback>
  
    </Swipeout>
    );
  }
}
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  mainimage:{
    width: Dimensions.get('window').width-37,
    height:150,
    alignSelf: 'center',
    textAlign: 'center'
  },
  container:{
      marginTop:5,
	 borderRadius:5
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain'

  },
  image1: {
    width: 20,
    height: 20,


  },

});