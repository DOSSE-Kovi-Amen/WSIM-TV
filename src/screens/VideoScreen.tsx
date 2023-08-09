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
    BackHandler,
    TouchableOpacity,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';
import WebView from 'react-native-webview';
import { colors } from '../constants/colors';

const videos = [
    require('../assets/video1.mp4'),
    require('../assets/video2.mp4'),
    require('../assets/video3.mp4'),
];

const VideoScreen = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [videoError, setVideoError] = useState(false);
    // const [videoStore, setVideoStore] = useState("");
    const videoRef2 = useRef(null);
    const nav = useNavigation();
    const [randomIndex, setRandomIndex] = useState(0);

    const playNextRandomVideo = () => {
        const newIndex = Math.floor(Math.random() * videos.length);
        setRandomIndex(newIndex);
    };
    const onVideoEnd = () => {
        playNextRandomVideo();
    };

    useEffect(() => {
        playNextRandomVideo();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setVideoError(false);
        setIsLoading(true) // Reset video error indicator
        setTimeout(() => {
            setRefreshing(false);
            setIsLoading(false);
        }, 3000);
    }, []);
    // const getStorage = async () => {
    //     storage().ref(`files/pub.mp4`).getDownloadURL().then((downloadURL) => {
    //         setVideoStore(downloadURL)
    //     }).catch((error) => {
    //         Alert.alert(error.message)
    //     });
    // }
    useEffect(() => {
        console.log('just for test');

    })
    // useEffect(() => {
    //     // setTimeout(() => {
    //     //     setIsLoading(false)
    //     // }, 4000);

    // }, [isFocused]);

    const handleVideoError = (e: any) => {
        console.log('Video error:');
        // getStorage();
        setVideoError(true);
    };

    var styles2 = StyleSheet.create({
        backgroundVideo: {
            position: 'absolute',
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
            // backgroundColor:'#FFDD0031',
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {

        },
    });
    const styles3 = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        video: {
            width: Dimensions.get('window').width,
            height: 200,
        },
    });
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFDD0031' }}
            contentContainerStyle={styles2.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TouchableOpacity style={{ padding: 15, backgroundColor: colors.mainColor, position: 'absolute', top: 20, left: 20, zIndex: 15 }} onPress={() => { nav.goBack() }}><Text style={{ color: 'white' }}>Retour</Text></TouchableOpacity>

            <View style={{ width: '100%', height: '100%', backgroundColor: '#FFDD0031' }}>
                {((!videoError && isLoading==false) ? (

                    <Video
                        ref={videoRef2}
                        source={{ uri: "https://vps89738.serveur-vps.net/hls/wsim-tv.m3u8" }}
                        controls
                        paused={false}
                        resizeMode='contain'
                        style={{ position: 'absolute', width: "100%", height: '100%' }}
                        onBuffer={handleVideoError}                // Callback when remote video is buffering
                        onError={handleVideoError}
                        onLoadStart={() => {
                            console.log('load video');
                            setIsLoading(true)
                        }}
                        onLoad={() => {
                            console.log('load end');
                            setIsLoading(false)
                        }}
                    // Autres propriétés et gestionnaires d'événements ici
                    />

                ) : (

                    <WebView
                        source={videos[randomIndex]}
                        allowsInlineMediaPlayback={true}
                        onEnd={onVideoEnd}
                        onHttpError={handleVideoError}
                        startInLoadingState={true}
                        // paused={paused}
                        style={styles3.video}
                        // onLoadStart={() => setIsLoading(true)
                        // }
                        onLoadEnd={() => setIsLoading(false)}
                    // onLoadProgress={()=>setIsLoading(true)} // Appelé lorsque le chargement de la WebView est terminé

                    />))}
                {/* {isLoading && (
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'black', height: 300, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={60} color="green" />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Chargement en cours...</Text>
                        </View>
                    </View>
                )} */}
            </View>
        </ScrollView>

    );
}

export default VideoScreen

