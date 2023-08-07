import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator,
    Text,
    ScrollView,
    RefreshControl,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';


const Radio = () => {
    const [paused, setPaused] = useState(true);
    const navigation: any = useNavigation();
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
        if (!isFocused) {
            setPaused(true);
        } else {
            setPaused(false);
        }
    }, [isFocused]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 2000)

    });

    const handleVideoError = (e: any) => {
        console.log('Video error:', e);
        setVideoError(true);
    };

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

    return (
        <ScrollView
            contentContainerStyle={styles2.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#FFDD0031' }}>
                {!videoError ? (
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <Video
                            source={{ uri: "http://vps89738.serveur-vps.net:8000/radiowsim" }}
                            onError={handleVideoError}
                            resizeMode='contain'
                            controls
                            fullscreenOrientation='all'
                            paused={paused}
                            style={styles2.backgroundVideo}
                            onLoadStart={() => setIsLoading(true)}
                            onLoad={() => setIsLoading(false)}
                        />
                        {!videoError&&<View style={{ position: 'absolute', top: 100 }}>
                            <Icon2 name='radio' color={second % 2 == 0 ? '#FFFFFF9C' : '#FFDD0031'} size={second % 2 == 0 ? 190 : 200} />
                        </View>}
                        <Icon name='radio' color='#FFFFFF9C' size={160} />
                    </View>

                ) : (
                    <Text style={{ color:'white', fontSize:17, fontWeight:'bold'  }}>Error loading the Radio.</Text>
                )}
                {isLoading && (
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'black', height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={80} color="green" />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Chargement en cours...</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>

    );
}

export default Radio

