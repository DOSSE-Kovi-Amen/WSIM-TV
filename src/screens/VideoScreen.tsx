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

    const [refreshing, setRefreshing] = useState(false);
    const [istutoplaying, setIsTutoplaying] = useState(true);
    const [videoError, setVideoError] = useState(false);
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
        setIsTutoplaying(false);

        setTimeout(() => {
            setRefreshing(false);
            setIsTutoplaying(false);

        }, 1000);
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
                        setIsTutoplaying(true)
                    }}
                    onLoad={() => {
                        console.log('load end');
                        setVideoError(false)
                        setIsTutoplaying(false)
                    }}
                // Autres propriétés et gestionnaires d'événements ici
                />

                {(istutoplaying || videoError) && <WebView
                    source={videos[randomIndex]}
                    allowsInlineMediaPlayback={true}
                    onEnd={onVideoEnd}
                    onHttpError={handleVideoError}
                    startInLoadingState={true}
                    // paused={paused}
                    style={styles3.video}
                // onLoadStart={() => setIsLoading(true)
                // }
                // onLoadEnd={() => null}

                />}
            </View>
        </ScrollView>

    );
}

export default VideoScreen

