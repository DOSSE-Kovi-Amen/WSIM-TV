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
    Image,
} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import Carousel from 'react-native-reanimated-carousel';

const images = [
    require('../assets/wsimtv1.jpeg'),
    require('../assets/wsimtv2.jpeg'),
    require('../assets/wsimtv3.jpeg'),
];
const HomeScreen = () => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const width = Dimensions.get('window').width;
    const nav: any = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setVideoError(false);
        setIsLoading(true) // Reset video error indicator
        setTimeout(() => {
            setRefreshing(false);
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [isFocused]);

    return (
        <ScrollView style={{ flex: 1, padding: 25, marginTop: 50 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TouchableOpacity onPress={() => nav.navigate('video')}>
                <View style={styles.card}>
                    {/* <FontAwesome name="tv" size={250} color="white" style={{ marginBottom:35 }} /> */}
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        style={{ padding:10 }}
                        autoPlay={true}
                        data={images}
                        scrollAnimationDuration={2000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <View
                                style={{
                                    // flex: 1,
                                    // borderWidth: 1,
                                    padding:5,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image resizeMode='contain' source={images[index]} style={{ width: '100%', height: 220, marginBottom: 35 }} />

                                {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                    {index}
                                </Text> */}
                            </View>
                        )}
                    />
                    <Button title='Cliquer pour Suivre la tv' color={colors.mainColor} onPress={() => nav.navigate('video')} />
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
        paddingBottom: 16,
        overflow: 'hidden',
        borderWidth: 3,
        // borderColor: 'lightgray',
        borderColor: colors.mainColor,
        borderRadius: 15,
        marginBottom: 8,
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});