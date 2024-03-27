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
import TrackPlayer from 'react-native-track-player';

const videos = [
    require('../assets/video1.mp4'),
    require('../assets/video2.mp4'),
    require('../assets/video3.mp4'),
];

const VideoScreen = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [istutoplaying, setIsTutoplaying] = useState(true);
    const [tv, setTV] = useState("");
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<any>(null);
    const videoRef2 = useRef<any>(null);

    const nav = useNavigation();
    const [randomIndex, setRandomIndex] = useState(0);

    const playNextRandomVideo = () => {
        const newIndex = Math.floor(Math.random() * videos.length);
        setRandomIndex(newIndex);
    };


    useEffect(() => {
        TrackPlayer.pause();

        playNextRandomVideo();
    }, []);
    const onVideoEnd = () => {
        playNextRandomVideo();
        // videoRef?.current?.seek(0); // Rembobine la vidéo à 0 pour la lecture en boucle
      };
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
        fetch('https://dashboard.groupelynxvision.org/api/projects/wsim')
        .then(response => {
          return response.json();
        })
        .then(async (data: any) => {
          console.log('====================================');
          console.log(data.tv);
          console.log('====================================');
          setTV(data.tv)
        });
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
                    source={{ uri: tv }}
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

                {/* {(istutoplaying || videoError) && <WebView
                    source={videos[randomIndex]}
                    // allowsInlineMediaPlayback={true}
                    allowsFullscreenVideo
                    startInLoadingState={true}
                    // paused={paused}
                    style={styles3.video}
                />} */}
                {/* {(istutoplaying || videoError) && <Video
                    source={videos[randomIndex]}
                    controls
                    paused={false}
                    onEnd={onVideoEnd}
                    resizeMode='contain'
                    style={{ position: 'absolute', width: "100%", height: '100%' }}
                // Autres propriétés et gestionnaires d'événements ici
                />} */}
            </View>
        </ScrollView>

    );
}

export default VideoScreen

