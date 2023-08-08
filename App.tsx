import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { Alert, Dimensions, PermissionsAndroid, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLayout from './src/screens/DrawerLayout';
import SplashScreen from 'react-native-splash-screen';
// import TrackPlayer, { State } from 'react-native-track-player';

const App = () => {
  const requestCameraPermission = async () => {

    try {

      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,


        ]
      );
      if (granted['android.permission.ACCESS_MEDIA_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
        // Alert.alert("You can use the location")
      } else {
        Alert.alert("Location permission denied");
      }

      if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
        // Alert.alert("You can use the location")
      } else {
        Alert.alert("Read external storage permission denied");
      }
      if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
        // Alert.alert("You can use the location")
      } else {
        Alert.alert("Read external storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {

    SplashScreen.hide();
    requestCameraPermission();

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
