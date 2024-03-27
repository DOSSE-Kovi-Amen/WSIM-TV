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
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import TrackPlayer, { State, Event } from 'react-native-track-player';

const Radio = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [second, setSecond] = useState(0);
    const [pause, setPause] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    useEffect(() => {

        radioOnInit()
        console.log('radio on init');

    }, [])
    const radioOnInit = async () => {
        await TrackPlayer.play();
        TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {

            // TrackPlayer.skip(1);
            // await TrackPlayer.skipToNext();


            if (data.state.toString() === "idle") {
                // Lorsque la piste est en état "Idle", passez à la piste audio suivante
                console.log(data.state);
                // await TrackPlayer.play();


                // await TrackPlayer.skipToNext()
                // const currentTrack = await TrackPlayer.getCurrentTrack();
                Alert.alert("Oops radio éteinte!")

            }
            // if (data.state === State.Stopped && isLoading) {
            //     // La radio s'est arrêtée, commencez à jouer les autres fichiers audio
            //     console.log('stopped...');
            //     TrackPlayer.play();
            //     setIsLoading(true);
            // }
            if (data.state === State.Playing) {
                console.log('playing...');
                // TrackPlayer.play();
                setIsLoading(false);
            }

        });
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (data) => {
            if (data.nextTrack) {
                // Le lecteur est passé au morceau suivant dans la liste de lecture
                // Vous pouvez vérifier ici si le prochain morceau est le suivant que vous souhaitez lire
                // Si c'est le cas, commencez la lecture automatiquement
                await TrackPlayer.play();
            }
        });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [isFocused]);



    const playRadio = async () => {
        setPause(false);
        TrackPlayer.play();
        setIsLoading(false);

    };

    const pauseRadio = async () => {
        console.log('pause');
        TrackPlayer.pause();
        setPause(true);
    };
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        controls: {
            flexDirection: 'row',
            marginTop: 80,
        },
    });

    return (
        <ScrollView
            contentContainerStyle={styles2.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            
            {/* <Text>{mesg}</Text> */}

            <View style={{ width: '100%', height: '100%', backgroundColor: '#521b43' }}>
                {/* {isLoading ? (
                    <View style={{ height: 100, width: '100%', marginBottom:10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={80} color="green" />
                        <Text style={{ color: 'gold', fontSize: 16, fontWeight: 'bold' }}>Chargement de la radio en cours...</Text>
                    </View>
                ) : */}
                 <View style={{ height: 150, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon2 name='radio' color={second % 2 == 0 ? '#FFFFFF9C' : '#FFDD00'} size={second % 2 == 0 ? 170 : 190} />
                </View>
                {/* } */}

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
export default Radio

