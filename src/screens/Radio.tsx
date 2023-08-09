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
    Button,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
const Radio = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [radioError, setRadioError] = useState(false);
    const [second, setSecond] = useState(0);
    const [pause, setPause] = useState(true);
    // const [play, setPlay] = useState(true);
    const [videoStore, setVideoStore] = useState("");
    const videoRef = useRef(null);
    const [mesg, setMsg] = useState("")

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRadioError(false); // Reset video error indicator
        setPause(false);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    useEffect(() => {
        return () => {
            // Décharge la vidéo lorsque le composant est démonté
            if (videoRef.current) {
                // videoRef.current.unload();
            }
            console.log('====================================');
            console.log('démonté');
            console.log('====================================');
        };
    }, [isFocused]);

    useEffect(() => {
        onFocusedAndOut();
    }, [isFocused]);
    const onFocusedAndOut = () => {
        if (!isFocused) {
            console.log('====================================');
            console.log('pause');

            setPause(true);
        } else {
            console.log('====================================');
            console.log('play');

            setPause(false)
        }
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 2000);

    // }, [isFocused]);
    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [isFocused]);

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

    const playRadio = async () => {
        setPause(false);
    };

    const pauseRadio = async () => {
        setPause(true);
        console.log('pause');


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
    const handleRadioError = (e: any) => {
        // getStorage();

        console.log('Radio éteinte');
        Alert.alert("Radio éteinte")
        // setMsg(JSON.stringify(e));
        setRadioError(true);
        setPause(true);
    };
    return (
        <ScrollView
            contentContainerStyle={styles2.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Video
                ref={videoRef}
                // source={require('../assets/test.mp3')}
                source={{ uri: "http://vps89738.serveur-vps.net:8000/radiowsim" }}
                allowsExternalPlayback
                audioOnly

                paused={pause}
                style={{ position: "absolute", width: 5, height: 5, zIndex: 15 }}
                onBuffer={handleRadioError}                // Callback when remote video is buffering
                onError={handleRadioError}
                onLoadStart={() => {
                    console.log('load Radio');
                    setIsLoading(true)
                }}
                onLoad={(e) => {
                    setMsg(JSON.stringify(e));
                    console.log('load Radio end');
                    setIsLoading(false)
                }}
            // Autres propriétés et gestionnaires d'événements ici
            />
            {/* <Text>{mesg}</Text> */}

            <View style={{ width: '100%', height: '100%', backgroundColor: '#521b43' }}>
                {isLoading ? (
                    <View style={{ height: 100, width: '100%', marginBottom:10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={80} color="green" />
                        <Text style={{ color: 'gold', fontSize: 16, fontWeight: 'bold' }}>Chargement de la radio en cours...</Text>
                    </View>
                ) : <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon2 name='radio' color={second % 2 == 0 ? '#FFFFFF9C' : '#FFDD00'} size={second % 2 == 0 ? 170 : 190} />
                </View>
                }

                <View style={{ height: 200, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon name='radio' color='#ffffff' size={140} />
                </View>
                <View style={styles.container}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff' }}>Radio WSIM</Text>
                    <View style={styles.controls}>
                        <Button title="Jouer" onPress={playRadio} color='#528CBD' />
                        <View style={{ width: 15 }}></View>
                        <Button title="Pause" onPress={pauseRadio} color='#E41D1D' />
                    </View>
                </View>


            </View>

        </ScrollView>

    );
}

export default Radio

