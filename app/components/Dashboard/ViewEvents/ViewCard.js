import React, { Component } from 'react';
import { Image,View,StyleSheet,Dimensions,ImageBackground ,TouchableNativeFeedback} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import NavigationService from './../../../../NavigationService';
import Loader from '../../loader';
require ('datejs');
export default class ViewCard extends Component {


  constructor() {

    super();
    this.state = {count: 0};
  }

  _incrementCount() {
    this.setState = ({
      count : ~(this.state.count)
    });
  }
  render() {

    const art= this.props.article;
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
    const price = "₹"+art.price
    const date = art.start_date
    const summary = art.event_summary;
    const genre = art.genre;
    const title = art.title;
    const distance =  art.distance
    const img_url = art.image_url
    const prop = this.props.parentFlatlist;
	/*const details="We welcome you to an exclusive workshop on the various cuisines of India. We invite you to the delicious experience free of cost.";
	const Depariment="An Introduction to Indian Cuisines";
	const Field="Indian Cuisine";
	const visibility=10;*/
    return (
      <TouchableNativeFeedback
      useForeground
        onPress={ () =>{
           NavigationService.navigate('CardExpandPage',{"data":art});
          // prop.handleRefresh();
        }
        
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
            <Text style={{marginLeft: 7,marginBottom: 5,marginTop:10,color:"#228B22"}}>Distance: {distance} km</Text>

          </Body>
          </Left>
          <View style={{ flexDirection: "row" }}>
          <Text>{price}</Text>
         </View>		 
         </CardItem>
			          </Card>
          
      </TouchableNativeFeedback>
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
    flex: 0,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
   borderRadius:5
    
  
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