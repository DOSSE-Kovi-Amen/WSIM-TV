import React from 'react';
import {
  SafeAreaView, Text, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LinkTab from './HomeScreen';
import Publier from './AddPostScreen';
import { styles } from '../constants/styles';
import { colors } from '../constants/colors';
import HomeScreen from './HomeScreen';
import Radio from './Radio';
import PostScreen from './PostScreen';
 

export default function TabLayout(){
    const Tab = createMaterialTopTabNavigator();

    return (

        <Tab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
          tabBarActiveTintColor: 'gold',
          tabBarInactiveTintColor: 'white',
          tabBarStyle:{backgroundColor:colors.mainColor, padding:5},
          
          tabBarIndicatorStyle:{backgroundColor:'gold', margin:10,}
        }}
      >
        <Tab.Screen name="home" component={HomeScreen} options={{ title:"WSIM LIVE" }} />
        <Tab.Screen name="radio" component={Radio} options={{ title:"WSIM RADIO" }}/>
        <Tab.Screen name="post" component={PostScreen} options={{ title:"Posts" }}/>
        
      </Tab.Navigator>
           
 
   );
}