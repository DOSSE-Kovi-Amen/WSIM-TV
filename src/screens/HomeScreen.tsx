import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator,
    Text,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
    Button,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';
import WebView from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';


const HomeScreen = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoStore, setVideoStore] = useState("");
    const videoRef2 = useRef(null);
    const nav:any = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setVideoError(false);
        setIsLoading(true) // Reset video error indicator
        setTimeout(() => {
            setRefreshing(false);
            setIsLoading(false);
        }, 3000);
    }, []);
    const getStorage = async () => {
        storage().ref(`files/pub.mp4`).getDownloadURL().then((downloadURL) => {
            setVideoStore(downloadURL)
        }).catch((error) => {
            Alert.alert(error.message)
        });
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [isFocused]);

    return (
        <ScrollView style={{ flex: 1, padding:25,marginTop:50 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TouchableOpacity onPress={()=> nav.navigate('video')}>
                <View style={styles.card}>
                    <FontAwesome name="tv" size={250} color="white" style={{ marginBottom:35 }} />
                    <Button title='Cliquer pour Suivre' color="gold" />
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor:colors.mainColor,
        borderRadius: 15,
        marginBottom: 8,
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});