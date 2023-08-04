import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator,
    Text,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';


const HomeScreen = () => {
    const [paused, setPaused] = useState(true);
    const navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isFocused) {
            setPaused(true);

        } else {
            setPaused(false);

        }
        console.log('====================================');
        console.log(paused);
        console.log('====================================');
    }, [isFocused]);



    var styles2 = StyleSheet.create({
        backgroundVideo: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        activityIndicator: {

        },
    });

    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFDD0031' }}>
            <Video source={{ uri: "https://vps89738.serveur-vps.net/hls/wsim-tv.m3u8" }}   // Can be a URL or a local file.
                // ref={(ref) => {
                //     this.player = ref
                // }}                                      // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={(e: any) => { Alert.alert("Vérifiez votre connexion internet! Ou peut-être la diffusion a cessé") }}               // Callback when video cannot be loaded
                resizeMode='contain'
                // fullscreen
                controls
                fullscreenOrientation='all'
                paused={paused}
                style={styles2.backgroundVideo}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}

            />
            {isLoading && <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'black', height: 300, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    {/* <Text>gfg</Text> */}
                    <ActivityIndicator size={80} color="green" />
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold' }}>Chargement en cours...</Text>

                </View>

            </View>}


        </View>
    );
}

export default HomeScreen

