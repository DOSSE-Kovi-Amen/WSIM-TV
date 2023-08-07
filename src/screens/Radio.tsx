import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator,
    Text,
    ScrollView,
    RefreshControl,
    Dimensions,
    Button,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import WebView from 'react-native-webview';
import TrackPlayer from 'react-native-track-player';


const Radio = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [second, setSecond] = useState(0);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setVideoError(false); // Reset video error indicator
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        onFocusedAndOut();
    }, [isFocused]);
    const onFocusedAndOut = () => {
        if (!isFocused) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    });


    var styles2 = StyleSheet.create({
        backgroundVideo: {
            position: 'absolute',
            backgroundColor: 'black',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {

        },
    });

    useEffect(() => {
        // setupTrackPlayer();
        return () => {
            TrackPlayer.pause();
        };
    }, []);

    const setupTrackPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
            id: 'radio',
            url: 'http://vps89738.serveur-vps.net:8000/radiowsim',
            title: 'Radio WSIM',
        });
        TrackPlayer.updateOptions({
            stopWithApp: false, // Garde la lecture en arrière-plan lorsque l'application est fermée
        });
    };
    const playRadio = async () => {
        await TrackPlayer.play();
    };

    const pauseRadio = async () => {
        await TrackPlayer.pause();
    };
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        controls: {
            flexDirection: 'row',
            marginTop: 20,
        },
    });
    return (
        <ScrollView
            contentContainerStyle={styles2.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#FFDD0031' }}>
                <View style={{ height:150,flexDirection:'row', justifyContent:'center' }}>
                    <Icon2 name='radio' color={second % 2 == 0 ? '#FFFFFF9C' : '#FFDD00'} size={second % 2 == 0 ? 170 : 190} />
                </View>
                <View style={{ height:200,flexDirection:'row', justifyContent:'center' }}>
                    <Icon name='radio' color='#0F0000' size={140} />
                </View>
                <View style={styles.container}>
                    <Text>Radio WSIM</Text>
                    <View style={styles.controls}>
                        <Button title="Play" onPress={playRadio} />
                        <View style={{ width: 15 }}></View>
                        <Button title="Pause" onPress={pauseRadio} />
                    </View>
                </View>
                {/* {isLoading && (
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'black', height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={80} color="green" />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Chargement en cours...</Text>
                        </View>
                    </View>
                )} */}
            </View>
        </ScrollView>

    );
}

export default Radio

