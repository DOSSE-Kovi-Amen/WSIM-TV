import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import {
  StatusBar,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat2 from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './TabLayout';
import { styles } from '../constants/styles';
import { colors } from '../constants/colors';
import TabLayout from './TabLayout';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import VisionScreen from './VisionScreen';
import AddPostScreen from './AddPostScreen';
import PrivacyPolicyScreen from './PrivacyScreen';


const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Text style={{ fontSize: 16 }}>En cours de perfectionnement</Text>
      {/* <Button color={styles.mainColor} onPress={() => navigation.goBack()} title="Go back home" /> */}
    </View>
  );
}

const DrawerLayout = () => {
  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
  }, [])

  return (

    <Drawer.Navigator initialRouteName="tab"

      screenOptions={{
        headerTintColor: "white",
        headerShown: true,
        swipeEnabled: true,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.mainColor,
          // borderTopColor:'#ef5300',
          borderTopWidth: .5,
          // borderBottomColor:'gold',
          // borderBottomWidth:2,
        },

        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: colors.mainColor,
        drawerInactiveTintColor:'gray'

      }} >
      <Drawer.Screen name="tab" component={TabLayout} options={{ headerStyle:{backgroundColor: colors.mainColor,borderBottomColor:'gold',borderBottomWidth:2,},title: 'Accueil', headerTitle: () => <Image style={{ height: 50, width: 65 }} source={require('../assets/logo.png')} />, drawerIcon: ({ focused, size }) => (<Icon color={focused ? colors.mainColor : 'gray'} name="home" size={size} />) }} />
      <Drawer.Screen name="addpost" component={AddPostScreen} options={{ title: 'Ajouter un post', drawerIcon: ({ focused, size }) => (<Icon color={focused ? colors.mainColor : 'gray'} name="edit" size={size} />) }} />
      <Drawer.Screen name="contact" component={ContactScreen} options={{ title: 'Contact', drawerIcon: ({ focused, size }) => (<Icon1 color={focused ? colors.mainColor : 'gray'} name="contacts" size={size} />) }} />
      <Drawer.Screen name="vision" component={VisionScreen} options={{ title: 'Vision', drawerIcon: ({ focused, size }) => (<IconMat color={focused ? colors.mainColor : 'gray'} name="telescope" size={size} />) }} />
      <Drawer.Screen name="about"  component={AboutScreen} options={{ title: 'A propos', drawerIcon: ({ focused, size }) => (<Icon color={focused ? colors.mainColor : 'gray'} name="info-circle" size={size} />) }} />
      <Drawer.Screen name="privacy"  component={PrivacyPolicyScreen } options={{ title: 'Politique', drawerIcon: ({ focused, size }) => (<IconMat2 color={focused ? colors.mainColor : 'gray'} name="privacy-tip" size={size} />) }} />

    </Drawer.Navigator>

  );
};



export default DrawerLayout;
