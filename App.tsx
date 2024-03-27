import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { Alert, Dimensions, PermissionsAndroid, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLayout from './src/screens/DrawerLayout';
import SplashScreen from 'react-native-splash-screen';
import VideoScreen from './src/screens/VideoScreen';
import TrackPlayer from 'react-native-track-player';
// import TrackPlayer, { State } from 'react-native-track-player';

const App = () => {
  const requestCameraPermission = async () => {

    try {

      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,


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
  async function checkServerStatus(radioUrl: string) {
    try {
      const response = await fetch(radioUrl);
      // Vérifiez si la réponse est valide (statut HTTP, contenu, etc.)

      console.log('================check status====================');
      console.log(response);
      console.log('====================================');
      // Si le serveur ne répond pas ou renvoie une erreur
      if (response.ok) {
        // Affichez une alerte pour informer l'utilisateur du problème
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  useEffect(() => {
    let tracks: any = [];

    fetch('https://dashboard.groupelynxvision.org/api/projects/wsim')
      .then(response => {
        return response.json();
      })
      .then(async (data: any) => {
        console.log('====================================');
        console.log(data.radio);
        console.log('====================================');

        tracks.push(
          {
            id: 1,
            url: data.radio,
            title: 'Radio  WSIM',
            artist: 'Radio WSIM',
            type: 'live',
          },
          {
            id: 2,
            url: data.ip_radio_url,
            title: 'Radio  WSIM',
            artist: 'Radio WSIM',
            type: 'live',
          },
        );

        // Initialize Setup player
        TrackPlayer.setupPlayer().then(async () => {
          // Ajoutez toutes les pistes à la liste de lecture
          await TrackPlayer.add(tracks);
          // Tentez de jouer la première piste
          await TrackPlayer.play();
        });
        // const radioStatus = await checkServerStatus(data.radio);

        console.log('==============radio status======================');
        console.log(tracks);
        console.log('====================================');
        // if (radioStatus == false) {
        //   TrackPlayer.skip(1);
        //   TrackPlayer.play();
        // }

        console.log('====================================');
        console.log(await TrackPlayer.getCurrentTrack());
        console.log('====================================');
        // const interval = setInterval(async () => {
        //   console.log('====================================');
        //   console.log(1000);
        //   console.log('====================================');
        //   const radioStatus = await checkServerStatus(data.radio);

        //   console.log('==============radio status======================');
        //   console.log(radioStatus);
        //   console.log('====================================');

        //   TrackPlayer.getCurrentTrack().then(async trackId => {
        //     if (trackId) {
        //       // Vous pouvez utiliser l'ID de la piste pour obtenir d'autres informations sur la piste si nécessaire
        //       console.log('Index de lecture actuel :', trackId);
        //       if (radioStatus) {
        //         // Écoutez l'événement onPlaybackQueueEnded
        //         if (trackId != 1) {
        //           TrackPlayer.skip(0);
        //           TrackPlayer.play();
        //         }
        //       }
        //     } else {
        //       console.log('Aucune piste en cours de lecture.');
        //     }
        //   });
        // }, 1000);
      });

    return () => {
      // TrackPlayer.reset(); // Nettoyage lorsque le composant est démonté
      // clearInterval(interval);
    };
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor='#030322'
      />
      <Stack.Navigator initialRouteName="drawer"
        screenOptions={{
          animation: 'slide_from_right', // Utilisez l'animation de slide de côté à côté
        }}
      >
        <Stack.Screen name="drawer" component={DrawerLayout} options={{ headerShown: false }} />
        <Stack.Screen name="video" component={VideoScreen} options={{ headerShown: false}} />

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
