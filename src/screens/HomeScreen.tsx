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


const HomeScreen = () => {
    const [paused, setPaused] = useState(true);
    const navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [videoError, setVideoError] = useState(false);
  
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
  
    const handleVideoError = (e: any) => {
      console.log('Video error:', e);
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
          <Video
            source={{ uri: "https://vps89738.serveur-vps.net/hls/wsim-tv.m3u8" }}
            onError={handleVideoError}
            resizeMode='contain'
            controls
            fullscreenOrientation='all'
            paused={paused}
            style={styles2.backgroundVideo}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <Text>Error loading the video.</Text>
        )}
        {isLoading && (
          <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'black', height: 300, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={80} color="green" />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Chargement en cours...</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>

    );
}

export default HomeScreen

