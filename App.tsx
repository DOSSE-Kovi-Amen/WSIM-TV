import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLayout from './src/screens/DrawerLayout';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();


  }, []);
  const { width, height } = Dimensions.get('window');
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar 
        animated={true}
        backgroundColor='#030322'
      />
      <Stack.Navigator initialRouteName="drawer">
        <Stack.Screen name="drawer" component={DrawerLayout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
