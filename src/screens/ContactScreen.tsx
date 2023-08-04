import React from 'react';
import { StyleSheet, View, Text, Linking, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/Card';

export default function ContactScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:katartizotv@gmail.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+242053112488');
  };
  const handleSitePress = () => {
    Linking.openURL('https://www.worldsalvationintl.org');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('whatsapp://send?phone=+242053112488');
  };
  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com/@worldsalvationintlministri3803/streams');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=100077344037959');
  };
  return (
    <ScrollView>
      <View style={{ backgroundColor:'white', height:Dimensions.get('window').height }}>
      <View style={styles.container}>

        <Text style={styles.title}>Contactez-nous :</Text>

        <Card imageSource={require("../assets/phone.png")} text="Appeler sur +242 05 311 2488" onPress={handlePhonePress} />
        <Card imageSource={require("../assets/whatsapp.png")} text="WhatsApp" onPress={handleWhatsAppPress} />
        <Card icon={'globe-africa'} text="Visiter site web" onPress={handleSitePress} />

        <Card imageSource={require("../assets/gmail.png")} text="Envoyer un mail" onPress={handleEmailPress} />
        <Card imageSource={require("../assets/facebook.png")} text="WSIM TV Facebook" onPress={handleFacebookPress} />

        <Card imageSource={require("../assets/youtube.png")} text="WSIM TV Youtube" onPress={handleYoutubePress} />

      </View>        
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  link: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
