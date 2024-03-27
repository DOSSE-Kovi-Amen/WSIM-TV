/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';


async function bootstrap() {
    await firestore().settings({
        persistence: false, // disable offline persistence
    });
};
TrackPlayer.registerPlaybackService(() => require('./service'));

AppRegistry.registerComponent(appName, () => App);

