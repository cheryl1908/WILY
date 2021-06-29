import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, LogBox } from 'react-native';
import Transaction from './screens/transaction';
import Search from './screens/search';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Login from './screens/login';

export default class App extends React.Component{

  render(){
    console.disableYellowBox=true;
    return (
      <AppContainer/>
    )
  }
}
const TabNavigator=createBottomTabNavigator({
  Transaction:{screen:Transaction},
  Search:{screen:Search}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName=navigation.state.routeName;
      if(routeName==="Transaction"){
        return(
          <Image source={require("./assets/book.png")} style={{width:40,height:40}}></Image>
        )
      }else if(routeName==="Search"){
        return(
          <Image source={require("./assets/searchingbook.png")} style={{width:40, height:40}}></Image>
        )
      }
    }
  })
})
const switchNavigator=createSwitchNavigator({
  Login:{screen:Login},
  TabNavigator:{screen:TabNavigator}
})
const AppContainer=createAppContainer(switchNavigator);