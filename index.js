/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

async function bootstrap() {
    await firestore().settings({
        persistence: false, // disable offline persistence
    });
};
AppRegistry.registerComponent(appName, () => App);
