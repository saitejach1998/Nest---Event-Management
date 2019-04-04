import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text ,AsyncStorage} from 'native-base';
import Global_Events from '../Tabs/e_global';
import Local_Events from '../Tabs/e_local';
import User_Events from '../Tabs/e_posted';
import ActionButton from 'react-native-action-button';
import DefaultPreference from 'react-native-default-preference';



export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    
  }
  


  render() {
    


    return (
      <Container>
        
        <Tabs  locked={true}>
          <Tab heading={<TabHeading><Text>Popular Events</Text></TabHeading>}>
            <Global_Events />
          </Tab>
          <Tab heading={<TabHeading><Text>Events Around You</Text></TabHeading>}>
            <Local_Events/>
          </Tab>
          <Tab heading={<TabHeading><Text>Manage Events</Text></TabHeading>}>
            <User_Events props={this.props.navigation}/>
          </Tab>
        </Tabs>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('PostEventsPage')}></ActionButton>
      </Container>
    );
  }

}
